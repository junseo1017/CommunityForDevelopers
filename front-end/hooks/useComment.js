import React, { useState } from "react";

import { addComment } from "../actions/portfolio";
import { useDispatch } from "react-redux";

const useComment = ({ _id }) => {
  //const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      // setComments([
      //   ...comments,
      //   {
      //     author: nickname,
      //     avatar: imgUrl,
      //     content: <p>{value}</p>,
      //     datetime: moment().fromNow(),
      //   },
      // ]);
      dispatch(
        addComment({ content: value, portfolioId: _id /*, author: { _id, nickname, imgUrl }*/ }),
      );
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return [submitting, handleChange, handleSubmit, value];
};

export default useComment;
