import mongoose, { Schema, Document } from "mongoose";
import { Task } from "./Task";

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    const user = this;
    await Task.deleteMany({ userId: user._id });
  }
);

export const User =
  mongoose.models.TodoUser || mongoose.model<IUser>("TodoUser", UserSchema);
