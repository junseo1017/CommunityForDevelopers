/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { blackBtn } from "../Common/style/btnStyle";
import React from "react";
import Link from "next/link";
import { Button, Result } from "antd";
import { useSelector, useDispatch } from "react-redux";

const ResultComp = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <div css={blackBtn}>
      <Result
        status="success"
        title="성공적으로 포트폴리오를 작성했습니다."
        subTitle="홈이나 내 정보로 가서 확인해주세요."
        extra={[
          <Link key={`${me?._id}myInfo`} href={`/profile/${me?._id}`}>
            <Button type="primary" key="console">
              내 정보
            </Button>
          </Link>,
          <Link key={`${me?._id}goHome`} href="/">
            <Button key="buy">홈으로</Button>
          </Link>,
        ]}
      />
    </div>
  );
};

export default ResultComp;
