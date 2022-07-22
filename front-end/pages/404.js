/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import LoginLogo from "../components/Sign/LoginLogo";
import Link from "next/link";
const ErrorPageStlye = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 90vh;
  section {
    padding: 0 40px;
    hgroup {
      text-align: center;
      h1 {
        font-size: 120px;
        margin: 0;
      }
      h2 {
        font-size: 30px;
        @media (max-width: 500px) {
          font-size: 20px;
        }
      }
    }
    p {
      text-align: center;
      font-size: 16px;
    }
  }
`;

export default function Custom404() {
  return (
    <div css={ErrorPageStlye}>
      <Link href="/">
        <a aria-label="CFD 홈페이지로 이동하기">
          <LoginLogo />
        </a>
      </Link>
      <main>
        <section>
          <hgroup>
            <h1>404</h1>
            <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
          </hgroup>
          <p>방문하시려는 페이지의 주소가 올바른지 다시 한 번 확인해주세요.</p>
        </section>
      </main>
    </div>
  );
}
