import { Schema } from "mongoose";
import { shortId } from "./types/short-id"; 
const PortfolioSchema = new Schema(
  {
    portId: shortId,
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
