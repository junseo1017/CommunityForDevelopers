import React from 'react';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/index';
const MyApp = ({Component, pageProps}) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(MyApp);
