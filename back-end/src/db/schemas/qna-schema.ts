import { Schema, Document, Types } from "mongoose";
export interface QnaType extends Document {
  title: string;
  contents: string;
  author: Types.ObjectId;
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
    collection: "qnas",
    timestamps: true,
  }
);
export { QnaSchema };
