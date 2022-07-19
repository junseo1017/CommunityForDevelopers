import {
  UserModel,
  userModel,
  PortfolioModel,
  portfolioModel,
  QnaModel,
  qnaModel,
} from "../db";
import { InputDTO, UpdateInfo, LoginInfo } from "../interfaces/user-interface";
import bcrypt from "bcrypt";
import { jwtUtil } from "../utils/jwt-util";

class UserService {
  userModel;
  portfolioModel;
  qnaModel;
  constructor(
    userModel: UserModel,
    portfolioModel: PortfolioModel,
    qnaModel: QnaModel
  ) {
    this.userModel = userModel;
    this.portfolioModel = portfolioModel;
    this.qnaModel = qnaModel;
  }

  async addUser(userInfo: InputDTO) {
    const { nickname, email, password } = userInfo;

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
    };

    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  async getUserToken(loginInfo: LoginInfo) {
    const { email, password } = loginInfo;

    const user = await this.userModel.findByEmail(email);

    if (!user) {
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

    const accessToken = jwtUtil.generateAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = jwtUtil.generateRefreshToken({
      userId: user._id,
      role: user.role,
    });

    return { accessToken, refreshToken };
  }

  async getUsers() {
    return await this.userModel.findAll();
  }

  async getUserInfo(userId: string) {
    const userInfo = await this.userModel.findById(userId);
    if (!userInfo) {
      throw new Error("해당 ID에 맞는 회원 정보를 불러올 수 없습니다.");
    }
    return userInfo;
  }

  async getUserContentsCount(userId: string) {
    const portfolioCount = (await portfolioModel.getCountByUserId(userId)) ?? 0;
    const scrapCount =
      (await portfolioModel.getScrapsCountByUserId(userId)) ?? 0;
    const questionCount =
      (await qnaModel.getQuestionCountByUserId(userId)) ?? 0;
    const answerCount = (await qnaModel.getAnswerCountByUserId(userId)) ?? 0;

    return { portfolioCount, scrapCount, questionCount, answerCount };
  }

  // 회원 정보 수정
  async setUser(userId: string, toUpdate: UpdateInfo) {
    if (!(await this.userModel.findById(userId))) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 업데이트
    await this.userModel.update(userId, toUpdate);

    // 이후 조회된 쿼리 반환
    return this.userModel.findById(userId);
  }

  // 비밀번호 수정
  async setPassword(userId: string, password: string) {
    const user = await this.userModel.getPassword(userId);

    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      password = newPasswordHash;
    }

    return await this.userModel.update(userId, { password });
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.getPassword(userId);

    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    return await this.userModel.deleteById(userId);
  }
}

const userService = new UserService(userModel, portfolioModel, qnaModel);
export { userService };
