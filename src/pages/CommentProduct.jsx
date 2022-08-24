import { Button, Space, Table, Tag } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation ,useParams} from "react-router-dom";
import { actionCommentProductGets, actionCommentProductRemove } from "../modules/comment-product/action.js";



const CommentProduct = () => {

  const { id } = useParams()
  const dispatch=useDispatch()
  const { commentProducts } = useSelector(
    (state) => state.commentProductReducer
  );


 
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
      dataIndex: "content",
      key: "content",
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
        <Button type="dashed" danger onClick={() => {
          dispatch(actionCommentProductRemove({id:text.id,idProduct:id}));
        }}>
          Remove
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actionCommentProductGets({ idProduct: id }));
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={commentProducts.map((item) => ({
        ...item,
        key: item.id,
        username: item.UserCommentProduct.username,
      }))}
    />
  );
};

export default CommentProduct;
