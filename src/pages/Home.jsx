import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { BlockOutlined } from "@ant-design/icons";
import DemoColumn from "../components/CharColumn.jsx";
import { config, useSpring, animated } from "react-spring";
import AnimateNumber from "../components/AnimateNumber.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  actionOrderCounterData,
  actionOrderCounterMonth,
  actionOrderTotalCounter,
  actionOrderTotalData,
  actionOrderTotalTurnOver,
  actionOrderTurnOverMonth,
} from "../modules/order/action.js";

const Home = () => {
  const dispatch = useDispatch();
  const {
    turnOver,
    turnOverMonth,
    counterMonth,
    counterTotal,
    totalData,
    counterData,
  } = useSelector((state) => state.orderReducer);
  useEffect(() => {
    dispatch(actionOrderTotalTurnOver());
    dispatch(actionOrderTurnOverMonth());
    dispatch(actionOrderTotalCounter());
    dispatch(actionOrderCounterMonth());
    dispatch(actionOrderTotalData());
    dispatch(actionOrderCounterData());
  }, []);

  return (
    <div className="w-full ">
      <div className="grid  grid-cols-4  gap-4 w-full mb-8">
        <div className="bg-white p-5 rounded-sm flex flex-col text-center">
          <img
            width={100}
            alt="money"
            className="m-auto"
            src="https://img.icons8.com/bubbles/100/000000/money.png"
          />
          <p className=" text-slate-600 text-base">Tổng doanh thu</p>
          <p className="font-semibold text-2xl  text-slate-600">
            <AnimateNumber number={Number(turnOver)} />
          </p>
        </div>
        <div className="bg-white p-5 rounded-sm flex flex-col text-center">
          <img
            width={100}
            alt="money"
            className="m-auto"
            src="https://img.icons8.com/clouds/100/000000/money.png"
          />
          <p className=" text-slate-600 text-base">Tổng đơn hàng</p>
          <p className="font-semibold text-2xl  text-slate-600">
            <AnimateNumber number={Number(counterTotal)} />
          </p>
        </div>
        <div className="bg-white p-5 rounded-sm flex flex-col text-center">
          <img
            width={100}
            alt="money"
            className="m-auto"
            src="https://img.icons8.com/clouds/100/000000/money-bag.png"
          />
          <p className=" text-slate-600 text-base">Doanh thu trong tháng</p>
          <p className="font-semibold text-2xl  text-slate-600">
            <AnimateNumber number={Number(turnOverMonth)} />
          </p>
        </div>
        <div className="bg-white p-5 rounded-sm flex flex-col text-center">
          <img
            width={100}
            alt="money"
            className="m-auto"
            src="https://img.icons8.com/bubbles/100/000000/money-bag.png"
          />
          <p className=" text-slate-600 text-base"> Đơn hàng trong tháng</p>
          <p className="font-semibold text-2xl  text-slate-600">
            <AnimateNumber number={Number(counterMonth)} />
          </p>
        </div>
      </div>
      <Row gutter={24}>
        <Col span={12}>
          <div className="bg-white rounded p-8">
            <DemoColumn data={totalData} />
          </div>
        </Col>
        <Col span={12}>
          <div className="bg-white rounded p-8">
            <DemoColumn data={counterData} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
