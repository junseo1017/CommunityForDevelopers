import React, { useState, useCallback, useMemo } from "react";
import useConfirmModal from "./useConfirmModal";
import { addComment } from "../actions/portfolio";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { debounce } from "lodash";

const useComment = ({ nickname, Portf_id, imgUrl }) => {
  //const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const redirectLogin = useCallback(() => {
    Router.push("/login");
  }, []);
  const modalMessage = useMemo(
    () => ({
      title: "로그인이 필요한 서비스 입니다.",
      description: "로그인해 주세요.",
    }),
    [],
  );
  const [showConfirm] = useConfirmModal({
    okFunc: redirectLogin,
    message: modalMessage,
  });
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!nickname) {
      showConfirm();
      return;
    }
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
      dispatch(addComment({ content: value, portfolioId: Portf_id, author: { nickname, imgUrl } }));
    }, 1000);
  };

  const handleChange = debounce((e) => {
    setValue(e.target.value);
  }, 500);

  return [submitting, handleChange, handleSubmit, value];
};

export default useComment;
