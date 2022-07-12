import { Schema } from "mongoose";
import { shortId } from "./types/short-id";

const QnaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    imgUrl: {
      type: String,
      required: false,
      default: "",
    },
    recommends: {
      type: [String],
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    isAnswer: {
      type: Boolean,
      required: true,
      default: false,
    },
    parentQnaId: {
      type: String,
      required: false,
      default: "",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
        required: false,
      },
    ],
  },
  {
    collection: "qna",
    timestamps: true,
  }
);
export { QnaSchema };
