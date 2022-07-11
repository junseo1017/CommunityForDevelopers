import { UserModel, userModel } from "../db";
import {
  IUserInfo,
  ILoginInfo,
  ISearchInfo,
} from "../interfaces/user-interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  userModel;
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }
  // 회원가입
  async addUser(userInfo: IUserInfo) {
    const { nickname, email, password, job, imgUrl, skills } = userInfo;

    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = {
      nickname,
      email,
      password: hashedPassword,
      job,
      imgUrl,
      skills,
    };

    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  // 로그인 및 토큰 발급
  async getUserToken(loginInfo: ILoginInfo) {
    const { email, password } = loginInfo;

    const user = await this.userModel.findByEmail(email);

    if (!user /*|| user.deleted*/) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    const correctPasswordHash = user.password; // db에 저장되어 있는 암호화된 비밀번호

    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    const token = jwt.sign({ userId: user.userId, role: user.role }, secretKey);

    return { token };
  }

  //유저별 게시글 조회

  // token으로 user 정보 보기
  async getUserInfo(userId: string) {
    const userInfo = await this.userModel.findById(userId);
    if (!userInfo) {
      throw new Error("해당 ID에 맞는 회원 정보를 불러올 수 없습니다.");
    }
    return userInfo;
  }

  async getUsers() {
    const users = await this.userModel.findAll();
    return users;
  }

  // 회원 정보 수정
  async setUser(userInfoRequired: ISearchInfo, toUpdate: IUserInfo) {
    const { userId, currentPassword } = userInfoRequired;

    let user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    user = await this.userModel.update(userId, toUpdate);

    return user;
  }

  // 회원 탈퇴
  async deleteUser(userInfoRequired: ISearchInfo) {
    const { userId, currentPassword } = userInfoRequired;

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    return await this.userModel.deleteById(userId);
  }
}

const userService = new UserService(userModel);
export { userService };
