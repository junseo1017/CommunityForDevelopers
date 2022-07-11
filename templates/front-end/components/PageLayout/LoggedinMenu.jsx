import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import userSlice from "../../reducers/user";

const LoggedinMenu = () => {
  const dispatch = useDispatch();
  const { isLoggedin, isLoggedinCheck } = useSelector((state) => state.user);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(userSlice.actions.logout());
  };

  return (
    <>
      {!isLoggedinCheck ? (
        isLoggedin ? (
          <>
            <Link href="/profile/junseolee">
              <a>내 정보</a>
            </Link>
            <a onClick={logoutHandler}>로그아웃</a>
          </>
        ) : (
          <>
            <Link href="/login">
              <a>로그인</a>
            </Link>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </>
        )
      ) : (
        <>
          <h1>hi</h1>
          <h1>hi</h1>
          <h1>hi</h1>
          <h1>hi</h1>
        </>
      )}
    </>
  );
};

export default LoggedinMenu;
