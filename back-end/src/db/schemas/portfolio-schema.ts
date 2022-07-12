import { Schema } from "mongoose";

const PortfolioSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
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
        ref: "comments",
        required: false,
      },
    ],
  },
  {
    collection: "portfolios",
    timestamps: true,
  }
);
export { PortfolioSchema };
