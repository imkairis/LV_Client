import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderDetailClient() {
  const { id } = useParams(); // Lấy ID đơn hàng từ URL
  const [order, setOrder] = useState(null); // Dữ liệu đơn hàng
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(""); // Lỗi (nếu có)

  // Hàm lấy chi tiết đơn hàng từ API
  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST}/orders/${id}`, // URL API với ID đơn hàng
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Gửi token xác thực
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setOrder(data.data); // Lưu chi tiết đơn hàng
      } else {
        setError(data.message || "Không thể tải chi tiết đơn hàng.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải chi tiết đơn hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!order) {
    return <div>Không tìm thấy đơn hàng.</div>;
  }

  const address = JSON.parse(order.address);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h1>
      <div className="border border-gray-300 p-4 rounded-lg">
        <div className="mb-4">
          <strong>Mã đơn hàng:</strong> #{order._id}
        </div>
        <div className="mb-4">
          <strong>Ngày tạo:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </div>
        <div className="mb-4">
          <strong>Địa chỉ giao hàng:</strong>{" "}
          {`${address.street}, ${address.city}, ${address.state}`}
        </div>
        <div className="mb-4">
          <strong>Trạng thái đơn hàng:</strong>{" "}
          {order.status === 1
            ? "Đã xác nhận"
            : order.status === 2
            ? "Đang giao hàng"
            : order.status === 3
            ? "Đã nhận hàng"
            : order.status === 4
            ? "Đã hủy"
            : "Chưa xác nhận"}
        </div>
        <div className="mb-4">
          <strong>Phí giao hàng:</strong> {order.priceShipping} VND
        </div>
        <div className="mb-4">
          <strong>Tổng tiền:</strong> {order.totalPrice} VND
        </div>
      </div>

      <h2 className="text-lg font-bold mt-6 mb-4">Danh sách sản phẩm</h2>
      <div className="space-y-4">
        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 border border-gray-300 rounded-lg flex justify-between"
          >
            <div>
              <strong>{item.product}</strong>
            </div>
            <div>SL: {item.quantity}</div>
            <div>{item.totalPrice} VND</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetailClient;
