import { model, Schema } from "mongoose";

const userSchema = new Schema({
  firstname: { type: String, default: null },
  lastname: { type: String, default: null },
  bio: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  confirmPassword: { type: String },
  token: { type: String },
  timeStamp: { type: String },
});
module.exports = model("User", userSchema);
