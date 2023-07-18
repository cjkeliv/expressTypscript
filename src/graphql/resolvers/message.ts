const Message = require("../models/Message");

module.exports = {
  Mutation: {
    async createMessage(_: any, { messageInput: { text, username } }: any) {
      const newMessage = new Message({
        text: text,
        createdBy: username,
        createdAt: new Date().toISOString(),
      });
      const res = await newMessage.save();
      console.log(res);
      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
  Query: {
    message: (_: any, { ID }: any) => Message.findById(ID),
  },
};
