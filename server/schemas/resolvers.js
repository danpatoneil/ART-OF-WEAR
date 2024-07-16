//resolvers is a little more complicated than typeDefs, resolvers are functions that tell grqphql how to populate data for each field.
//resolvers can be "Queries" which are basically just get commands that can simply return data
//or "Mutations" that can be other kinds of requests that change the database in some way (delete data, change data, add data, etc.)

const { User, Design } = require("../models");
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

    //delete a new design
    //this route just doesn't work right now
    deleteDesign: async (parent, { _id }, context) => {
        if (context.user) {
          //find logged in user
          const user = await User.findOne({
            _id: context.user._id,
          });
          user.designs = user.designs.filter(
            designId => designId !== _id
          );
          await user.save();
          //find and delete design by id
          const design = await Design.findOneAndDelete({
            _id
          });

          return design

          //create new design under logged in user
        //   const design = await Design.create({user, image});
        //   //push new design into user's array
        //   user.designs.push(design);
        //   //save user
        //   await user.save();
        //   //return design
        //   return design;
        } else {
          throw AuthenticationError;
        }
    },

    //create a new design
    //need to change this to work with an array of lineItems
    createOrder: async (parent, args, context) => {
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
  },
};

module.exports = resolvers;
