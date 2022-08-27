import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const Loading = () => {
      const { login } = useSelector((state) => state.adminReducer);
      
    return (
      <div className={login?"hidden":""}>
        <div className="z-10 ant-menu-dark fixed h-screen w-screen flex justify-center items-center mb-10">
          <div className="mb-16">
            <img
              className=" m-auto mt-4"
              src={require("../assets/image/logo.PNG")}
              alt=""
              width={270}
            />
          </div>
        </div>
      </div>
    );
}

export default Loading;
