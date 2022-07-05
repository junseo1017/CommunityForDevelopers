/** @jsxImportSource @emotion/react */
import React from 'react';
import Head from 'next/head';
import {
  Row,
  Col,
  Card,
  List,
  Input,
  Space,
  Checkbox,
  Select,
  Tag,
  Divider,
} from 'antd';
import Link from 'next/link';
import PortfolioCard from '../components/PortfolioCard';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react';

const tagsOptions = [
  {
    value: 'gold',
  },
  {
    value: 'lime',
  },
  {
    value: 'green',
  },
  {
    value: 'cyan',
  },
];
const tagRender = (props) => {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};
const options = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
  },
];
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];
const Home = () => {
  const { Search } = Input;
  const { Option } = Select;
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}
    >
      <Space direction="vertical">
        <Row align="middle" gutter={[16, 16]}>
          <Col flex="1 1 200px">
            <Search
              placeholder="input search text"
              allowClear
              enterButton
              size="large"
              onSearch={() => {}}
            />
          </Col>
          <Col flex="0 0 auto">
            <Select
              size="large"
              defaultValue="a1"
              onChange={() => {}}
              style={{
                width: 200,
              }}
            >
              {children}
            </Select>
          </Col>
          <Col flex="0 0 auto">
            <Checkbox.Group
              options={options}
              defaultValue={['Pear']}
              onChange={() => {}}
            />
          </Col>
          <Col flex="0 0 auto">
            <Select
              size="large"
              mode="multiple"
              showArrow
              bordered={false}
              tagRender={tagRender}
              defaultValue={['gold', 'cyan']}
              style={{
                width: '100%',
              }}
              options={tagsOptions}
            />
          </Col>
        </Row>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <PortfolioCard />
            </List.Item>
          )}
        />
      </Space>
    </div>
  );
};

export default Home;
