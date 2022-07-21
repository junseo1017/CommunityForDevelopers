import { Schema, Document, Types } from "mongoose";
export interface CommentType extends Document {
  postId: string;
  content: string;
  author: Types.ObjectId;
  comments: Types.ObjectId;
}
const CommentSchema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      required: false,
      ref: "comments",
    },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

export { CommentSchema };
