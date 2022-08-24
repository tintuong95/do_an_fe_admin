import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  actionProductGets,
  actionProductRemove,
} from "../modules/product/action.js";
import history from "../utils/history.js";

const Product = () => {
  const { products } = useSelector((state) => state.productReducer);
  //search name
  const [keySearch, setKeySearch] = useState(null);
  const [search, setSearch] = useState(null);

  const dispatch = useDispatch();
  //modal delete product
  const confirm = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn muốn xóa bài này !",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
        dispatch(actionProductRemove({ id }));
      },
    });
  };

  const columns = [
    {
      title: "#",

      render: (text, record, index) => <a>{++index}</a>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          className="photo"
          src={process.env.REACT_APP_HOST + "/img/product/" + text}
          alt="photo1"
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => {
        return Number(a) > Number(b);
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (text) => {
        return <Switch defaultChecked={text == "0" ? false : true} />;
      },
      sorter: (a, b) => {
        return Number(a) > Number(b);
      },
    },
    {
      title: "Đánh giá",
      key: "ProductRatings",

      dataIndex: "ProductRatings",
      render: (text, record) => {
        return (
          <NavLink
            to={{
              pathname: "/ratings/" + record.id,
            }}
          >
            {text.length} đánh giá
          </NavLink>
        );
      },
    },
    {
      title: "Bình luận",
      key: "ProductComment",

      dataIndex: "ProductComment",
      render: (text, record) => {
        return (
          <NavLink
            to={{
              pathname: "/comment/product/" + record.id,
            }}
          >
            {text.length} bình luận
          </NavLink>
        );
      },
    },
    {
      title: "Thời gian",
      key: "updatedAt",

      dataIndex: "updatedAt",
      render: (text) => <a>{new Date(text).toLocaleDateString()}</a>,
    },
    {
      title: "Sửa",
      render: (text) => (
        <Link
          to={{
            pathname: "/update-product",
            state: { data: text },
          }}
        >
          <Button type="dashed">Edit</Button>
        </Link>
      ),
    },
    {
      title: "Xóa",

      render: (text, record) => (
        <Button
          type="dashed"
          danger
          onClick={() => {
            confirm(text.id);
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actionProductGets());
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Button
            onClick={() => {
              history.push("/create-product");
            }}
            type="primary"
          >
            Tạo mới
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
      <div className="mt-5">
        <Table
          columns={columns}
          dataSource={products
            .filter((item) => {
              if (!search) return true;
              else {
                return item.title.toLowerCase().includes(search.toLowerCase());
              }
            })
            .map((item) => ({
              ...item,
              key: item.id,
            }))}
        />
      </div>
    </>
  );
};

export default Product;