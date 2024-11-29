import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AccountOrder() {
  const [ordersData, setOrdersData] = useState([]); // Dữ liệu đơn hàng
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(""); // Lỗi (nếu có)

  // Lấy danh sách đơn hàng từ API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/orders/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Gửi token xác thực
        },
      });

      const data = await response.json();
      if (response.ok) {
        setOrdersData(data.data || []); // Lưu dữ liệu đơn hàng
      } else {
        setError(data.message || "Không thể tải đơn hàng. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải đơn hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Hiển thị khi đang tải dữ liệu
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">ĐƠN HÀNG CỦA BẠN</h1>
      {/* Kiểm tra nếu không có đơn hàng */}
      {ordersData.length === 0 ? (
        <div className="bg-[#FFFCFF] p-4 text-center">
          <p className="text-sm mb-4">BẠN CHƯA CÓ ĐƠN HÀNG NÀO!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ordersData.map((order) => (
            <div
              key={order._id}
              className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium">Mã đơn: #{order._id}</p>
                <p className="text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              {/* Hiển thị trạng thái giao hàng */}
              <div className="mb-4">
                <span className="font-medium">Trạng thái giao hàng:</span>{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    order.deliveryStatus === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : order.deliveryStatus === "shipping"
                      ? "bg-blue-100 text-blue-600"
                      : order.deliveryStatus === "delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.deliveryStatus === "pending"
                    ? "Đang chờ xử lý"
                    : order.deliveryStatus === "shipping"
                    ? "Đang giao"
                    : order.deliveryStatus === "delivered"
                    ? "Đã giao"
                    : "Giao hàng thất bại"}
                </span>
              </div>
              <div className="text-right">
                <Link
                  to={`/order-detail/${order._id}`}
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Hiển thị lỗi nếu có */}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}

export default AccountOrder;
