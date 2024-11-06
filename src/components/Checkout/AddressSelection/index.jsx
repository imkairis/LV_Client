import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons";

function AddressSelection() {
  const user = {
    _id: "66e1988bd476c35adb7745cf",
    username: "admin",
    fullname: "Admin User",
    address: [
      {
        _id: "67153ee15facdc0c778e433e",
        name: "Võ Nguyên Khoa",
        phone: "0354320653",
        addressDetail: "Long Phu, Soc Trang",
        __v: 0,
      },
      {
        _id: "67153eea5facdc0c778e4349",
        name: "Vo Nguyen Khoa",
        phone: "0354321653",
        addressDetail: "71/25c Lý Tự Trọng",
        __v: 0,
      },
    ],
    email: "nguyenkhoaht002@gmail.com",
    avatar: "1727019390476.gif",
    isAdmin: true,
  };

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleDeleteAddress = (address) => {
    console.log("delete address", address);
  };

  return (
    <>
      <div className="space-y-4 p-4 rounded-lg bg-white">
        <h2 className="font-semibold text-lg text-left">
          <FontAwesomeIcon icon={faLocationDot} /> ĐỊA CHỈ GIAO HÀNG
        </h2>
        <div className="space-y-2">
          {user?.address?.map((address) => (
            <div
              key={address._id}
              className="flex items-center justify-between gap-3 p-3 border rounded"
            >
              <div className="flex items-center flex-1">
                <input
                  type="radio"
                  name="selectedAddress"
                  value={address._id}
                  checked={selectedAddress?._id === address._id}
                  onChange={() => setSelectedAddress(address)}
                  className="mr-2"
                />
                <span>{`${address.name} | ${address.addressDetail} | ${address.phone}`}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="text-blue-500 font-medium"
                  onClick={() => setSelectedAddress(address)}
                >
                  Sửa
                </button>
                <button
                  className="text-blue-500 font-medium"
                  onClick={() => handleDeleteAddress(address)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-gray-600 ml-6 cursor-pointer">
          <FontAwesomeIcon icon={faPlus} />
          <div>Giao hàng đến địa chỉ khác</div>
        </div>
      </div>
    </>
  );
}

export default AddressSelection;
