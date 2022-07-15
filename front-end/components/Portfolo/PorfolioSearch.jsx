/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import TagRender from "./TagRender";
import { Row, Col, Checkbox, Select, Input } from "antd";
import { SearchButton, CheckboxButton } from "./styles/PorfolioSearchStyle";

const PorfolioSearch = ({ checkboxOptions, orderBys, tagsOptions }) => {
  const { Search } = Input;
  const OrderBySelectStyle = useMemo(() => ({ width: 100, textAlign: "end" }), []);

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
            defaultValue={["Pear"]}
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
            size="large"
            mode="multiple"
            showArrow
            bordered={false}
            tagRender={TagRender}
            defaultValue={["gold", "cyan"]}
            options={tagsOptions}
          />
        </Col>
      </Row>
    </>
  );
};

export default PorfolioSearch;
