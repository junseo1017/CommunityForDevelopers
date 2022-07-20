// 6자리 난수 생성
export const RandomNum = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
