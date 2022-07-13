/** @jsxImportSource @emotion/react */
import AppLayout from "../components/AppLayout";
import React, { useMemo } from "react";
import { List, Select, Divider } from "antd";
import { BackTop } from "antd";
import PortfolioCard from "../components/Portfolo/PortfolioCard";
import PorfolioSearch from "../components/Portfolo/PorfolioSearch";
import { loadPortfolios } from "../actions/portfolio";
import { userinfo } from "../actions/user";
import wrapper from "../store";
import { useDispatch, useSelector } from "react-redux";

const tagsOptions = [
  {
    value: "gold",
    label: "React",
  },
  {
    value: "lime",
    label: "Typescript",
  },
  {
    value: "green",
    label: "Redux",
  },
  {
    value: "cyan",
    label: "Next js",
  },
];

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
const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
  {
    title: "Title 6",
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPortfolios, hasMorePortfolios, loadPortfoliosLoading } = useSelector(
    (state) => state.portfolio,
  );
  console.log(me);
  console.log(mainPortfolios);

  const { Option } = Select;
  const orderBys = [];
  orderBys.push(<Option key={0}>추천 순</Option>);
  for (let i = 10; i < 36; i++) {
    orderBys.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  const portfolioSearchObjects = useMemo(
    () => ({
      checkboxOptions,
      orderBys,
      tagsOptions,
    }),
    [],
  );

  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
        <PorfolioSearch {...portfolioSearchObjects} />
        <Divider style={{ marginTop: 5, marginBottom: 15 }} />
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
  await store.dispatch(userinfo());

  return {
    props: {},
  };
});

export default Home;
