import React, { useState } from "react";
import AuthorTable from "../components/author/AuthorTable";
import AddAuthorModal from "../components/author/common/AddAuthorModal";
import { Col, Row, Button } from "antd";
function Author() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {isModalOpen ? (
        <AddAuthorModal closeModal={closeModal} isModalOpen={isModalOpen} />
      ) : null}
      
      <Row>
        <Col
          span={24}
          className="text-black font-bold flex items-center justify-center text-3xl mt-10"
        >
          Manage Authors
        </Col>
      </Row>
      <Row className="mt-10 ml-20">
        <Col span={1} className="flex justify-center">
          <Button
            className="mr-11"
            onClick={showModal}
            className="bg-blue-700 text-white font-bold rounded-md m-2 py-1"
          >
            Add New Author
          </Button>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={22} className="justify-center mx-10">
          <AuthorTable />
        </Col>
      </Row>
    </div>
  );
}

export default Author;
