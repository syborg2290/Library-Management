import React, { useState } from "react";
import { Col, Row, Button } from "antd";
import BooksTable from "../components/book/BooksTable";
import AddBookModal from "../components/book/common/AddBookModal";

const Home = () => {
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
        <AddBookModal closeModal={closeModal} isModalOpen={isModalOpen} />
      ) : null}
      <Row>
        <Col
          span={24}
          className="text-black font-bold flex items-center justify-center text-3xl mt-10"
        >
          Library Management System
        </Col>
      </Row>
      <Row className="mt-10">
        <Col span={12} className="flex justify-center">
          <Button
            onClick={showModal}
            className="bg-blue-700 text-white font-bold rounded-md m-2 py-1"
          >
            Add New Book
          </Button>
        </Col>
        <Col span={12}></Col>
      </Row>
      <Row className="mt-2">
        <Col span={22} className="justify-center mx-10">
          <BooksTable />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
