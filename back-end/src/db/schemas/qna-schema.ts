import { Schema, Document, Types } from "mongoose";
export interface QnaType extends Document {
  title: string;
  contents: string;
  contentText: string;
  authorId: Types.ObjectId;
  author: string;
  imgUrl: string;
  recommends: string[];
  tages: string[];
  isAnswer: boolean;
  parentQnaId: string;
  comments: Types.ObjectId[];
}

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
    contentText: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    recommends: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false,
      },
    ],
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
    collection: "qnas",
    timestamps: true,
  }
);
export { QnaSchema };
