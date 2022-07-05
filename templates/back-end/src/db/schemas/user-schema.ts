import { Schema } from "mongoose";
import { boolean } from "yargs";

export interface item extends mongoose.Document {
  userId: string,
  name: string,
  email: string,
  password: string,
  job: string,
  imageUrl: string,
  skills: [string],
  scraps: [string],
  role: string,
  deleted: boolean
}

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
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
    },
    imgUrl: {
      type: String,
      required: true,
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
      required: false,
      default: "user",
    },
    deleted: {
      type: boolean,
      required: false,
      default: "false",
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { UserSchema };
