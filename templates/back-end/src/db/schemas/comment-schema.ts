import { Schema } from "mongoose";
import { shortId } from "./types/short-id";

const CommentSchema = new Schema(
  {
    commentId: shortId,
    postId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    comments: {
      type: String,
      required: false,
      ref: "comments",
    },
    deleted: {
      type: Schema.Types.Boolean,
      required: true,
      default: "false",
    },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

export { CommentSchema };
