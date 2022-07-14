/** @jsxImportSource @emotion/react */
import AppLayout from "../components/AppLayout";
import React, { useMemo } from "react";
import wrapper from "../store";
import { List, Select, Divider } from "antd";
import { BackTop } from "antd";
import PortfolioCard from "../components/Portfolo/PortfolioCard";
import PorfolioSearch from "../components/Portfolo/PorfolioSearch";
import { myinfo } from "../actions/user";
import axios from "axios";
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
    label: "Apple",
    value: "Apple",
  },
  {
    label: "Pear",
    value: "Pear",
  },
  {
    label: "Orange",
    value: "Orange",
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
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <PortfolioCard />
            </List.Item>
          )}
        />
      </div>
      <BackTop />
    </AppLayout>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
  const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
  axios.defaults.headers.Cookie = ""; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(myinfo());
  return {
    props: {},
  };
});

export default Home;
