//resolvers is a little more complicated than typeDefs, resolvers are functions that tell grqphql how to populate data for each field.
//resolvers can be "Queries" which are basically just get commands that can simply return data
//or "Mutations" that can be other kinds of requests that change the database in some way (delete data, change data, add data, etc.)

const { User, Design, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const resolvers = {
  //resolvers that simply return an object without any changes are queries.
  Query: {
    //this query will respond with the user object for the logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({
          _id: context.user._id,
        })
          .populate({
            path: "orders",
            populate: {
              path: "lineItems",
              populate: {
                path: "design",
              },
            },
          })
          .populate("designs");
        return user;
      } else {
        throw AuthenticationError;
      }
    },
    //returns the most recent designs up to a limit passed into the function
    getDesigns: async (parent, { start }) => {
      const designs = await Design.find({ hidden: false })
        .populate("user")
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(20);
      return designs;
    },
    //returns all the designs of a single user other than the logged in user by ID
    getUser: async (parent, { _id }) => {
      const user = await User.findOne({
        _id,
      }).populate({
        path: "designs",
        match: { hidden: false }, // Filter designs where hidden is false
      });
      if (!user) throw new Error("User ID not found");
      return user;
    },
    //returns a single design by ID
    getDesign: async (parent, { _id }) => {
      const design = await Design.findOne({ _id }).populate("user");
      if (!design) throw new Error("design ID not found");
      return design;
    },

    checkout: async (parent, { items }, context) => {
      //save cart state in session storage
      const url = new URL(context.headers.referer).origin;
      // eslint-disable-next-line camelcase
      const line_items = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const product of items) {
        // const design = await Design.findById(product.design);
        const name = `${product.item}_${product.design}`;
        const description = `${product.item}_${product.cut}_${product.size}_${product.color}`;
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              name,
              description,
              images: [product.image],
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        });
      }

      try {
        // console.log("trycatch block started")
        //create a new order
        const order = await Order.create({
          user: context.user._id,
          lineItems: items,
        });
        //push that order onto the logged in user
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order._id },
        });
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `${url}/success?order_id=${order._id}`,
          cancel_url: `${url}/`,
        });
        //in success page, wipe cart and updateOrder(order._id, 'Received')
        // console.log(session)
        // console.log(order)
        return { session: session.id };
      } catch (error) {
        console.error(error);
      }
    },
  },
  Mutation: {
    //log in the user denoted by the email and password
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Can't find this user");

      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) throw new Error("This password is incorrect");
      const token = signToken(user);
      //return an Auth
      return { token, user };
    },

    //create a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({
        username,
        email,
        password,
      });
      if (!user)
        throw new Error(
          "Something has gone awry, perhaps one or more of your parameters are incorrect"
        );
      const token = signToken(user);
      //returns an Auth type
      return { token, user };
    },

    //create a new design, image is a string that points to the user's image they are uploading
    addDesign: async (parent, { image }, context) => {
      console.log(image);
      if (context.user) {
        //find logged in user
        const user = await User.findOne({
          _id: context.user._id,
        });
        try {
          //create new design under logged in user
          const design = await Design.create({ user, image });
          //push new design into user's array
          user.designs.push(design);
          //save user
          await user.save();
          //return design
          return design;
        } catch (error) {
          console.error(error);
        }
      } else {
        throw AuthenticationError;
      }
    },

    //remove a design from the user's designs array and set it to "hidden"
    //this route just doesn't work right now
    hideDesign: async (parent, { _id }, context) => {
      if (context.user) {
        // Remove the design ID from the user's designs array
        await User.updateOne(
          { _id: context.user._id },
          { $pull: { designs: _id } }
        );

        // Set the "hidden" boolean to true for the design with the specified ID
        const design = await Design.findOneAndUpdate(
          { _id },
          { hidden: true },
          { new: true }
        );

        return design;
      } else {
        throw new AuthenticationError("User not authenticated");
      }
    },

    //updates a user's username and email
    updateUser: async (parent, { username, email }, context) => {
      if (context.user) {
        console.log('this is the passed username: ', username);
        console.log('this is the passed email: ', email);
        const user = await User.findOneAndUpdate({ _id: context.user._id }, {username, email}, {new: true});
        return user;
      } else {
        throw AuthenticationError;
      }
    },

    //updates a user's password
    updatePassword: async (parent, { currentPassword, newPassword }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        const correctPassword = await user.isCorrectPassword(currentPassword);
        if (!correctPassword) {
            throw new Error("current password was not correct");
        }
        user.password = newPassword;
        await user.save()
        return user;
      } else {
        throw AuthenticationError;
      }
    },
    //requires a routing number and an account number, sets the routing and accounting numbers of the logged in user to them
    updateBankingInfo: async (
      parent,
      { routingNumber, accountNumber },
      context
    ) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { routingNumber, accountNumber },
          { new: true, runValidators: true }
        );
        return user;
      } else {
        throw AuthenticationError;
      }
    },
    //updates order with _id with new list of line items, or with a new status, or both
    updateOrder: async (parent, { input, status, _id }, context) => {
      if (context.user) {
        //grab user
        const order = await Order.findById(_id);
        if (!order) throw new Error("Order not found");
        if (order.user.toString() !== context.user._id)
          throw new Error("cannot alter another user's order!");
        const updatedOrder = await Order.findOneAndUpdate(
          { _id },
          { lineItems: input, status },
          { new: true, runValidators: true }
        ).populate("user");
        return updatedOrder;
      } else {
        throw AuthenticationError;
      }
    },
  },
};

module.exports = resolvers;
