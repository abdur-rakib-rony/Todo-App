import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  createdAt: Date;
  completedAt?: Date;
  userId: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    completedAt: { type: Date, default: null },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Task =
  mongoose.models.TodoTask || mongoose.model<ITask>("TodoTask", TaskSchema);
