/** @jsxImportSource @emotion/react */
import AppLayout from "../components/AppLayout";
import React, { useMemo, useEffect, useCallback, useState } from "react";
import wrapper from "../store";
import { List, Select, Divider } from "antd";
import { BackTop } from "antd";
//import PortfolioCard from "../components/Portfolo/PortfolioCard";
import PortfolioCard from "../components/Common/PortfolioCard";
import PorfolioSearch from "../components/Portfolo/PorfolioSearch";
import {
  loadPortfolios,
  loadPortfoliosSearch,
  loadPortfoliosSearchScroll,
} from "../actions/portfolio";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { myinfo } from "../actions/user";
import useDidMountEffect from "../hooks/useDidMountEffect";
import { throttle, debounce } from "lodash";
import { useRouter } from "next/router";
const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  console.log(me);
  const { mainPortfolios, hasMorePortfolios, loadPortfoliosLoading } = useSelector(
    (state) => state.portfolio,
  );

  console.log(mainPortfolios);
  const [query, setQuery] = useState();
  const setSearchQuery = useCallback((q) => {
    setQuery(q);
  }, []);

  useEffect(() => {
    const onScroll = throttle(() => {
      // window.scrollY : 얼마나 내렸는지
      // document.documentElement.clientHeight : 화면에 보이는 길이
      // document.documentElement.scrollHeight : 총길이
      if (hasMorePortfolios && !loadPortfoliosLoading) {
        if (
          window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 300
        ) {
          //const lastId = mainPortfolios[mainPortfolios.length - 1]?._id;
          const page = Math.floor((mainPortfolios.length - 1) / 12) + 2;
          if (query) {
            const newQuery = query?.substring(0, 6) + `${page}` + query?.substring(7);
            const func = debounce(() => {
              dispatch(
                loadPortfoliosSearchScroll({
                  query: newQuery,
                }),
              );
            }, 500);
            func();
          } else {
            const func = debounce(() => {
              dispatch(
                loadPortfoliosSearchScroll({
                  query: `?page=${page}`,
                }),
              );
            }, 500);
            func();
          }
        }
      }
    }, 500);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePortfolios, loadPortfoliosLoading, mainPortfolios]);

  useDidMountEffect(() => {
    console.log(query);
    dispatch(
      loadPortfoliosSearch({
        query,
      }),
    );
  }, [query]);

  return (
    <AppLayout>
      <div css={mainContainer}>
        <PorfolioSearch setSearchQuery={setSearchQuery} me={me} />
        <Divider css={dividerCss} />
        <List
          grid={{
            gutter: 18,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={mainPortfolios}
          renderItem={(item) => {
            return (
              <List.Item>
                <PortfolioCard {...item} />
              </List.Item>
            );
          }}
        />
      </div>
      <BackTop />
    </AppLayout>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
  axios.defaults.headers.Cookie = ""; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(
    loadPortfoliosSearch({
      query: "?page=1",
    }),
  );
  await store.dispatch(myinfo());
  return {
    props: {},
  };
});

export default Home;

const mainContainer = css`
  width: 100%;
`;
const dividerCss = css`
  margin-top: 13px;
  margin-bottom: 15px;
  @media (max-width: 768px) {
    margin-top: 9px;
    margin-bottom: 14px;
  }
`;
