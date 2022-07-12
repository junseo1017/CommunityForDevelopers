import { Schema } from "mongoose";

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
    userId: {
      type: String,
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
  },
  {
    collection: "qnas",
    timestamps: true,
  }
);
export { QnaSchema };
