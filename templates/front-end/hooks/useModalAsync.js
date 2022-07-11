import React, { useState } from "react";
import { message } from "antd";

const useModalAsync = (asyncCallback, modalDescription, optionalCallback) => {
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
      const content = await asyncCallback();
      console.log(content);
      setTimeout(() => {
        setModalVisible(false);
        setConfirmLoading(false);
        if (optionalCallback) optionalCallback();
        message.success("Processing complete!");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return [modalVisible, setModalVisible, handleOk, confirmLoading, modalText, showModal];
};

export default useModalAsync;
