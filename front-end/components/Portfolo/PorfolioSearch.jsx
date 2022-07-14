/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import TagRender from "./TagRender";
import { Row, Col, Checkbox, Select, Input, Divider, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchButton, CheckboxButton } from "./styles/PorfolioSearchStyle";
import useSelects from "../../hooks/useSelects";

const PorfolioSearch = ({ checkboxOptions, orderBys }) => {
  const [items, name, onNameChange, addItem] = useSelects();
  const { Search } = Input;
  const OrderBySelectStyle = useMemo(() => ({ width: 100, textAlign: "end" }), []);
  const { Option } = Select;

  return (
    <>
      <Row align="middle" gutter={[16, 16]} justify="end">
        <Col flex="1 1 200px">
          <Search
            placeholder="input search text"
            allowClear
            enterButton
            css={SearchButton}
            size="large"
            onSearch={() => {}}
          />
        </Col>
        <Col flex="0 0 auto">
          <Checkbox.Group
            options={checkboxOptions}
            defaultValue={["제목", "내용", "유저"]}
            onChange={() => {}}
            css={CheckboxButton}
          />
        </Col>
        <Col flex="0 0 auto">
          <Select
            bordered={false}
            size="large"
            defaultValue="추천 순"
            onChange={() => {}}
            style={OrderBySelectStyle}>
            {orderBys}
          </Select>
        </Col>
      </Row>
      <Row align="end">
        <Col flex="0 0 auto">
          <Select
            placement="bottomRight"
            size="large"
            style={{
              minWidth: "200px",
            }}
            bordered={false}
            mode="multiple"
            showArrow
            tagRender={TagRender}
            placeholder="skills를 선택해주세요."
            //defaultValue={["gold", "cyan"]}
            options={items}
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Space
                  align="center"
                  style={{
                    padding: "0 8px 4px",
                  }}>
                  <Input placeholder="Please enter item" value={name} onChange={onNameChange} />
                  <Typography.Link
                    onClick={addItem}
                    style={{
                      whiteSpace: "nowrap",
                    }}>
                    <PlusOutlined /> Add item
                  </Typography.Link>
                </Space>
              </div>
            )}>
            {items.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </Col>
      </Row>
    </>
  );
};

export default PorfolioSearch;
