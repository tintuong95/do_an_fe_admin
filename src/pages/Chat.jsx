import { Avatar, Badge, Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "@emotion/css";
import { UserOutlined } from "@ant-design/icons";
import io from "socket.io-client";
const socket = io(process.env.REACT_APP_HOST_CHAT);
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
    if (Room?.id) {
      socket.emit("listMessageAdmin", { roomID: Room.id });
      socket.on("sendMessage", (data) => {
        setListMessage(data.data);
      });
    }
    return () => {
      socket.off("connection");
    };
  }, [Room?.id]);

  return (
    <div className=" w-2/3 m-auto  shadow-lg">
      <Row>
        <Col className="bg-gray-50 p-4 " span={6}>
       
          <div
            className="overflow-y-scroll hidden-bar-scroll"
            style={{ height: 680 }}
          >
            {listRoom
              ?.sort((a, b) => {
                return Number(b.count) - Number(a.count);
              })
              .map((item, index) => (
                <Button
                  onClick={() => {
                    setRoom(item);
                   
                  }}
                  className="w-full h-14 border-0 bg-gray-100 mb-2"
                >
                  <div className="flex">
                    <Badge count={item.count}>
                      <Avatar shape="square" size="small" />
                    </Badge>
                    <p className="ml-4">{item.name}</p>
                  </div>
                </Button>
              ))}
          </div>
        </Col>
        <Col className="bg-white flex flex-col  p-2" span={18}>
          <div className="bg-gray-50 p-4 m-1 flex-none ">
            <Row justify="space-between">
              <Col>
                <p type="link" className="text-lg">
                  {Room?.fullname} - {Room?.phone}
                </p>
              </Col>

              <Col>
                <Button
                  type="link"
                  onClick={() => {
                    socket.emit("clearMessage", {
                      roomID: Room?.id,
                    });
                  }}
                  danger
                >
                  Xóa trò chuyện
                </Button>
              </Col>
            </Row>
          </div>
          <ScrollToBottom className={ROOT_CSS}>
            {listMessage?.map((item, index) => {
              if (item.status) {
                return (
                  <div className="flex justify-end m-4">
                    <div
                      className=" mx-2 shadow-lg inline-block p-3 px-6 text-white text-base rounded-lg "
                      style={{ maxWidth: 700, backgroundColor: "#272727" }}
                    >
                      {item.message}
                    </div>
                    <Avatar
                      style={{ backgroundColor: "#272727" }}
                      icon={<UserOutlined />}
                    />
                  </div>
                );
              } else {
                return (
                  <div className="flex justify-start m-4">
                    <Avatar icon={<UserOutlined />} />
                    <div className="bg-gray-100 mx-2 shadow-lg inline-block p-3 px-6  text-base rounded-lg">
                      {item.message}
                    </div>
                  </div>
                );
              }
            })}
          </ScrollToBottom>

          <div className=" flex flex-none  gap-4 w-full p-4 bg-gray-100  ">
            <Input.TextArea
              rows={3}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></Input.TextArea>
            <Button
              className="h-auto rounded-md"
              style={{ backgroundColor: "white" }}
              onClick={() => {
                socket.emit("sendMessage", {
                  roomID: Room?.id,
                  message,
                  status: false,
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
