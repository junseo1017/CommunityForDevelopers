import { useSelector } from "react-redux";
import Link from "next/link";

const LoggedinMenu = () => {
  const { isLoggedin } = useSelector((state) => state.user);
  return (
    <>
      {isLoggedin ? (
        <>
          <Link href="/profile/junseolee">
            <a>내 정보</a>
          </Link>
          <Link href="#">
            <a>로그아웃</a>
          </Link>
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
      )}
    </>
  );
};

export default LoggedinMenu;
