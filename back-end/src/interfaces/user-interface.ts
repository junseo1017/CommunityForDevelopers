export interface UserInputDTO {
  nickname: string;
  email: string;
  password: string;
}
export interface OAuthUserDTO {
  nickname: string;
  email: string;
  loginType: string;
}
export interface UserUpdateInfo {
  nickname: string;
  job?: string;
  imgUrl: string;
  skills: string[];
}

export interface Password {
  password: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface GithubEmailInfo {
  email: string;
  primary: boolean;
  verified: boolean;
  visibiliy: string;
}
