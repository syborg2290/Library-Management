import React from "react";
import { Modal, Row, Input, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

function UpdateBookModal(props) {
  return (
    <Modal
      title="Update Book"
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
        <Input className="rounded-md " size="large" placeholder="Book Name" />
      </Row>
      <Row className="mt-2">
        <Input className="rounded-md " size="large" placeholder="ISBN" />
      </Row>
      <Row className="mt-2">
        <Button className="bg-blue-700 text-white font-bold rounded-md m-2 py-1">
          Update
        </Button>
      </Row>
    </Modal>
  );
}

export default UpdateBookModal;
