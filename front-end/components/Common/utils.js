// 6자리 난수 생성
export const RandomNum = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// 아이디 비밀번호 정규표현식
export const RegExp = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/,
};
