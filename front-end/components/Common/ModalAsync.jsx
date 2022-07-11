import { Button, Modal } from "antd";
import React, { useState } from "react";

const ModalAsync = ({ visible, setVisible, handleOk, confirmLoading, modalText }) => {
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <Modal
      title="Title"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}>
      <p>{modalText}</p>
    </Modal>
  );
};

export default ModalAsync;
