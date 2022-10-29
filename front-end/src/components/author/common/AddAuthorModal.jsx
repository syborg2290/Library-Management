import React, { useState } from "react";
import { Modal, Row, Input, Button, Alert, Spin } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createAuthor } from "../../../actions/author";

function AddAuthorModal(props) {
  const authorStatus = useSelector((state) => state);
  const dispatch = useDispatch();
  const [authorData, setAuthorData] = useState({
    first_name: "",
    last_name: "",
  });
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const clearPreState = () => {
    setStatus({
      type: "",
      message: "",
    });
  };

  const addAuthor = async (e) => {
    e.preventDefault();
    clearPreState();
    if (authorData.first_name !== "") {
      if (authorData.last_name !== "") {
        await dispatch(
          createAuthor({
            first_name: authorData.first_name,
            last_name: authorData.last_name,
          })
        );
        if (authorStatus.author.author === null) {
          setStatus({
            type: "error",
            message: authorStatus.author.message,
          });
        } else {
          props.closeModal();
        }
      } else {
        setStatus({
          type: "error",
          message: "Last name is required!",
        });
      }
    } else {
      setStatus({
        type: "error",
        message: "First name is required!",
      });
    }
  };

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
        {status.message !== "" ? (
          <Alert
            className="my-2 w-full"
            message={status.message}
            type={status.type}
          />
        ) : null}
        <Input
          className="rounded-md "
          name="first_name"
          type="text"
          size="large"
          value={authorData.first_name}
          placeholder="First Name"
          required={true}
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
          required={true}
          onChange={(e) =>
            setAuthorData({ ...authorData, last_name: e.target.value })
          }
        />
      </Row>
      <Row className="mt-2">
        <Button
          onClick={addAuthor}
          className="bg-blue-700 text-white font-bold rounded-md m-2 py-1"
        >
          {authorStatus.author.isLoading ? <Spin /> : "Add Author"}
        </Button>
      </Row>
    </Modal>
  );
}

export default AddAuthorModal;
