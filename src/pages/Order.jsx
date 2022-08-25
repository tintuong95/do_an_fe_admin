import { Button, Col, Input, Modal, Row, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { actionOrderDelete, actionOrderGets } from "../modules/order/action.js";
import ExportExcel from "../components/ExportExcel.jsx";
import makeid from "../utils/rand.js";
import Print from "../components/Print.jsx";
import history from "../utils/history.js";

const { confirm } = Modal;

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderReducer);
  //print
  const [data, setData] = useState();

  //search code
  const [keySearch, setKeySearch] = useState(null);
  const [search, setSearch] = useState(null);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setData(selectedRows);
    },
  };
  const columns = [
    {
      title: "#",

      render: (text, record, index) => <a>{++index}</a>,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Người đặt",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        if (a.UserOrder.fullname < b.UserOrder.fullname) {
          return -1;
        }
        if (a.UserOrder.fullname > b.UserOrder.fullname) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: "Địa chỉ ",
      dataIndex: "province",
      key: "province",
      sorter: (a, b) => {
        if (a.address < b.address) {
          return -1;
        }
        if (a.address > b.address) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: "Trạng thái ",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text == "0") {
          return <Tag color="orange">Đang chờ</Tag>;
        } else {
          return <Tag color="green">Đã xong</Tag>;
        }
      },
      sorter: (a, b) => {
        return Number(a.status) > Number(b.status);
      },
    },
    {
      title: "Thời gian",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (text) => new Date(text).toLocaleDateString("vi-VN"),
    },
    {
      title: "Chi tiết ",

      render: (_, record) => {
        return (
          <NavLink
            to={{
              pathname: "/orders/" + record.id,
              state: record,
            }}
          >
            <Button type="dashed" icon={<EyeOutlined />}></Button>
          </NavLink>
        );
      },
    },
    {
      title: "Xóa đơn",

      render: (_, record) => (
        <Button
          type="dashed"
          danger
          onClick={() => {
            showDeleteConfirm(record.id);
          }}
          icon={<DeleteOutlined />}
        ></Button>
      ),
    },
  ];

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc muốn xóa?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(actionOrderDelete({ id }));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    dispatch(actionOrderGets());
  }, []);
  console.log(data);
  return (
    <>
      <Row justify="space-between mb-4">
        <Col className="flex gap-2">
          <ExportExcel csvData={data} fileName={makeid(5)} />
          <Button
            onClick={() => {
              history.push({
                pathname: "/print",
                state: data,
              });
            }}
          >
            In hang loạt
          </Button>
        </Col>
        <Col>
          <div className="flex gap-2">
            <Input
              onChange={(e) => {
                setKeySearch(e.target.value);
              }}
              placeholder="Nhập tên sản phẩm"
            />
            <Button
              onClick={(e) => {
                setSearch(keySearch);
              }}
              type="primary"
            >
              Tìm kiếm
            </Button>
          </div>
        </Col>
      </Row>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={orders
          .filter((item) => {
            if (!search) return true;
            else {
              return item.code.toLowerCase().includes(search.toLowerCase());
            }
          })
          .map((item) => ({
            ...item,

            key: item.id,
            name: item.UserOrder.fullname,
          }))}
      />
    </>
  );
};

export default Order;
