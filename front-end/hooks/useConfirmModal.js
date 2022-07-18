import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import React from "react";
const { confirm } = Modal;

const useConfirmModal = (okFunc, cancleFunc, message) => {
  const showConfirm = () => {
    confirm({
      title: message.title,
      icon: <ExclamationCircleOutlined />,
      content: message.description,

      onOk() {
        console.log("OK");
        okFunc();
      },

      onCancel() {
        console.log("Cancel");
        cancleFunc();
      },
    });
  };
  return [showConfirm];
};

export default useConfirmModal;
