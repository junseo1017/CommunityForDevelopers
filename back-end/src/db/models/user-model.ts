import { model } from "mongoose";
import { UserSchema, UserType } from "../schemas/user-schema";
import {
  InputDTO,
  OAuthUserDTO,
  Password,
  UpdateInfo,
} from "../../interfaces/user-interface";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";

// const User = model("users", UserSchema);
const User = model<UserType, SoftDeleteModel<UserType>>("users", UserSchema);
export class UserModel {
  async findAll() {
    return await User.find(
      {},
      {
        email: 1,
        nickname: 1,
        job: 1,
        skills: 1,
        imgUrl: 1,
        role: 1,
        loginType: 1,
      }
    );
  }

  async findById(userId: string) {
    return await User.findOne(
      { _id: userId },
      {
        email: 1,
        nickname: 1,
        job: 1,
        skills: 1,
        imgUrl: 1,
        role: 1,
        loginType: 1,
      }
    );
  }

  async findByEmail(email: string) {
    return await User.findOne({ email }, { password: 1 });
  }

  async getPassword(userId: string) {
    return await User.findOne({ _id: userId }, { password: 1 });
  }

  async create(userInfo: InputDTO) {
    return await User.create(userInfo);
  }
  async createOAuthUser(userInfo: OAuthUserDTO) {
    return await User.create(userInfo);
  }

  async update(userId: string, update: UpdateInfo | Password) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    return await User.findOneAndUpdate(filter, update, option);
  }

  async deleteById(userId: string) {
    return await User.softDelete({ _id: userId });
    // return await User.findOneAndDelete({ userId });
  }

  async deleteByEmail(email: string) {
    return await User.softDelete({ email });
    // return await User.findOneAndDelete({ email });
  }
}

const userModel = new UserModel();

export { userModel };
