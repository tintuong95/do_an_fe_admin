import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { actionGroupProductGets } from "../modules/group-product/action.js";
import { actionProductCreate } from "../modules/product/action.js";
import uploadPlugin from "../utils/uploadAdapter.js";
import { actionBlogsPost } from "../modules/blog/action.js";
import { actionGroupBlogGets } from "../modules/group-blog/action.js";

const { Option } = Select;

const CreateBlogs = () => {
  //initial

  const { groupBlogs } = useSelector((state) => state.groupBlogReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {},
  });

  //handler
  function onSubmit() {
    const data = new FormData();
    Object.entries(formik.values).map((item) => {
      data.append(item[0], item[1]);
    });
    dispatch(actionBlogsPost(data));
  }

  useEffect(() => {
    dispatch(actionGroupBlogGets());
  }, []);

  return (
    <div className="w-1/2 m-auto bg-slate-50 p-8">
      <p className="font-semibold text-xl text-neutral-500 mb-4 ">
        Tạo mới blogs
      </p>
      <Form layout="vertical" name="nest-messages">
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Tên bài viết">
              <Input name="title" onChange={formik.handleChange} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Loại bài viết">
              <Select
                defaultValue="lucy"
                style={{ width: "100%" }}
                name="idGroupBlog"
                onChange={(e) => {
                  formik.setFieldValue("idGroupBlog", e);
                }}
              >
                <Option value="lucy">Vui lòng chọn</Option>
                {groupBlogs.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Ảnh đạ diện">
              <input
                id="file_input"
                type="file"
                name="image"
                onChange={(e) => {
                  formik.setFieldValue("image", e.target.files[0]);
                }}
              ></input>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Mô tả ngắn gọn">
              <Input.TextArea
                rows={5}
                name="description"
                onChange={formik.handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Bài viết sản phẩm">
              <CKEditor
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onChange={(event, editor) => {
                  const data = editor.getData();

                  formik.setFieldValue("detail", data);
                }}
                config={{
                  extraPlugins: [uploadPlugin],
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button
              className="w-full"
              type="primary"
              htmlType="button"
              onClick={onSubmit}
            >
              Xác nhận
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateBlogs;
