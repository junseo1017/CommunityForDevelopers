/** @jsxImportSource @emotion/react */
import { useMemo, useRef } from "react";
import TagRender from "./TagRender";
import { Row, Col, Select, Input, Divider, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useSelects from "../../hooks/useSelects";
import MainSearch from "./MainSearch";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPortfoliosSearch } from "../../actions/portfolio";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import useDebouncedEffect from "../../hooks/useDebouncedEffect";
import _ from "lodash";

const PorfolioSearch = ({ orderBys, setSearchQuery }) => {
  const dispatch = useDispatch();

  const [searchOptions, setSearchOptions] = useState({
    contentText: false,
    title: false,
    author: false,
  });

  const [optionsInputs, setOptionsInputs] = useState({
    options: ["contentText", "title", "author"],
  });

  const [inputs, setInputs] = useState({
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
  const onOptionsChange = (e) => {
    const { name } = e.target;
    const newSearchOptions = { ...searchOptions, [name]: !searchOptions[name] };
    setSearchOptions(newSearchOptions);
    setOptionsInputs({
      ...optionsInputs,
      ["options"]: Object.keys(newSearchOptions).filter((key) => newSearchOptions[key]),
    });
  };
  const [searchValue, setSearchValue] = useState("");
  //useDebouncedEffect(() => console.log(value), 1000, [value]);
  const onSearchValueChange = useCallback((e) => {
    setSearchValue(e.target.value);
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
    //dispatch(loadPortfoliosSearch({ ...inputs, ...optionsInputs }));
  }, [inputs, optionsInputs, searchValue]);

  const [items, name, onNameChange, addItem] = useSelects();
  const OrderBySelectStyle = useMemo(() => ({ width: 106, textAlign: "end" }), []);
  const { Option } = Select;

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
