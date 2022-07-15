export interface InputDTO {
  nickname: string;
  email: string;
  password: string;
}

export interface UpdateInfo {
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

export interface SearchInfo {
  userId: string;
  currentPassword: string;
}
