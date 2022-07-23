// 일정 글자 수 넘어가면 '...'로 처리하기
// text:string, limit:number
export const textLimitHandler = (text, limit) => {
  if (text.length >= limit) {
    return text.substr(0, limit) + "...";
  }
  return text;
};
