const { gql } = require("apollo-server");

export const typeDefs = gql`
  type Message {
    text: String
    createdAt: String
    createdBy: String
  }
  type User3 {
    username: String
    email: String
    password: String
    token: String
  }
  type User {
    firstname: String
    lastname: String
    bio: String
    email: String
    password: String
    confirmPassword: String
  }
  input RegisterInput {
    firstname: String
    lastname: String
    bio: String
    email: String
    password: String
    confirmPassword: String
  }
  input LoginInput {
    email: String
    password: String
  }
  input MessageInput {
    text: String
    username: String
  }

  type Query {
    message(id: ID!): Message
    user(id: ID!): User
  }

  type Mutation {
    createMessage(messageInput: MessageInput): Message!
    registerUser(registerInput: RegisterInput): User!
    loginUser(loginInput: LoginInput): User!
  }
`;
