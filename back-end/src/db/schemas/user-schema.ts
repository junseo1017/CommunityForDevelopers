import { Schema, Document } from "mongoose";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";

export interface UserType extends Document {
  nickname: string;
  email: string;
  password: string;
  job: string;
  imgUrl: string;
  skills: string[];
  scraps: string[];
  role: string;
  loginType: string;
  isDeleted?: boolean;
}

const UserSchema = new Schema(
  {
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
      required: false,
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
    role: {
      type: String,
      required: true,
      default: "user",
    },
    loginType: {
      type: String,
      required: true,
      default: "CFD",
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
