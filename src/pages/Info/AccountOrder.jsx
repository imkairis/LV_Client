import React, { useState } from "react";
import { OrderData } from "../../common/json/OrderData";
import { Link } from "react-router-dom";

function AccountOrder() {
  const [ordersData, setOrderData] = useState(OrderData);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="text-lg font-bold">ĐƠN HÀNG CỦA BẠN</div>
      {ordersData && ordersData.length < 1 ? (
        <div className="bg-[#FFFCFF] p-4 text-center">
          <div className="text-sm mb-4">BẠN CHƯA CÓ ĐƠN HÀNG NÀO !</div>
          <div className="w-40 mx-auto mb-4">
            <img
              src={
                process.env.PUBLIC_URL + "/images/account/flowerpot_7302490.png"
              }
              alt="flowerpot"
            />
          </div>
          <div className="text-sm">Tạo đơn hàng mới ngay nào !</div>
        </div>
      ) : (
        <div className="space-y-4 p-4">
          {ordersData.map((item, id) => (
            <div className="p-4 border border-gray-300 rounded-lg" key={id}>
              <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                <div className="flex-1">#{item.id}</div>
                <div className="flex-1">{item.orderDate}</div>
              </div>
              <hr className="border-t my-4" />
              {isOpen ? (
                <div className="space-y-4">
                  {item.products.map((data, idx) => (
                    <div className="flex justify-between" key={idx}>
                      <div>{data.ProductName}</div>
                      <div>SL : {data.Quantity}</div>
                      <div>
                        <u>{data.ProductPrice}</u>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center">
                  {item.products.map((data, idx) => (
                    <span key={idx}>
                      {data.ProductName}
                      {idx === item.products.length - 1 ? "..." : ","}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-between mt-4 mb-2">
                <div>
                  <b>Phí giao hàng</b>
                </div>
                <div>
                  <u>{item.total} VND</u>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div>
                  <b>Tổng đơn hàng</b>
                </div>
                <div>
                  <u>{item.total} VND</u>
                </div>
              </div>

              <hr className="border-t my-4" />
              <div className="flex justify-between mb-4">
                <div>
                  <b>Tình trạng đơn hàng</b>
                </div>
                <div>
                  <b>{item.orderDate}</b>
                </div>
                <div>
                  {item.status === 1
                    ? "Đã xác nhận"
                    : item.status === 2
                    ? "Đang giao hàng"
                    : item.status === 3
                    ? "Đã nhận hàng"
                    : item.status === 4
                    ? "Đã huỷ đơn hàng"
                    : "Chưa được xác nhận"}
                </div>
              </div>

              <Link
                onClick={toggleCollapsible}
                className="text-blue-500 hover:text-blue-700"
              >
                {isOpen ? "Thu gọn" : "Xem chi tiết"}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AccountOrder;
