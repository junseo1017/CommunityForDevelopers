/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import {ContentContainer} from './Layout/ContentStyle';
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
