/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import TagRender from "./TagRender";
import { Row, Col, Select, Input, Divider, Space, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useSelects from "../../hooks/useSelects";
import MainSearch from "./MainSearch";
import { useEffect, useState, useCallback } from "react";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import { useMediaQuery } from "react-responsive";
import { debounce } from "lodash";

const PorfolioSearch = ({ setSearchQuery }) => {
  const [size, setSize] = useState(null);
  const isresponsive = useMediaQuery({
    query: "(max-width:768px)",
  });
  useEffect(() => {
    setSize(isresponsive);
  }, [isresponsive]);
  const [searchOptions, setSearchOptions] = useState({
    contentText: false,
    title: false,
    author: false,
  });
  const [optionsInputs, setOptionsInputs] = useState({
    options: ["contentText", "title", "author"],
  });
  const [inputs, setInputs] = useState({
    orderBy: "createdAt",
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
  const onOptionsChange = (e) => {
    const { name } = e.target;
    const newSearchOptions = { ...searchOptions, [name]: !searchOptions[name] };
    setSearchOptions(newSearchOptions);
    setOptionsInputs({
      ...optionsInputs,
      ["options"]: Object.keys(newSearchOptions).filter((key) => newSearchOptions[key]),
    });
  };

  const delaySetValue = useCallback(
    debounce((value) => {
      setSearchValue(value);
      if (value?.length == 1) {
        message.warning("두 글자 이상이어야 합니다.");
      }
    }, 500),
    [],
  );
  const [searchValue, setSearchValue] = useState("");
  const onSearchValueChange = useCallback((e) => {
    delaySetValue(e.target.value);
  }, []);

  useDidMountEffect(() => {
    const query = "";
    if (optionsInputs.options) {
      query = optionsInputs.options.reduce(
        (prev, cur) => prev + `&option=${cur}`,
        `?page=${inputs.page}`,
      );
    }
    query += `&orderBy=${inputs.orderBy}`;
    if (searchValue) {
      query += `&value=${searchValue}`;
    }
    if (inputs.skills) {
      query = inputs.skills.reduce((prev, cur) => prev + `&skill=${cur}`, query);
    }
    setSearchQuery(query);
  }, [inputs, optionsInputs, searchValue]);

  const [items, name, addItem, onNameChange] = useSelects();
  const OrderBySelectStyle = useMemo(() => ({ width: 106, textAlign: "start" }), []);
  const { Option } = Select;
  const orderBys = [
    <Option key={"createdAt"}>최신 순</Option>,
    <Option key={"recommends"}>추천 순</Option>,
    <Option key={"comments"}>댓글 순</Option>,
    <Option key={"scraps"}>스크랩 순</Option>,
  ];

  return (
    <>
      <Row>
        <MainSearch
          onChange={onOptionsChange}
          searchOptions={searchOptions}
          onSearchValueChange={onSearchValueChange}
        />
      </Row>
      <Row align="space-between" style={{ paddingTop: "10px" }}>
        <Col flex="0 0 auto">
          <Select
            bordered={false}
            size={!size && "large"}
            defaultValue="최신 순"
            onChange={orderByChange}
            style={OrderBySelectStyle}>
            {orderBys}
          </Select>
        </Col>
        <Col flex="0 0 auto">
          <Select
            placement="bottomRight"
            size={!size && "large"}
            style={{
              minWidth: "200px",
            }}
            onChange={skillsChange}
            bordered={false}
            mode="multiple"
            showArrow
            readOnly
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
