/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react';
import Header from './PageLayout/Header';
import Footer from './PageLayout/Footer';
import {ContentContainer} from './PageLayout/ContentStyle';
const AppLayout = ({children}) => {
  return (
    <>
      <Header />
      <div css={ContentContainer}>{children}</div>
      <Footer />
    </>
  );
};

export default AppLayout;
