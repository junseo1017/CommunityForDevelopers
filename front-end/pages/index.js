/** @jsxImportSource @emotion/react */
import AppLayout from "../components/AppLayout";
import React, { useMemo } from "react";
import { List, Select, Divider } from "antd";
import { BackTop } from "antd";
import PortfolioCard from "../components/Portfolo/PortfolioCard";
import PorfolioSearch from "../components/Portfolo/PorfolioSearch";
import { loadPortfolios } from "../actions/portfolio";
import wrapper from "../store";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPortfolios, hasMorePortfolios, loadPortfoliosLoading } = useSelector(
    (state) => state.portfolio,
  );
  console.log(me);
  console.log(mainPortfolios);

  const { Option } = Select;

  const portfolioSearchObjects = useMemo(() => {
    const checkboxOptions = [
      {
        label: "제목",
        value: "제목",
      },
      {
        label: "내용",
        value: "내용",
      },
      {
        label: "유저",
        value: "유저",
      },
    ];
    const orderBys = [];
    orderBys.push(<Option key={0}>추천 순</Option>);
    for (let i = 10; i < 36; i++) {
      orderBys.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    return {
      checkboxOptions,
      orderBys,
    };
  }, []);
  const mainContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
  const dividerCss = css`
    margin-top: 5;
    margin-bottom: 15;
  `;

  return (
    <AppLayout>
      <div css={mainContainer}>
        <PorfolioSearch {...portfolioSearchObjects} />
        <Divider css={dividerCss} />
        <List
          grid={{
            gutter: 18,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
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
export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  //const cookie = context.req ? context.req.headers.cookie : "";
  //axios.defaults.headers.Cookie = "";
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  //if (context.req && cookie) {
  //  axios.defaults.headers.Cookie = cookie;
  //}
  await store.dispatch(loadPortfolios());
  //await store.dispatch(myinfo());

  return {
    props: {},
  };
});

export default Home;
