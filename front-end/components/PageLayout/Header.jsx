/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import AddButton from "./AddButton";
import LoggedinMenu from "./LoggedinMenu";
import { HeaderContainer, HeaderContent } from "./styles/HeaderStyles";
import Logo from "./Logo";
import Link from "next/link";
const Header = () => {
  return (
    <header css={HeaderContainer}>
      <div>
        <div css={HeaderContent}>
          <nav>
            <Link href="/">
              <a aria-label="CFD 홈페이지로 이동">
                <Logo />
              </a>
            </Link>
            <div>
              <Link href="/">
                <a>포트폴리오</a>
              </Link>
              <Link href="/qna">
                <a>Q&A</a>
              </Link>
            </div>
          </nav>
          <nav>
            <AddButton />
            <div>
              <LoggedinMenu />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
