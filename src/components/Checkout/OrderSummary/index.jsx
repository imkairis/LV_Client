// OrderSummary.jsx
import React from "react";

const OrderSummary = ({ products, totalAmt, shippingCharge }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div>
        {products.map((item) => (
          <div key={item._id} className="flex justify-between mb-2">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>
              {(item.price * item.quantity).toLocaleString("vi-VN")} VND
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 border-t pt-2">
        <span>Subtotal</span>
        <span>{totalAmt.toLocaleString("vi-VN")} VND</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping Charge</span>
        <span>{shippingCharge.toLocaleString("vi-VN")} VND</span>
      </div>
      <div className="flex justify-between font-bold mt-2">
        <span>Total</span>
        <span>{(totalAmt + shippingCharge).toLocaleString("vi-VN")} VND</span>
      </div>
    </div>
  );
};

export default OrderSummary;
