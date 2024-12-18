import React, { useState } from "react";

import AccountInfor from "./AccountInfor";
import AccountChangePassword from "./AccountChangePassword";
import AccountOrder from "./AccountOrder";
import AccountAdopt from "./AccountAdopt";
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
                  <a href="#">THÔNG TIN TÀI KHOẢN</a>
                </li>
                <li
                  className={`${
                    activeTab === 2
                      ? "text-indigo-600 font-bold border-b-2 border-indigo-600"
                      : ""
                  }`}
                  onClick={() => handleTabClick(2)}
                >
                  <a href="#">ĐỔI MẬT KHẨU</a>
                </li>
                <li
                  className={`${
                    activeTab === 3
                      ? "text-indigo-600 font-bold border-b-2 border-indigo-600"
                      : ""
                  }`}
                  onClick={() => handleTabClick(3)}
                >
                  <a href="#">ĐƠN HÀNG</a>
                </li>
                <li
                  className={`${
                    activeTab === 4
                      ? "text-indigo-600 font-bold border-b-2 border-indigo-600"
                      : ""
                  }`}
                  onClick={() => handleTabClick(4)}
                >
                  <a href="#">NHẬN NUÔI</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-3/4 p-4">
            <div className="tab-content">
              {/* {activeTab === 1 && <AccountOverview />} */}
              {activeTab === 1 && <AccountInfor />}
              {activeTab === 2 && <AccountChangePassword />}
              {activeTab === 3 && <AccountOrder />}
              {activeTab === 4 && <AccountAdopt />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
