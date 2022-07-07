import { Schema } from "mongoose";
import { CommentSchema } from "./comment-schema";

const PortfolioSchema = new Schema(
  {
    portId: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      ref: "users",
    },
    title: {
      type: String,
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
    githubUrl: {
      type: String,
      required: false,
    },
    demoUrl: {
      type: String,
      required: false,
    },
    comments: {
      type: [CommentSchema],
    },
    deleted: {
      type: Schema.Types.Boolean,
      required: true,
      default: "false",
    },
  },
  {
    collection: "portfolios",
    timestamps: true,
  }
);
export { PortfolioSchema };
