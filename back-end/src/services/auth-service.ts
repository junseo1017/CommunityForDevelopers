import { UserModel, userModel } from "../db";
import axios, { AxiosResponse } from "axios";
import { GithubEmailInfo } from "../interfaces/user-interface";
import { jwtUtil } from "../utils/jwt-util";
import { AppError } from "../middlewares/error-handler";
class AuthService {
  userModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }
  async getGitHubInfo(code: string) {
    const getTokenUrl = "https://github.com/login/oauth/access_token";
    const getUserUrl = "https://api.github.com/user";
    const request = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    };
    const response: AxiosResponse = await axios.post(getTokenUrl, request, {
      headers: { Accept: "application/json" },
    });
    if (response.data.error) {
      throw new AppError(401, "깃허브 인증을 실패하였습니다.");
    }
    const { access_token } = response.data;
    const { data: userData } = await axios.get(getUserUrl, {
      headers: { Authorization: `token ${access_token}` },
    });
    const nickname = userData.login;
    const { data: emailDataArr } = await axios.get(`${getUserUrl}/emails`, {
      headers: { Authorization: `token ${access_token}` },
    });
    const { email } = emailDataArr.find(
      (emailData: GithubEmailInfo) =>
        emailData.primary === true && emailData.verified === true
    );
    return { email, nickname };
  }

  async getKakaoInfo(code: string) {
    const getTokenUrl = "https://kauth.kakao.com/oauth/token";
    const getUserUrl = "https://kapi.kakao.com/v2/user/me";
    const request = {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT_ID || "",
      client_secret: process.env.KAKAO_CLIENT_SECRET || "",
      redirect_uri: "http://localhost:5000/api/oauth/kakao/callback",
      code,
    };
    const params = new URLSearchParams(request).toString();
    const finalUrl = `${getTokenUrl}?${params}`;
    const response: AxiosResponse = await axios.post(finalUrl, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if (response.data.error) {
      throw new AppError(401, "카카오 인증을 실패하였습니다.");
    }
    const { access_token } = response.data;
    const { data } = await axios.get(getUserUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const nickname = data.properties.nickname;
    const email = data.kakao_account.email;
    return { email, nickname };
  }

  async getUserTokenByOAuth(
    email: string,
    nickname: string,
    loginType: string
  ) {
    let user = await this.userModel.findByEmail(email);
    if (!user) {
      user = await this.userModel.createOAuthUser({
        email,
        nickname,
        loginType,
      });
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
}

const authService = new AuthService(userModel);
export { authService };
