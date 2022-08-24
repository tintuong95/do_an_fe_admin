import { Avatar, Badge, Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "@emotion/css";
import { UserOutlined } from "@ant-design/icons";
import io from "socket.io-client";
const socket = io("http://localhost:4000");
const ROOT_CSS = css({
  height: 680,
  
});
const Chat = () => {
  const [listRoom, setListRoom] = useState();
  const [Room, setRoom] = useState();
  const [listMessage, setListMessage] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connection");
    socket.emit("listRoom", { limit: 100, offset: 0 });
    socket.on("sendRoom", (data) => {
      setListRoom(data.data);
    });
    socket.emit("listMessage", { idRoom: Room?.id });
    socket.on("sendMessage", (data) => {
      setListMessage(data.data);
    });
    return () => {
      socket.off("connection");
    };
  }, [Room?.id]);
  console.log(listMessage);
  return (
    <div className=" w-2/3">
      <Row>
        <Col className="bg-gray-50 p-4 " span={6}>
          <p className="font-semibold text-xl text-center m-3">Trò chuyện</p>
          <div
            className="overflow-y-scroll hidden-bar-scroll"
            style={{ height: 680 }}
          >
            {listRoom
              ?.sort((a, b) => {
                return Number(b.counter) - Number(a.counter);
              })
              .map((item, index) => (
                <Button
                  onClick={() => {
                    setRoom(item);
                  }}
                  className="w-full h-14 border-0 bg-gray-100 mb-2"
                >
                  <div className="flex">
                    <Badge count={item.counter}>
                      <Avatar shape="square" size="small" />
                    </Badge>
                    <p className="ml-4">{item.fullname}</p>
                  </div>
                </Button>
              ))}
          </div>
        </Col>
        <Col className="bg-white flex flex-col  p-2" span={18}>
          <div className="bg-blue-50 p-4 m-1 flex-none ">
            <Row justify="space-between">
              <Col>
                <p type="link" className="text-xl">
                    {Room?.fullname} - {Room?.phone}
                </p>
              </Col>

              <Col>
                <Button type="link" onClick={() => {
                     socket.emit("removeRoom", {
                       idRoom: Room?.id,
                     });
                }}>
                  Xóa trò chuyện
                </Button>
               
              </Col>
            </Row>
          </div>
          <ScrollToBottom className={ROOT_CSS}>
            {listMessage?.map((item, index) => {
              if (item.status == 1) {
                return (
                  <div className="flex justify-end m-4">
                    <div
                      className="bg-blue-300 mx-2 shadow-lg inline-block p-3 px-6 text-white text-base rounded-lg "
                      style={{ maxWidth: 700 }}
                    >
                      {item.content}
                    </div>
                    <Avatar
                      style={{ backgroundColor: "#93c5fd" }}
                      icon={<UserOutlined />}
                    />
                  </div>
                );
              } else {
                return (
                  <div className="flex justify-start m-4">
                    <Avatar
                  
                      icon={<UserOutlined />}
                    />
                    <div className="bg-gray-100 mx-2 shadow-lg inline-block p-3 px-6  text-base rounded-lg">
                      {item.content}
                    </div>
                  </div>
                );
              }
            })}
          </ScrollToBottom>

          <div className=" flex flex-none  gap-4 w-full p-4 bg-blue-100  ">
            <Input.TextArea
              rows={3}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></Input.TextArea>
            <Button
              type="primary"
              className="h-auto"
              onClick={() => {
                socket.emit("sendMessage", {
                  idRoom: Room?.id,
                  content: message,
                  status: 0,
                });
              }}
            >
              Gửi tin nhắn
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
