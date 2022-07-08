/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Header from "./PageLayout/Header";
import HeaderRes from "./PageLayout/HeaderRes";
import { useState, useEffect } from "react";
import Footer from "./PageLayout/Footer";
import { ContentContainer } from "./PageLayout/styles/ContentStyle";
import { useMediaQuery } from "react-responsive";
const AppLayout = ({ children }) => {
  const [showHeader, setShowHeader] = useState(null);
  const isresponsive = useMediaQuery({
    query: "(max-width:768px)",
  });
  useEffect(() => {
    setShowHeader(isresponsive);
  }, [isresponsive]);
  return (
    <>
      <div style={{ height: "100%", minHeight: "80vh" }}>
        {!showHeader && <Header />}
        {showHeader && <HeaderRes />}
        <div css={[ContentContainer]}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
