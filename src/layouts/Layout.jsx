import {
  HomeOutlined,
  MergeCellsOutlined,
  FundViewOutlined,
  MessageOutlined,
  ProfileOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Badge, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import history from "../utils/history.js";
import { actionAdminLogout, actionAdminProfile } from "../modules/admin/action.js";
import io from "socket.io-client";
const socket = io(process.env.REACT_APP_HOST_CHAT);
const { Content, Sider } = Layout;

const DashBoard = ({ Component, ...children }) => {
  const [listRoom, setListRoom] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const { login } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  if (!login) {
    dispatch(actionAdminProfile());
  }

  useEffect(() => {
    socket.on("connection");
    socket.emit("roomList", { limit: 100, offset: 0 });
    socket.on("roomList", ({ data }) => {
      setListRoom(data);
    });
  }, []);





  return (
    <>
      <Layout
        className="z-0"
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          width={250}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <img style={{ cursor: "pointer" }} onClick={() => { history.push("/") }} className="p-6" src={require("../assets/image/logo.PNG")} alt="logo" />
          <hr className="w-4/5 m-auto border-1  mb-4"></hr>
          <Menu theme="dark" mode="inline">
            <Menu.Item
              icon={<HomeOutlined />}
              onClick={() => {
                history.push("/home");
              }}
            >
              Trang chủ
            </Menu.Item>
            <Menu.Item
              icon={<FundViewOutlined />}
              onClick={() => {
                history.push("/product");
              }}
            >
              Sản phẩm
            </Menu.Item>
            <Menu.Item
              icon={<ProfileOutlined />}
              onClick={() => {
                history.push("/blogs");
              }}
            >
              Bài viết
            </Menu.Item>
            <Menu.Item
              icon={<MergeCellsOutlined />}
              onClick={() => {
                history.push("/orders");
              }}
            >
              Đơn hàng
            </Menu.Item>
            <Menu.Item
              icon={<UserOutlined />}
              onClick={() => {
                history.push("/user");
              }}
            >
              Người dùng
            </Menu.Item>
            <Menu.Item
              icon={<MessageOutlined />}
              onClick={() => {
                history.push("/chat");
              }}
            >
              Tin nhắn
              <Badge
                className="site-badge-count-109 ml-3 text-white"
                count={listRoom?.length || 0}
                style={{ backgroundColor: '#ff6666' }}
              />
            </Menu.Item>
            <Menu.Item
              icon={<LogoutOutlined />}
              onClick={() => {
                // history.push("/chat");
                dispatch(actionAdminLogout())
              }}
            >
              Đăng xuất
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Route
                {...children}
                render={(...propsRoute) => {
                  return <Component {...propsRoute} />;
                }}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashBoard;
