import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import uploadPlugin from "../utils/uploadAdapter.js";
import { actionBlogsPost } from "../modules/blog/action.js";
import { actionGroupBlogGets } from "../modules/group-blog/action.js";
import validate from "../configs/validate.js";

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
    
  }
  const onFinishFailed = () => {
    console.log("fail");
  };
  const onFinish = () => {
   const data = new FormData();
   Object.entries(formik.values).map((item) => {
     data.append(item[0], item[1]);
   });
   dispatch(actionBlogsPost(data));
  };

  useEffect(() => {
    dispatch(actionGroupBlogGets());
  }, []);

  return (
    <div className="w-1/2 m-auto bg-slate-50 p-8">
      <p className="font-semibold text-lg text-neutral-500 mb-4 ">
        Tạo mới tin tức
      </p>
      <Form
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Tên bài viết"
              name="title"
              rules={[validate.required, validate.title]}
            >
              <Input name="title" onChange={formik.handleChange} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Loại bài viết"
              name="idGroupBlog"
              rules={[validate.required]}
            >
              <Select
                placeholder="Vui lòng chọn"
                style={{ width: "100%" }}
                name="idGroupBlog"
                onChange={(e) => {
                  formik.setFieldValue("idGroupBlog", e);
                }}
              >
                {groupBlogs.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Ảnh đạ diện"
              name="image"
              rules={[validate.required]}
            >
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
            <Form.Item
              label="Mô tả ngắn gọn"
              name="description"
              rules={[validate.required, validate.description]}
            >
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
            <Button className="w-full" type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateBlogs;
