/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import TagRender from "./TagRender";
import { Row, Col, Select, Input, Divider, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useSelects from "../../hooks/useSelects";
import MainSearch from "./MainSearch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPortfoliosSearch } from "../../actions/portfolio";
import useDidMountEffect from "../../hooks/useDidMountEffect";

const PorfolioSearch = ({ orderBys }) => {
  const dispatch = useDispatch();

  const [searchOptions, setSearchOptions] = useState({
    contentText: false,
    title: false,
    "author.nickname": false,
  });

  const [optionsInputs, setOptionsInputs] = useState({
    options: ["contentText", "title", "author.nickname"],
  });
  const [inputs, setInputs] = useState({
    value: "",
    orderBy: "recommends",
    skills: [],
    page: 1,
  });
  const orderByChange = (value) => {
    setInputs({
      ...inputs,
      ["orderBy"]: value,
    });
  };
  const skillsChange = (value) => {
    setInputs({
      ...inputs,
      ["skills"]: value,
    });
  };
  const onChange = (e) => {
    const { value, name, tagName } = e.target;
    if (tagName === "BUTTON") {
      const newSearchOptions = { ...searchOptions, [name]: !searchOptions[name] };
      setSearchOptions(newSearchOptions);
      setOptionsInputs({
        ...optionsInputs,
        ["options"]: Object.keys(newSearchOptions).filter((key) => newSearchOptions[key]),
      });
      return;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useDidMountEffect(() => {
    console.log({ ...inputs, ...optionsInputs });
    dispatch(loadPortfoliosSearch({ ...inputs, ...optionsInputs }));
  }, [inputs, optionsInputs]);

  const [items, name, onNameChange, addItem] = useSelects();
  const OrderBySelectStyle = useMemo(() => ({ width: 106, textAlign: "end" }), []);
  const { Option } = Select;

  return (
    <>
      <Row>
        <MainSearch onChange={onChange} searchOptions={searchOptions} />
      </Row>
      <Row align="space-between" style={{ paddingTop: "10px" }}>
        <Col flex="0 0 auto">
          <Select
            bordered={false}
            size="large"
            defaultValue="추천 순"
            onChange={orderByChange}
            style={OrderBySelectStyle}>
            {orderBys}
          </Select>
        </Col>
        <Col flex="0 0 auto">
          <Select
            placement="bottomRight"
            size="large"
            style={{
              minWidth: "200px",
            }}
            onChange={skillsChange}
            bordered={false}
            mode="multiple"
            showArrow
            tagRender={TagRender}
            placeholder="skills를 선택해주세요."
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
