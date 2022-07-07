import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";
import { IUserInputDTO } from "../interfaces/user-interface";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async findById(userId: string) {
    return await User.findOne({ userId });
  }

  async findAll() {
    return await User.find({});
  }

  async create(userInfo: IUserInputDTO) {
    return await User.create(userInfo);
  }

  async update(userId: string, update: IUserInputDTO) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    return await User.findOneAndUpdate(filter, update, option);
  }

  async deleteById(userId: string) {
    return await User.findOneAndDelete({ userId });
  }

  async deleteByEmail(email: string) {
    return await User.findOneAndDelete({ email });
  }
}

const userModel = new UserModel();

export { userModel };
