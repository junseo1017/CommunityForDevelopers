import { IUserInputDTO } from '../interface/user-interface';
import User from '../schemas/user-schema';
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

  async update({ userId, update }: any) {
    const filter = { userId: userId };
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

export const userModel = new UserModel();
