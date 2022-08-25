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
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { actionGroupProductGets } from "../modules/group-product/action.js";
import { actionProductCreate } from "../modules/product/action.js";
import uploadPlugin from "../utils/uploadAdapter.js";
import validate from "../configs/validate.js";

const { Option } = Select;

const CreateProduct = () => {
  //initial

  const { groupProducts } = useSelector((state) => state.groupProductReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {},
  });

  const onFinish = () => {
    const data = new FormData();
    Object.entries(formik.values).map((item) => {
      if (item[0] == "images") {
        Object.entries(item[1]).forEach((val) => {
          data.append(item[0], val[1]);
        });
      } else {
        data.append(item[0], item[1]);
      }
    });
    dispatch(actionProductCreate(data));
  };

  useEffect(() => {
    dispatch(actionGroupProductGets());
  }, []);

  return (
    <div className="w-1/2 m-auto bg-slate-50 p-8">
      <p className="font-semibold text-xl text-neutral-500 mb-4 ">
        Tạo mới sản phẩm
      </p>
      <Form
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
     
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Tên sản phẩm"
              name="title"
              rules={[validate.required, validate.title]}
            >
              <Input name="title" onChange={formik.handleChange} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Loại sản phẩm"
              name="idGroupProduct"
              rules={[validate.required]}
            >
              <Select
                placeholder="Vui lòng nhập"
                style={{ width: "100%" }}
                name="idGroupProduct"
                onChange={(e) => {
                  formik.setFieldValue("idGroupProduct", e);
                }}
              >
                {groupProducts.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giá bán"
              name="price"
              rules={[validate.required, validate.price]}
            >
              <Input name="price" onChange={formik.handleChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Đơn vị" name="unit" rules={[validate.required]}>
              <Select
                style={{ width: "100%" }}
                name="unit"
                onChange={(e) => {
                  formik.setFieldValue("unit", e);
                }}
                placeholder="Vui lòng chọn"
              >
                <Option value="kilogam">Kilogam</Option>
                <Option value="hop">Hộp</Option>
                <Option value="cai">Cái</Option>
                <Option value="con">Con</Option>
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
          <Col span={12}>
            <Form.Item
              label="Album ảnh"
              name="images"
              rules={[validate.required]}
            >
              <input
                id="file_input"
                type="file"
                name="images"
                multiple
                onChange={(e) => {
                  formik.setFieldValue("images", e.target.files);
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
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              
            >
              Xác nhận
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateProduct;
