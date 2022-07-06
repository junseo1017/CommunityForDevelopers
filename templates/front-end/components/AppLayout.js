/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Header from "./PageLayout/Header";
import Footer from "./PageLayout/Footer";
import { ContentContainer } from "./PageLayout/styles/ContentStyle";

const AppLayout = ({ children }) => {
  return (
    <>
      <div style={{ height: "100%", minHeight: "80vh" }}>
        <Header />
        <div css={[ContentContainer]}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
