export interface IUserInputDTO {
  nickname: string;
  email: string;
  password: string;
  job?: string;
  imgUrl: string;
  skills: string[];
  scraps?: string[];
}

export interface IUserInfo {
  nickname: string;
  email: string;
  password: string;
  job?: string;
  imgUrl: string;
  skills: string[];
}

export interface IloginInfo {
  email: string;
  password: string;
}

export interface IsearchInfo {
  userId: string;
  currentPassword: string;
}
