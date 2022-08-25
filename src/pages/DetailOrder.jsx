import { Button } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

const DetailOrder = (props) => {
  const { state } = useLocation();

  return (
    <div className="overflow-x-auto relative w-1/3 m-auto shadow-md bg-slate-50 p-8">
      <p className="text-base text-gray-500  mb-4">Thông tin khách hàng</p>
      <table className="w-full text-sm text-left text-gray-500 ">
        <tbody>
          <tr className="bg-white border-b  ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              Mã đơn hàng
            </th>
            <td className="py-4 px-6">{state.code}</td>
          </tr>
          <tr className="bg-white border-b  ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              Tên khách hàng
            </th>
            <td className="py-4 px-6">{state.UserOrder.fullname}</td>
          </tr>

          <tr className="bg-white border-b  ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              Số điện thoại
            </th>
            <td className="py-4 px-6">{state.phone}</td>
          </tr>

          <tr className="bg-white border-b  ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              Địa chỉ
            </th>
            <td className="py-4 px-6"> {state.address}</td>
          </tr>
        </tbody>
      </table>
      <p className="text-base text-gray-500  my-6">Chi tiết đơn hàng</p>
      <table className="w-full text-sm mt-4 text-left text-gray-500 ">
        <tbody>
          {state.OrderOrderItem.map((item, index) => {
            return (
              <tr className="bg-white border-b  ">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                >
                  {item.OrderItemProduct.title}
                </th>
                <td className="py-4 px-6"> {item.OrderItemProduct.unit}</td>
                <td className="py-4 px-6">
                  {item.quantity}x
                  {Number(item.OrderItemProduct.price).toLocaleString("vi-VN")}
                </td>
                <td className="py-4 px-6">
                  {item.total.toLocaleString("vi-VN")} đ
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-base text-gray-500  my-6">Tổng hóa đơn</p>
      <table className="w-full text-sm  text-left text-gray-500 ">
        <tbody>
          <tr className="bg-white border-b  ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              Tổng đơn
            </th>
            <td className="py-4 px-6">
              {state.subtotal.toLocaleString("vi-VN")} đ
            </td>
          </tr>
          <tr className="bg-white border-b  ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              Phí vận chuyển
            </th>
            <td className="py-4 px-6">
              {state.shipping.toLocaleString("vi-VN")} đ
            </td>
          </tr>

          <tr className="bg-white border-b  ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              Khuyến mãi
            </th>
            <td className="py-4 px-6">
              - {state.discount.toLocaleString("vi-VN")} đ
            </td>
          </tr>
          <tr className="bg-white border-b  ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              Tổng thanh toán
            </th>
            <td className="py-4 px-6">
              {state.grandtotal.toLocaleString("vi-VN")} đ
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex mt-8 gap-4 ">
        <div className="flex-1">
          <Button className="w-full" type="primary" onClick={() => {}}>
            Xác nhận
          </Button>
        </div>

        <div className="flex-1">
          <Button className="w-full " type="primary">
            In hóa đơn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
