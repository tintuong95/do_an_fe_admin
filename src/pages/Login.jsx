import React, { useState } from "react";
import { useDispatch } from "react-redux";



import { actionAdminLogin } from "../modules/admin/action.js";




const Login = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState();

  return (
    <div className="flex justify-center items-center h-screen bg-login ">
      <div className="flex bg-white border rounded " style={{ width: 670 }}>
        <div className="w-1/2">
          <form className=" bg-white p-8 py-14 rounded-lg shadow-xl  ">
            <div>
              <p className="text-2xl  font-semibold mb-6 ">Đăng Nhập</p>
            </div>
            <div className="flex flex-col mb-6">
              <div className="">
                <label
                  className="block  text-base mb-3 text-gray-600  pr-4"
                  for="inline-full-name"
                >
                  Tên tài khoản
                </label>
              </div>
              <div className="">
                <input
                  className="  text-base border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="Vui lòng nhập"
                  onChange={(e) => {
                    setState({ ...state, username: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="">
                <label
                  className="block text-base text-gray-600  mb-3 pr-4"
                  for="inline-password"
                >
                  Mật khẩu
                </label>
              </div>
              <div className="">
                <input
                  className=" text-base appearance-none border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="password"
                  placeholder="******************"
                  onChange={(e) => {
                    setState({ ...state, password: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="flex  mb-6">
              <label className=" block text-gray-500 ">
                <input className="mr-2 leading-tight" type="checkbox" />
                <span className=" text-base text-gray-600">Ghi nhớ</span>
              </label>
            </div>
            <div className="flex">
              <div className="w-full">
                <button
                  className="shadow text-base  w-full   focus:shadow-outline focus:outline-none text-white  py-2 px-4 rounded"
                  type="button"
                  onClick={() => {
                    dispatch(actionAdminLogin(state));
                  }}
                  style={{ backgroundColor: "#326c05" }}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/2 bg-login-right"></div>
      </div>
    </div>
  );
};

export default Login;
