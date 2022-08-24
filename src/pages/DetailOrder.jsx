import { Button } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';


const DetailOrder = (props) => {
    const {state}=useLocation()
    

    return (
      <div className="overflow-x-auto relative w-1/2 m-auto bg-slate-50 p-8">
        <p className="text-lg font-semibold text-gray-500  mb-4">
          Thông tin khách hàng
        </p>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Mã đơn hàng
              </th>
              <td className="py-4 px-6">{state.code}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Tên khách hàng
              </th>
              <td className="py-4 px-6">{state.UserOrder.fullname}</td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Số điện thoại
              </th>
              <td className="py-4 px-6">{state.phone}</td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Địa chỉ
              </th>
              <td className="py-4 px-6"> {state.address}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-lg font-semibold text-gray-500  my-6">
          Chi tiết đơn hàng
        </p>
        <table className="w-full text-sm mt-4 text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {state.OrderOrderItem.map((item, index) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.OrderItemProduct.title}
                  </th>
                  <td className="py-4 px-6"> {item.OrderItemProduct.unit}</td>
                  <td className="py-4 px-6">
                    {item.quantity}x{item.OrderItemProduct.price}
                  </td>
                  <td className="py-4 px-6">{item.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="text-lg font-semibold text-gray-500  my-6">
          Tổng hóa đơn
        </p>
        <table className="w-full text-sm  text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Tổng đơn
              </th>
              <td className="py-4 px-6">{state.subtotal}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Phí vận chuyển
              </th>
              <td className="py-4 px-6">{state.shipping}</td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Khuyến mãi
              </th>
              <td className="py-4 px-6">- {state.discount}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Tổng thanh toán
              </th>
              <td className="py-4 px-6"> {state.grandtotal}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex mt-4 gap-4 ">
          <div className="flex-1">
            <Button className="w-full" type="primary">
              Xác nhận
            </Button>
          </div>

          <div className="flex-1">
            <Button className="w-full " type="dashed" danger>In hóa đơn</Button>
          </div>
        </div>
      </div>
    );
};





export default DetailOrder;
