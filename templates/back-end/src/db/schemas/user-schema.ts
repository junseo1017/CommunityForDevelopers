import { Schema } from "mongoose";
import { shortId } from "./types/short-id";
import MongooseDelete from "mongoose-delete";

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
UserSchema.plugin(MongooseDelete);

export { UserSchema };
