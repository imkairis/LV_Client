// CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddressSelection from "../../components/Checkout/AddressSelection";
import DeliveryMethodSelection from "../../components/Checkout/DeliveryMethodSelection";
import PaymentMethodSelection from "../../components/Checkout/PaymentMethodSelection";
import OrderSummary from "../../components/Checkout/OrderSummary";

function CheckoutPage() {
  // Lấy dữ liệu từ giỏ hàng nếu bạn lưu trong Redux
  const products = useSelector((state) => state.orebiReducer.products);

  // Biến lưu tổng số tiền và phí vận chuyển
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  // Tính toán lại `totalAmt` và `shippingCharge` mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);

    if (price <= 200) {
      setShippingCharge(30);
    } else if (price <= 400) {
      setShippingCharge(25);
    } else {
      setShippingCharge(30000);
    }
  }, [products]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Truyền thông tin giỏ hàng vào OrderSummary */}
        <OrderSummary
          products={products}
          totalAmt={totalAmt}
          shippingCharge={shippingCharge}
        />
        <AddressSelection />
        <DeliveryMethodSelection />
        <PaymentMethodSelection />
      </div>
    </div>
  );
}

export default CheckoutPage;
