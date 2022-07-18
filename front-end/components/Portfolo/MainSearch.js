import React from "react";
/** @jsxImportSource @emotion/react */
import { SearchCss, Button } from "./styles/mainSearchStyle";

const MainSearch = ({ onChange, searchOptions }) => {
  return (
    <div css={SearchCss}>
      <div>
        <div>
          <div>
            <svg viewBox="0 0 12 12">
              <path d="M11.407,10.421,8.818,7.832a4.276,4.276,0,1,0-.985.985l2.589,2.589a.7.7,0,0,0,.985-.985ZM2.355,5.352a3,3,0,1,1,3,3,3,3,0,0,1-3-3Z"></path>
            </svg>
          </div>
          <form>
            <label htmlFor="search">
              <input
                type="search"
                name="value"
                authocomplete="off"
                placeholder="검색"
                aria-label="포트폴리오 검색"
                onChange={onChange}
              />
            </label>
          </form>
        </div>
      </div>
      <div>
        <ul>
          <li>
            <Button checked={searchOptions.title} name="title" onClick={onChange}>
              제목
            </Button>
          </li>
          <li>
            <Button checked={searchOptions.contentText} name="contentText" onClick={onChange}>
              내용
            </Button>
          </li>
          <li>
            <Button
              checked={searchOptions["author.nickname"]}
              name="author.nickname"
              onClick={onChange}>
              유저
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainSearch;
