//resolvers is a little more complicated than typeDefs, resolvers are functions that tell grqphql how to populate data for each field.
//resolvers can be "Queries" which are basically just get commands that can simply return data
//or "Mutations" that can be other kinds of requests that change the database in some way (delete data, change data, add data, etc.)

const { User, Design, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  //resolvers that simply return an object without any changes are queries.
  Query: {
    //this query will respond with the user object for the logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({
          _id: context.user._id,
        }).populate('designs').populate('orders');
        return user;
      } else {
        throw AuthenticationError;
      }
    },
    getUser: async (parent, {_id}) => {
        const user = await User.findOne({
            _id
        }).populate('designs').populate('orders');
        if(!user) throw new Error('User ID not found');
        return user;
    },
    getDesign: async (parent, {_id}) => {
        const design = await Design.findOne({_id}).populate('user');
        if(!design) throw new Error('design ID not found');
        return design;

    }
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

    //create a new design
    addDesign: async (parent, { image }, context) => {
        if (context.user) {
          //find logged in user
          const user = await User.findOne({
            _id: context.user._id,
          });
          //create new design under logged in user
          const design = await Design.create({user, image});
          //push new design into user's array
          user.designs.push(design);
          //save user
          await user.save();
          //return design
          return design;
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
          throw new AuthenticationError('User not authenticated');
        }
    },

    //create a new order, input is an array of LineItem
    createOrder: async (parent, {input}, context) => {
        if (context.user) {
          //find logged in user
          const user = await User.findOne({
            _id: context.user._id,
          });
          //create new design under logged in user
          const order = await Order.create({user, lineItems:input, status:'Received'});
          //push new design into user's array
          user.orders.push(order);
          //save user
          await user.save();
          //return design
          return order;
        } else {
          throw AuthenticationError;
        }
    },
    //updates a user's username, email, and password, whichever are passed
    updateUser: async (parent, {username, email, password}, context) => {
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            {username, email, password},
            {new: true}
        );
          return user;
        } else {
          throw AuthenticationError;
        }

    },
    //requires a routing number and an account number, sets the routing and accounting numbers of the logged in user to them
    updateBankingInfo: async (parent, {routingNumber, accountNumber}, context) => {
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            {routingNumber, accountNumber},
            {new: true, runValidators: true}
        );
          return user;
        } else {
          throw AuthenticationError;
        }

    },
    //updates order with _id with new list of line items, or with a new status, or both
    updateOrder: async (parent, {input, status, _id}, context) => {
        if (context.user) {
          const order = await Order.findOneAndUpdate(
            { _id },
            {lineItems: input, status},
            {new: true, runValidators: true}
        );
          return order;
        } else {
          throw AuthenticationError;
        }
    },

  },
};

module.exports = resolvers;
