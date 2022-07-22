import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useState, useEffect } from "react";
import { message } from "antd";
import { logout } from "../../actions/user";
import { useRouter } from "next/router";
import { myinfo } from "../../actions/user";
const LoggedinMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [action, setAction] = useState(false);
  const { me, logoutError, logoutDone } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(myinfo());
  }, [router.asPath]);

  // 로그아웃 알림
  useEffect(() => {
    if (!action) return;
    if (logoutError) {
      message.error(logoutError);
      return setAction(false);
    }
    if (logoutDone) {
      message.success("정상적으로 로그아웃 되었습니다.");
      router.push("/");
    }
  }, [logoutDone, logoutError]);

  const logoutHandler = () => {
    dispatch(logout());
    setAction(true);
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
