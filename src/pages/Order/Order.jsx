import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderDetailClient() {
  const { id } = useParams(); // Lấy ID đơn hàng từ URL
  const [order, setOrder] = useState(); // Dữ liệu đơn hàng
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(""); // Lỗi (nếu có)

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST}/orders/order-detail/${id}`, // URL API với ID đơn hàng
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Gửi token xác thực
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setOrder(data.data);
      } else {
        setError(data.message || "Không thể tải chi tiết đơn hàng.");
      }
    } catch (err) {
      console.log(err);
      setError("Đã xảy ra lỗi khi tải chi tiết đơn hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const formatPrice = (price) =>
    price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!order) {
    return <div>Không tìm thấy đơn hàng.</div>;
  }

  const address = JSON.parse(order?.address);

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-navy-700 p-6 mb-8 rounded-lg shadow-sm">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-blue-600">
            Thông tin đơn hàng
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {/* Thông tin đơn hàng */}
          <div className="space-y-4">
            <p>
              <span className="font-medium">Mã đơn hàng:</span> {order?._id}
            </p>
            <p>
              <span className="font-medium">Tên khách hàng:</span>{" "}
              {order?.user?.fullname}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order?.user?.email}
            </p>
          </div>

          {/* Thông tin giao hàng */}
          <div className="space-y-4">
            <p>
              <span className="font-medium">Tên người nhận:</span>{" "}
              {address?.name}
            </p>
            <p>
              <span className="font-medium">Số điện thoại:</span>{" "}
              {address?.phone}
            </p>
            <p>
              <span className="font-medium">Địa chỉ:</span> {address?.address}
            </p>
          </div>

          {/* Thời gian, tổng tiền, trạng thái */}
          <div className="space-y-4">
            <p>
              <span className="font-medium">Thời gian đặt hàng:</span>{" "}
              {new Date(order?.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Tổng tiền:</span>{" "}
              {formatPrice(order?.totalPrice)}
            </p>
            <p>
              <span className="font-medium">Trạng thái:</span>{" "}
              {order?.deliveryStatus}
            </p>
            <p>
              <span className="font-medium">Phương thức thanh toán:</span>{" "}
              {order?.payment}
            </p>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-white dark:bg-navy-700 p-6 mb-8 rounded-lg shadow-sm">
        <div className="space-y-4 text-center">
          <h3 className="mb-6 text-2xl font-semibold">Sản phẩm</h3>
        </div>

        <div>
          {order?.items?.map((product, index) => (
            <div key={index} className="flex gap-4 items-center pt-4 border-t">
              <img
                src={`${import.meta.env.VITE_HOST}/${
                  product?.product?.images[0]
                }`}
                alt={product?.product?.name}
                className="w-20 h-20 object-cover"
              />
              <div className="flex-grow">
                <p className="text-left">
                  <span className="font-medium">Tên sản phẩm:</span>{" "}
                  {product?.product?.name}
                </p>
                <p className="text-left">
                  <span className="font-medium">Số lượng:</span>{" "}
                  {product?.quantity}
                </p>
                <p className="text-left">
                  <span className="font-medium">Giá:</span>{" "}
                  {formatPrice(product?.product?.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailClient;
