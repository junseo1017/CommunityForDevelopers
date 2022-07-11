import React, { useState } from "react";

const options = [
  {
    value: "React",
  },
  {
    value: "Next js",
  },
  {
    value: "Redux",
  },
  {
    value: "Typescript",
  },
];

const useSelects = () => {
  const [items, setItems] = useState(options);
  const [name, setName] = useState("");
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    if (name) setItems([...items, { value: name }]);
    setName("");
  };

  return [items, name, onNameChange, addItem];
};

export default useSelects;
