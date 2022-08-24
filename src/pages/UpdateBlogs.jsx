import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, Formik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { actionGroupProductGets } from "../modules/group-product/action.js";
import {
  actionProductCreate,
  actionProductUpdate,
} from "../modules/product/action.js";
import { useLocation } from "react-router-dom";
import uploadPlugin from "../utils/uploadAdapter.js";
import { actionBlogsUpdate } from "../modules/blog/action.js";

const { Option } = Select;

const UpdateBlog = () => {
  const { state } = useLocation();
  //initial
  const { groupBlogs } = useSelector((state) => state.groupBlogReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      ...state.data,
    },
  });
  console.log(state)
  //handler
  function onSubmit() {
    const data = new FormData();
    Object.entries(formik.values).map((item) => {
     
        data.append(item[0], item[1]);
     
    });
    dispatch(actionBlogsUpdate({ id: state.data.id, data }));
  }

  useEffect(() => {
    dispatch(actionGroupProductGets());
  }, []);

  console.log(state.data);
  return (
    <div className="w-1/2 bg-slate-50 p-8 m-auto rounded">
      <p className="font-semibold text-xl text-neutral-500 mb-4 ">
        Thay đổi bài viết
      </p>
      <Form layout="vertical" name="nest-messages">
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Tên sản phẩm">
              <Input
                name="title"
                value={formik.values?.title}
                onChange={formik.handleChange}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Loại sản phẩm">
              <Select
                value={formik.values.idGroupBlog}
                style={{ width: "100%" }}
                name="idGroupProduct"
                onChange={(e) => {
                  formik.setFieldValue("idGroupBlog", e);
                }}
              >
                <Option value="">Vui lòng chọn</Option>
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
                value={formik.values.description}
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
                data={formik.values.detail}
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
              className="w-full "
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

export default UpdateBlog;
