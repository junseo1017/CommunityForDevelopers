import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag } from "antd";
// import { TweenOneGroup } from "rc-tween-one";
import React, { useEffect, useRef, useState } from "react";

const AddTags = ({ addTags }) => {
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    addTags(tags);
  }, [tags]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }

    setInputVisible(false);
    setInputValue("");
  };

  return (
    <>
      <div className="tags-container">
        {tags.map((tag, index) => {
          return (
            <Tag
              className="tags-input"
              key={index}
              onClick={(e) => handleClose(e.target.innerText)}>
              {tag}
            </Tag>
          );
        })}
      </div>
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          placeholder="태그를 입력하세요."
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} className="site-tag-plus">
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default AddTags;
