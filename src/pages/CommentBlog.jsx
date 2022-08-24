import { Button, Space, Table, Tag } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation ,useParams} from "react-router-dom";
import { actionCommentBlogGets, actionCommentBlogRemove } from "../modules/comment-blog/action.js";
import { actionCommentProductGets, actionCommentProductRemove } from "../modules/comment-product/action.js";



const CommentBlog = () => {

  const { id } = useParams()
  const dispatch=useDispatch()
  const { commentBlogs } = useSelector((state) => state.commentBlogReducer);


 
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

      render: (text, record) => {
        console.log(record);

        return (
          <Button
            type="dashed"
            danger
            onClick={() => {
              console.log({ id: text.id, idBlog: id });
              dispatch(actionCommentBlogRemove({ id: text.id, idBlog: id }));
            }}
          >
            Remove
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(actionCommentBlogGets({ idBlog: id }));
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={commentBlogs.map((item) => ({
        ...item,
        key: item.id,
        username: item.UserCommentBlog.username,
      }))}
    />
  );
};

export default CommentBlog;
