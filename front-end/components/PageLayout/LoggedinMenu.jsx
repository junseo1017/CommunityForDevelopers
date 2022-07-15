import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import userSlice from "../../reducers/user";
import { message } from "antd";
import { useCallback } from "react";
const LoggedinMenu = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(userSlice.actions.logout());
    message.success("정상적으로 로그아웃 되었습니다.");
  };

  return (
    <>
      {me ? (
        <>
          <Link href={`/profile/${me._id}`}>
            <a>내 정보</a>
          </Link>
          <a onClick={logoutHandler}>로그아웃</a>
        </>
      ) : (
        <>
          <Link href={"/login"}>
            <a>로그인</a>
          </Link>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </>
      )}
    </>
  );
};

export default LoggedinMenu;
{
  /* <>
<a style={{ width: "50px", backgroundColor: "white" }}></a>
<a style={{ width: "50px", backgroundColor: "white" }}></a>
</> */
}
