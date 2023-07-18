const User = require("../models/User");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
import timeStamp from "../../timeconversion";

module.exports = {
  Mutation: {
    async registerUser(
      _: any,
      {
        registerInput: {
          firstname,
          lastname,
          bio,
          email,
          password,
          confirmPassword,
        },
      }: any
    ) {
      // see if user exist on the db first
      const checkOldUser = await User.findOne({ email });
      // throw error if user
      if (checkOldUser) {
        throw new ApolloError(
          "A user is already registered with the email address  " + email,
          "USER_ALREADY_EXISTS"
        );
      }
      // encrypt password
      const encrytedPassword = await bcrypt.hash(password, 10);
      // build mongoose models new user register
      const newUser = new User({
        firstname: firstname.toUpperCase(),
        lastname: lastname.toUpperCase(),
        bio: bio.toUpperCase(),
        email: email.toLowerCase(),
        password: encrytedPassword,
        confirmPassword: confirmPassword,
        timeStamp,
      });
      // token is attached to the user(jwt)
      console.log(newUser);
      const token = jwt.sign(
        {
          user_id: newUser._id,
          email,
        },
        process.env.PRIVATE_KEY!,
        {
          expiresIn: "2h",
        }
      );
      // the new user token
      newUser.token = token;

      // save our user
      const res = await newUser.save();
      // console.log(newUser);
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_: any, { loginInput: { email, password } }: any) {
      // see if a user already exists with the email
      const user = await User.findOne({ email });
      // console.log(user);
      // check the entered password equals the encrypted password
      if (user && (await bcrypt.compare(password, user.password))) {
        // create a New token for user on login
        const token = jwt.sign(
          {
            user_id: user._id,
            email,
          },
          process.env.PRIVATE_KEY!,
          {
            expiresIn: "2h",
          }
        );
        // console.log(user + "   i was hare");

        // attach token to user model that logged in
        user.token = token;
        // ----------   original
        return {
          id: user._id,
          ...user.doc,
        };
        // ----------   end
      }
      // if user does not exit return error
      throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
    },
  },
  Query: {
    user: (_: any, { ID }: any) => User.findById(ID),
  },
};
