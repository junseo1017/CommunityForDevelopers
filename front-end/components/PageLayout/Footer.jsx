/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { FooterContainer, FooterContent } from "./styles/FooterStyle";

const Footer = () => {
  return (
    <footer css={FooterContainer}>
      <div>
        <div css={FooterContent}>
          <h2>CFD</h2>
          <p>개발자들을 위한 커뮤니티 플랫폼 </p>
          <h3></h3>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
