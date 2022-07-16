import { Schema, Document, Types } from "mongoose";
export interface PortfolioType extends Document {
  author: Types.ObjectId;
  title: string;
  description: string;
  skills: string;
  content: string;
  contentText: string;
  scraps: Types.ObjectId[];
  recommends: Types.ObjectId[];
  comments: Types.ObjectId[];
}

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
    contentText: {
      type: String,
      required: true,
    },
    scraps: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false,
      },
    ],
    recommends: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
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
