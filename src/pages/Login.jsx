import React, { useState } from "react";
import {useDispatch} from "react-redux"
import { actionAdminLogin } from "../modules/admin/action.js";
const Login = () => {
    const dispatch=useDispatch()
   const [state, setState] = useState();


  return (
    <div className="flex justify-center items-center h-screen ">
      <form className=" " style={{ width: 370 }}>
        <div>
          <p className="text-4xl text-stone-600 font-semibold mb-6 border-l-4 border-l-green-500 pl-3">
            ĐĂNG NHẬP
          </p>
        </div>
        <div className="flex flex-col mb-6">
          <div className="">
            <label
              className="block text-lg mb-3 text-gray-500 font-bold pr-4"
              for="inline-full-name"
            >
              Tên tài khoản
            </label>
          </div>
          <div className="">
            <input
              className="bg-gray-200 text-lg appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
              className="block text-lg text-gray-500 font-bold mb-3 pr-4"
              for="inline-password"
            >
              Mật khẩu
            </label>
          </div>
          <div className="">
            <input
              className="text-lg bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
          <label className=" block text-gray-500 font-bold">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-lg">Ghi nhớ</span>
          </label>
        </div>
        <div className="flex">
          <div className="w-full">
            <button
              className="shadow text-lg w-full bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => {
                dispatch(actionAdminLogin(state))
               
              }}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
