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
                <address>ddd@gmail.com</address>
                <li>한 일</li>
                <li>한 일</li>
              </div>
            </ul>
            <ul>
              <h4>김태준(Backend)</h4>
              <div>
                <address>ddd@gmail.com</address>
                <li>한 일</li>
                <li>한 일</li>
              </div>
            </ul>
            <ul>
              <h4>이준서(Frontend)</h4>
              <div>
                <address>dlwnstjzld@gmail.com</address>
                <li>페이지 레이아웃 컴포넌트</li>
                <li>헤더, 푸터</li>
                <li>로그인</li>
                <li>회원가입</li>
                <li>유저 프로필</li>
              </div>
            </ul>
            <ul>
              <h4>이형민(Frontend)</h4>
              <div>
                <address>ddd@gmail.com</address>
                <li>한 일</li>
                <li>한 일</li>
              </div>
            </ul>
            <ul>
              <h4>지의신(Frontend)</h4>
              <div>
                <address>ddd@gmail.com</address>
                <li>한 일</li>
                <li>한 일</li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
