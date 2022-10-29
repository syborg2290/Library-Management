import React, { useState } from "react";
import { Modal, Row, Input, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";


function AddAuthorModal(props) {
  const [authorData, setAuthorData] = useState({
    first_name: "",
    last_name: "",
  });

  return (
    <Modal
      title="Add New Author"
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
          <Input
          className="rounded-md " 
          name="first_name"
          type="text"
          size="large"
          value={authorData.first_name}
          placeholder="First Name"
          onChange={(e) =>
            setAuthorData({ ...authorData, first_name: e.target.value })
          }
        />
      </Row>
      <Row className="mt-2">
        <Input
          name="last_name"
          className="rounded-md "
          type="text"
          size="large"
          
          value={authorData.last_name}
          placeholder="Last Name"

          onChange={(e) =>
            setAuthorData({ ...authorData, last_name: e.target.value })
          }
        />
      </Row>
      <Row className="mt-2">
        <Button className="bg-blue-700 text-white font-bold rounded-md m-2 py-1">
          Add Author
        </Button>
      </Row>
    </Modal>
  );
}

export default AddAuthorModal;
