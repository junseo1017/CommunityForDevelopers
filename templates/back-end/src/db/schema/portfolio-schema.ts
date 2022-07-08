import { Schema } from "mongoose";
import { CommentSchema } from "./comment-schema";

const PortfolioSchema = new Schema(
  {
    portId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    recommends: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
        required: true,
      },
    ],
  },
  {
    collection: "portfolio",
    timestamps: true,
  }
);
export { PortfolioSchema };
