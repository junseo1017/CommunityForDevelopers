/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { FooterContainer, FooterContent } from "./styles/FooterStyle";

const Footer = () => {
  return (
    <footer css={FooterContainer}>
      <div>
        <div css={FooterContent}>
          <div>
            <address>
              <h4>Community For Developers</h4>
              <p>Team6</p>
            </address>
            <p>개발자들을 위한 커뮤니티 플랫폼 </p>
          </div>
          <div>
            <ul>
              <h4>김용민(L,Backend)</h4>
              <div>
                <address>bdd3452@gmail.com</address>
                <li>User API / QnA API</li>
                <li>Cookie & Jwt token</li>
                <li>Image Upload</li>
                <li>Email 인증</li>
              </div>
            </ul>
            <ul>
              <h4>김태준(Backend)</h4>
              <div>
                <address>xowns1016@gmail.com</address>
                <li>Portfolio API / Comment API</li>
                <li>Oauth [Social Login]</li>
                <li>검색기능</li>
                <li>댓글기능</li>
              </div>
            </ul>
            <ul>
              <h4>이준서(Frontend)</h4>
              <div>
                <address>dlwnstjzld@gmail.com</address>
                <li>페이지 레이아웃 컴포넌트</li>
                <li>헤더/푸터</li>
                <li>로그인/회원가입</li>
                <li>유저 프로필</li>
              </div>
            </ul>
            <ul>
              <h4>이형민(Frontend)</h4>
              <div>
                <address>hyoungqu23@gmail.com</address>
                <li>QnA 레이아웃 컴포넌트</li>
                <li>질문 CRUD</li>
                <li>답변 CRUD</li>
                <li>추천/스크랩</li>
              </div>
            </ul>
            <ul>
              <h4>지의신(Frontend)</h4>
              <div>
                <address>usgeeus@gmail.com</address>
                <li>Portfolio 레이아웃 컴포넌트</li>
                <li>에디터 JS</li>
                <li>검색/스크롤</li>
                <li>댓글</li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
