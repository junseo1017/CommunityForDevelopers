import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
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
      type: Schema.Types.Boolean,
      required: true,
      default: "false",
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);
export { UserSchema };
