import { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      ref: "users",
    },
    deleted: {
      type: Schema.Types.Boolean,
      required: true,
      default: "false",
    },
  },
  {
    timestamps: true,
  }
);

export { CommentSchema };
