import { useState, useCallback } from "react";

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
  const [onName, setOnName] = useState("");

  const onNameChange = (e) => {
    console.log(e.target.value);
    setOnName(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (onName) setItems([...items, { value: name }]);
    setOnName("");
  };

  return [items, onName, onNameChange, addItem];
};

export default useSelects;
