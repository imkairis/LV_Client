import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AccountOrder() {
  const [ordersData, setOrdersData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  const getAll = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/orders/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        setOrdersData(data.data); // Set the orders data from the API
      } else {
        setError("Không thể tải đơn hàng. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error(err);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

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
          {ordersData.map((item, id) => {
            const address = JSON.parse(item.address);
            return (
              <div className="p-4 border border-gray-300 rounded-lg" key={id}>
                <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                  <div className="flex-1">#{item._id}</div>
                  <div className="flex-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <hr className="border-t my-4" />
                {isOpen ? (
                  <div className="space-y-4">
                    {item.items.map((data, idx) => (
                      <div className="flex justify-between" key={idx}>
                        <div>{data.product}</div>
                        <div>SL : {data.quantity}</div>
                        <div>
                          <u>{data.totalPrice} VND</u>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    {item.items.map((data, idx) => (
                      <span key={idx}>
                        {data.product}
                        {idx === item.items.length - 1 ? "..." : ","}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between mt-4 mb-2">
                  <div>
                    <b>Phí giao hàng</b>
                  </div>
                  <div>
                    <u>{item.priceShipping} VND</u>
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <div>
                    <b>Tổng đơn hàng</b>
                  </div>
                  <div>
                    <u>{item.totalPrice} VND</u>
                  </div>
                </div>

                <hr className="border-t my-4" />
                <div className="flex justify-between mb-4">
                  <div>
                    <b>Tình trạng đơn hàng</b>
                  </div>
                  <div>
                    <b>{new Date(item.createdAt).toLocaleDateString()}</b>
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
            );
          })}
        </div>
      )}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </>
  );
}

export default AccountOrder;
