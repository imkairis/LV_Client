import React from "react";

function PaymentMethodSelection() {
  return (
    <div className="p-4 rounded-lg bg-white">
      <h2 className="font-semibold text-lg text-left mb-4">
        PHƯƠNG THỨC THANH TOÁN
      </h2>
      <div className="space-y-3">
        <label className="flex items-center gap-3 p-3 border rounded">
          <input type="radio" name="payment" className="form-radio" />
          <span>Thanh toán trực tuyến</span>
        </label>
        <label className="flex items-center gap-3 p-3 border rounded">
          <input type="radio" name="payment" className="form-radio" />
          <span>Thanh toán khi nhận hàng</span>
        </label>
      </div>
    </div>
  );
}

export default PaymentMethodSelection;
