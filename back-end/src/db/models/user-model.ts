import { model } from "mongoose";
import { UserSchema, UserType } from "../schemas/user-schema";
import {
  UserInputDTO,
  OAuthUserDTO,
  Password,
  UserUpdateInfo,
} from "../../interfaces/user-interface";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";

// const User = model("users", UserSchema);
const User = model<UserType, SoftDeleteModel<UserType>>("users", UserSchema);
export class UserModel {
  async findAll() {
    return await User.find(
      { isDeleted: false },
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
      { _id: userId, isDeleted: false },
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
    return await User.findOne(
      { email, isDeleted: false },
      { email: 1, password: 1 }
    );
  }

  async create(userInfo: UserInputDTO) {
    return await User.create(userInfo);
  }

  async createOAuthUser(userInfo: OAuthUserDTO) {
    return await User.create(userInfo);
  }

  async update(userId: string, update: UserUpdateInfo | Password) {
    const filter = { _id: userId, isDeleted: false };
    const option = { returnOriginal: false };
    return await User.findOneAndUpdate(filter, update, option);
  }

  async deleteById(userId: string) {
    return await User.softDelete({ _id: userId, isDeleted: false });
  }

  async deleteByEmail(email: string) {
    return await User.softDelete({ email, isDeleted: false });
  }
}

const userModel = new UserModel();

export { userModel };
