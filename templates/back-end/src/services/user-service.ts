import { UserModel, userModel } from "../db";

class UserService {
  userModel;
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  //유저별 게시글 조회

  // 회원가입

  // 로그인 및 토큰 발급

  // 내 정보 보기
  async getMyInfo(userId: string) {
    if (!userId) {
      throw new Error("로그인이 필요합니다.");
    }
    const my = await this.userModel.findById(userId);
    if (!my) {
      throw new Error("회원 정보를 불러올 수 없습니다.");
    }
    return my;
  }

  // 회원 정보 수정.

  // 회원 탈퇴
}

// export const userService = new UserService(userModel);

const userService = new UserService(userModel);
export { userService };
