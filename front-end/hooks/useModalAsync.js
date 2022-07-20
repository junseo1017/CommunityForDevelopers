import React, { useState } from "react";
import { message } from "antd";

const useModalAsync = (asyncCallback, modalDescription, next, dispatchFunc, imgFormData) => {
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
      if (dispatchFunc) {
        const response = dispatchFunc(data, imgFormData);
        console.log(response);
      } else {
        return;
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
