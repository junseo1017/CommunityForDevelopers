/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import AddButton from "./AddButton";
import LoggedinMenu from "./LoggedinMenu";
import { HeaderContainer, HeaderContent, HeaderLogo } from "./styles/HeaderStyles";
import { useSelector } from "react-redux";
import Logo from "./logo";
import Link from "next/link";

const Header = () => {
  const { isLoggedin } = useSelector((state) => state.user);

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
              <Link href="/questions">
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
