/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import AddButton from "./AddButton";
import LoggedinMenu from "./LoggedinMenu";
import { HeaderContainer, HeaderContent } from "./styles/HeaderStyles";
import Logo from "./logo";
import Link from "next/link";

const Header = () => {
  return (
    <header css={HeaderContainer}>
      <div>
        <div css={HeaderContent}>
          <nav>
            <Link href="/">
              <a>
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
              <a>Magazine</a>
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
