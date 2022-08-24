import {
  Space,
  Table,
  Tag,
  Switch,
  Button,
  Row,
  Col,
  Input,
  Modal,
  
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { actionBlogsGets, actionBlogsRemove } from "../modules/blog/action";
import history from "../utils/history.js";

const Blogs = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blogReducer.blogs);
  //search name
  const [keySearch, setKeySearch] = useState(null);
  const [search, setSearch] = useState(null);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  //modal delete product
  const confirm = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn muốn xóa bài này !",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk() {
        dispatch(actionBlogsRemove({ id }));
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
      render: (text, record, index) => (
        <img
          src={process.env.REACT_APP_HOST + "/img/blog/" + text}
          alt={record.title}
          className="photo"
        />
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
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
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (text, record, index) => (
        <Switch
          onChange={onChange}
          defaultChecked={text == "0" ? true : false}
        />
      ),
      sorter: (a, b) => {
        return Number(a) > Number(b);
      },
    },
    {
      title: "Đánh giá",
      key: "ratings",

      dataIndex: "ratings",
      render: (text) => <a>5 đánh giá</a>,
    },
    {
      title: "Bình luận",
      key: "BlogComment",

      dataIndex: "BlogComment",
      render: (text, record) => (
        <NavLink
          to={{
            pathname: "/comment/blogs/" + record.id,
           
          }}
        >
          {text.length} bình luận
        </NavLink>
      ),
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
            pathname: "/update-blog",
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
    dispatch(actionBlogsGets());
  }, []);

  //console.log(blogs);
  return (
    <>
      <Row justify="space-between">
        <Col>
          <Button
            onClick={() => {
              history.push("/create-blog");
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

      <div className="my-4"></div>
      <Table
        columns={columns}
        dataSource={posts
          .filter((item) => {
            if (!search) return true;
            else {
              return item.title.toLowerCase().includes(search.toLowerCase());
            }
          })
          .map((item, index) => {
            return {
              ...item,
              key: item.id,
            };
          })}
      />
    </>
  );
};

export default Blogs;
