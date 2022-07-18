import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useState, useEffect } from "react";
import { message } from "antd";
import { logout } from "../../actions/user";
const LoggedinMenu = () => {
  const [action, setAction] = useState(false);
  const dispatch = useDispatch();
  const { me, logoutError, logoutDone } = useSelector((state) => state.user);

  // 로그아웃 알림
  useEffect(() => {
    if (!action) return;
    if (logoutError) {
      message.error(logoutError);
      return setAction(false);
    }
    if (logoutDone) {
      message.success("정상적으로 로그아웃 되었습니다.");
      return setAction(false);
    }
  }, [logoutDone, logoutError]);

  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload();
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
