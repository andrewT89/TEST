import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true },
  password: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator); // Validator field schema

export default mongoose.model("User", UserSchema);
