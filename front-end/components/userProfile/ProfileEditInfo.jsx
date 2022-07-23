/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userWithdrawals } from "../../actions/user";
const ProfileEditInfoStyle = css`
  padding: 20px 0 0 0;
  display: flex;
  align-items: center;
  gap: 15px;
  list-style: none;
  & a {
    color: rgb(200, 200, 200);
    font-weight: 700;
    text-decoration: underline;
  }
`;

const ProfileEditInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [withdrawals, setWithdrawals] = useState(false);
  const { userWithdrawalsDone, userWithdrawalsError, me } = useSelector((state) => state.user);

  const withdrawalsHandler = () => {
    setWithdrawals(confirm("정말 탈퇴하시겠습니까?"));
  };

  useEffect(() => {
    if (withdrawals) {
      dispatch(userWithdrawals());
      router.push("/");
    }
  }, [withdrawals]);

  useEffect(() => {
    if (userWithdrawalsDone) {
      message.success("정상적으로 탈퇴 처리 되었습니다.");
    }
    if (userWithdrawalsError) {
      message.error("탈퇴 처리 중 오류가 발생했습니다.");
    }
  }, [userWithdrawalsDone, userWithdrawalsError]);

  return (
    <ul css={ProfileEditInfoStyle}>
      <li>
        <a onClick={withdrawalsHandler}>회원탈퇴</a>
      </li>
      {me && me.loginType === "CFD" ? (
        <li>
          <Link href={`/profile/${router.query.id}/editPassword`}>
            <a>비밀번호 변경</a>
          </Link>
        </li>
      ) : (
        <p></p>
      )}
    </ul>
  );
};
export default ProfileEditInfo;
