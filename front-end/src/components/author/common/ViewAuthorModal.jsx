import React from 'react'
import { Modal, Row,} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

function ViewAuthorModal(props) {
  return (
    <Modal
    title=" Author Deatils"
    open={props.isModalOpen}
    closeIcon={
      <CloseCircleOutlined
        className="text-2xl text-black font-bold"
        onClick={props.closeModal}
      />
    }
    footer={null}
  >
    <Row className="mt-2">
      <label  size="large" />
    </Row>
    <Row className="mt-2">
      <label  size="large" />
    </Row>
    <Row className="mt-2"></Row>
  </Modal>
);
}

export default ViewAuthorModal