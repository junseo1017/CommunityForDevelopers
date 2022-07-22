/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Tag } from "antd";
import { useEffect, useState } from "react";
import { QnAContentStyle } from "./styles/MyInfoStyles";
import Link from "next/link";
import { textLimitHandler } from "../Common/textLimit";

const ProfileQnAContent = ({ selectMenu, qnabyUserId }) => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    setQuestion(
      qnabyUserId
        .filter((e) => e.isAnswer === false)
        .map((e) => {
          return { ...e, contents: JSON.parse(e.contents).blocks[0].data.text };
        }),
    );
    setAnswer(
      qnabyUserId
        .filter((e) => e.isAnswer === true)
        .map((e) => {
          return { ...e, contents: JSON.parse(e.contents).blocks[0].data.text };
        }),
    );
  }, []);

  const toStringData = (data) => {
    return new Date(data).toISOString().split("T")[0];
  };

  const showQnAContent = (content) => {
    return (
      <div css={QnAContentStyle}>
        {content &&
          content.map((e) => {
            return (
              <section key={e._id}>
                <div>
                  <Link href={`/qna/${e._id}`}>
                    <a>
                      <h2>{textLimitHandler(e.title, 50)}</h2>
                      <p>{textLimitHandler(e.contents, 80)}</p>
                    </a>
                  </Link>
                </div>
                <div>
                  <p>{toStringData(e.createdAt)}</p>
                  <span>
                    {e.tags.map((e) => {
                      return <Tag key={e}>{e}</Tag>;
                    })}
                  </span>
                </div>
              </section>
            );
          })}
      </div>
    );
  };

  return <article>{selectMenu ? showQnAContent(question) : showQnAContent(answer)}</article>;
};
export default ProfileQnAContent;
