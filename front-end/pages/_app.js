import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import "antd/dist/antd.css";
import { useEffect } from "react";
import wrapper from "../store/index";
import { useDispatch } from "react-redux";
import { myinfo } from "../actions/user";

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // 로그인 여부 확인
    dispatch(myinfo());
  }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>CFD</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(MyApp);
