import { Schema, Document } from "mongoose";
import { shortId } from "./types/short-id";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";

export interface UserType extends Document {
  userId: string;
  nickname: string;
  email: string;
  password: string;
  job: string;
  imgUrl: string;
  skills: string[];
  scraps: string[];
  role: string;
}

const UserSchema = new Schema(
  {
    userId: shortId,
    nickname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: false,
      default: "",
    },
    imgUrl: {
      type: String,
      required: false,
      default: "",
    },
    skills: {
      type: [String],
      required: false,
    },
    scraps: {
      type: [String],
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

//soft delete plugin
UserSchema.plugin(softDeletePlugin);

export { UserSchema };
