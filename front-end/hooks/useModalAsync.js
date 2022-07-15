import React, { useState } from "react";
import { message } from "antd";

const useModalAsync = (asyncCallback, modalDescription, next, dispatchFunc) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(modalDescription);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };
  const handleOk = async () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    try {
      const data = await asyncCallback();
      console.log(data);

      // setTimeout(() => {
      setModalVisible(false);
      setConfirmLoading(false);
      console.log(dispatchFunc);
      if (dispatchFunc) {
        const response = dispatchFunc(data);
        console.log(response);
      }
      next();
      message.success("Processing complete!");
      // }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return [modalVisible, setModalVisible, handleOk, confirmLoading, modalText, showModal];
};

export default useModalAsync;
