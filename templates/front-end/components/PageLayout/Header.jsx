/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import AddButton from "./AddButtone";
import { HeaderContainer, HeaderContent, HeaderLogo } from "./styles/HeaderStyles";
import Logo from "./logo";

const Header = () => {
  return (
    <header css={HeaderContainer}>
      <div>
        <div css={HeaderContent}>
          <nav>
            <a href="/">
              <Logo />
            </a>
            <div>
              <a>포트폴리오</a>
              <a>Q&A</a>
              <a>Magazine</a>
            </div>
          </nav>
          <nav>
            <AddButton />
            <div>
              <a>로그인</a>
              <a>회원가입</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
