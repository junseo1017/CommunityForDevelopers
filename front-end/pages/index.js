/** @jsxImportSource @emotion/react */
import AppLayout from "../components/AppLayout";
import React, { useMemo } from "react";
import { List, Select, Divider } from "antd";
import { BackTop } from "antd";
import PortfolioCard from "../components/Portfolo/PortfolioCard";
import PorfolioSearch from "../components/Portfolo/PorfolioSearch";

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

export default Home;
