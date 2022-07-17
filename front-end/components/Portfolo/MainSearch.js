import React from "react";
/** @jsxImportSource @emotion/react */
import { SearchCss } from "./styles/mainSearchStyle";

const MainSearch = () => {
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
                name="search"
                authocomplete="off"
                placeholder="검색"
                aria-label="포트폴리오 검색"
              />
            </label>
          </form>
        </div>
      </div>
      <div>
        <ul>
          <li className="checked">
            <button>제목</button>
          </li>
          <li>
            <button>내용</button>
          </li>
          <li>
            <button>유저</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainSearch;
