/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Button, Tag } from "antd";

import { useCallback, useState } from "react";
import { profileContentCardContainer, qnaContainer, qnaNavStyle } from "./styles/MyInfoStyles";
import ProfileQnAContent from "./ProfileQnAContent";
import { useSelector } from "react-redux";

const ProfileQnA = () => {
  const [selectMenu, setSelectMenu] = useState(true);
  const { qnabyUserId } = useSelector((state) => state.qna);

  const onSelectHandler = useCallback((e) => {
    if (e.target.textContent === "질문") {
      setSelectMenu(true);
    }
    if (e.target.textContent === "답변") {
      setSelectMenu(false);
    }
  }, []);

  return (
    <Card css={profileContentCardContainer}>
      <article css={qnaContainer}>
        <nav onClick={onSelectHandler} css={qnaNavStyle}>
          <h3
            css={css`
              ${selectMenu && "color:rgb(0,0,0) !important"}
            `}>
            질문
          </h3>
          <h3
            css={css`
              ${!selectMenu && "color:rgb(0,0,0) !important"}
            `}>
            답변
          </h3>
        </nav>
        {<ProfileQnAContent selectMenu={selectMenu} qnabyUserId={qnabyUserId} />}
      </article>
    </Card>
  );
};
export default ProfileQnA;
