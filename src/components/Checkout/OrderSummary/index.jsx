const OrderSummary = ({ totalAmt, shippingCharge, onSubmit }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="flex justify-between mt-4 border-t pt-2">
        <span>Tổng giá sản phẩm</span>
        <span>{totalAmt.toLocaleString("vi-VN")} VND</span>
      </div>
      <div className="flex justify-between">
        <span>Phí vận chuyển</span>
        <span>{shippingCharge.toLocaleString("vi-VN")} VND</span>
      </div>
      <div className="flex justify-between font-bold mt-2">
        <span>Tổng đơn hàng</span>
        <span>{(totalAmt + shippingCharge).toLocaleString("vi-VN")} VND</span>
      </div>
      <button
        className="w-full mt-4 py-2 bg-blue-500 text-white font-bold rounded-md"
        onClick={onSubmit}
      >
        Xác nhận thanh toán
      </button>
    </div>
  );
};

export default OrderSummary;
