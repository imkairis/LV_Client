import React, { useState } from "react";

import AccountOverview from "./AccountOverview";
import AccountInfor from "./AccountInfor";
import AccountChangePassword from "./AccountChangePassword";
import AccountOrder from "./AccountOrder";

function AccountPage() {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          <div className="w-1/4 p-4">
            <div className="text-lg font-bold">TÀI KHOẢN</div>
            <div className="mt-4">
              <ul className="space-y-2">
                <li
                  className={`${
                    activeTab === 1
                      ? "text-indigo-600 font-bold border-b-2 border-indigo-600"
                      : ""
                  }`}
                  onClick={() => handleTabClick(1)}
                >
                  <a href="#">TỔNG QUAN</a>
                </li>
                <li
                  className={`${
                    activeTab === 2
                      ? "text-indigo-600 font-bold border-b-2 border-indigo-600"
                      : ""
                  }`}
                  onClick={() => handleTabClick(2)}
                >
                  <a href="#">THÔNG TIN TÀI KHOẢN</a>
                </li>
                <li
                  className={`${
                    activeTab === 3
                      ? "text-indigo-600 font-bold border-b-2 border-indigo-600"
                      : ""
                  }`}
                  onClick={() => handleTabClick(3)}
                >
                  <a href="#">ĐỔI MẬT KHẨU</a>
                </li>
                <li
                  className={`${
                    activeTab === 4
                      ? "text-indigo-600 font-bold border-b-2 border-indigo-600"
                      : ""
                  }`}
                  onClick={() => handleTabClick(4)}
                >
                  <a href="#">ĐƠN HÀNG</a>
                </li>
                <button className="w-full bg-black text-white py-3 rounded-md hover:opacity-70">
                  ĐĂNG XUẤT
                </button>
              </ul>
            </div>
          </div>
          <div className="w-3/4 p-4">
            <div className="tab-content">
              {activeTab === 1 && <AccountOverview />}
              {activeTab === 2 && <AccountInfor />}
              {activeTab === 3 && <AccountChangePassword />}
              {activeTab === 4 && <AccountOrder />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
