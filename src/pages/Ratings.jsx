import { Button, Space, Table, Tag } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import {StarOutlined} from "@ant-design/icons"
import { actionRatingsGets, actionRatingsRemove } from "../modules/ratings/action.js";

const Ratings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ratings } = useSelector((state) => state.ratingsReducer);

  const columns = [
    {
      title: "#",
      render: (text, record, index) => <a>{++index}</a>,
    },
    {
      title: "Người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Nội dung",
      dataIndex: "rate",
      key: "rate",
      render:(text)=>{
        return <StarOutlined />;
      }
    },
    {
      title: "Thời gian",
      key: "updatedAt",

      dataIndex: "updatedAt",
      render: (text) => <a>{new Date(text).toLocaleDateString()}</a>,
    },
    {
      title: "Xóa",
      render: (text, record) => (
        <Button
          type="dashed"
          danger
          onClick={() => {
            dispatch(
              actionRatingsRemove({ id: text.id, idProduct: id })
            );
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actionRatingsGets({ idProduct: id }));
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={ratings.map((item) => ({
        ...item,
        key: item.id,
        username: item.UserRatings.username,
      }))}
    />
  );
};

export default Ratings;
