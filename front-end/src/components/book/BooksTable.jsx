import React from "react";
import { Table, Space, Tooltip } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import UpdateBookModal from "./common/UpdateBookModal";
import ViewBookModal from "./common/ViewBookModal";
import { useState } from "react";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    
  },
];

const BooksTable = () => {
  const [isOpenUpdateModal, setOpenUpdateModal] = useState(false);
  const [isOpenViewModal, setOpenViewModal] = useState(false);

  const showUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const showViewModal = () => {
    setOpenViewModal(true);
  };

  const closeViewModal = () => {
    setOpenViewModal(false);
  };

  const columns = [
    {
      title: "Author",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "ISBN",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Book">
            <EyeOutlined
              className="text-2xl text-red-600 font-bold"
              onClick={showViewModal}
            />
          </Tooltip>
          <Tooltip title="Update Book">
            <EditOutlined
              className="text-2xl text-green-700 font-bold"
              onClick={showUpdateModal}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <div>
      {isOpenUpdateModal ? (
        <UpdateBookModal
          closeModal={closeUpdateModal}
          isModalOpen={isOpenUpdateModal}
        />
      ) : null}
      {isOpenViewModal ? (
        <ViewBookModal
          closeModal={closeViewModal}
          isModalOpen={isOpenViewModal}
        />
      ) : null}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default BooksTable;
