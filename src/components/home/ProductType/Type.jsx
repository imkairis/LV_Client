import React, { useState } from "react";
import img1 from "../../../assets/images/Type/FC.png";
import img2 from "../../../assets/images/Type/FD.png";
import img3 from "../../../assets/images/Type/CD.png";
import img4 from "../../../assets/images/Type/CC.png";
import img5 from "../../../assets/images/Type/TC.png";
import img6 from "../../../assets/images/Type/TD.png";
import img7 from "../../../assets/images/Type/MD.png";
import img8 from "../../../assets/images/Type/MT.png";

function Type({}) {
  // State để lưu trữ trạng thái hover cho từng type
  const [hovered, setHovered] = useState({
    type1: false,
    type2: false,
    type3: false,
    type4: false,
  });

  // Hàm xử lý khi hover từng type
  const handleMouseEnter = (type) => {
    setHovered((prevState) => ({ ...prevState, [type]: true }));
  };

  // Hàm xử lý khi bỏ hover
  const handleMouseLeave = (type) => {
    setHovered((prevState) => ({ ...prevState, [type]: false }));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Dòng chữ "Brand" ở trên cùng */}
      <div className="mt-12 text-center text-2xl font-semibold text-gray-900 mb-4">
        LOẠI SẢN PHẨM
      </div>

      {/* Các loại type */}
      <div className="flex gap-4">
        {/* Type 1 */}
        <a
          href="/shop?type=67238a8842d93be1ed5743a1" // Liên kết riêng cho Type 1
          className="relative block w-1/4 rounded-tr-3xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
          onMouseEnter={() => handleMouseEnter("type1")}
          onMouseLeave={() => handleMouseLeave("type1")}
        >
          <img
            src={hovered.type1 ? img2 : img1} // Thay đổi ảnh riêng cho Type 1
            alt=""
            className="h-80 w-full rounded-tr-3xl object-cover transition-all duration-300 ease-in-out"
          />
          <div className="p-4 text-center">
            <strong className="text-xl font-medium text-gray-900">
              Thức ăn
            </strong>
            <p className="mt-2 text-pretty text-gray-700">
              Đa dạng các loại thức ăn cho chó mèo đến từ nhiều thương hiệu khác
              nhau
            </p>
            <span className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900">
              Mua Ngay Thức Ăn
            </span>
          </div>
        </a>

        {/* Type 2 */}
        <a
          href="/shop?type=6723b355a8cc66e7c07a8307" // Liên kết riêng cho Type 2
          className="relative block w-1/4 rounded-tr-3xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
          onMouseEnter={() => handleMouseEnter("type2")}
          onMouseLeave={() => handleMouseLeave("type2")}
        >
          <img
            src={hovered.type2 ? img4 : img3} // Thay đổi ảnh riêng cho Type 2
            alt=""
            className="h-80 w-full rounded-tr-3xl object-cover transition-all duration-300 ease-in-out"
          />
          <div className="p-4 text-center">
            <strong className="text-xl font-medium text-gray-900">
              Chuồng
            </strong>
            <p className="mt-2 text-pretty text-gray-700">
              Các loại chuồng đa dạng kích cỡ, loại, vật liêu cho chó mèo
            </p>
            <span className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900">
              Mua Ngay Chuồng
            </span>
          </div>
        </a>

        {/* Type 3 */}
        <a
          href="shop?type=6723b336a8cc66e7c07a8302" // Liên kết riêng cho Type 3
          className="relative block w-1/4 rounded-tr-3xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
          onMouseEnter={() => handleMouseEnter("type3")}
          onMouseLeave={() => handleMouseLeave("type3")}
        >
          <img
            src={hovered.type3 ? img6 : img5} // Thay đổi ảnh riêng cho Type 3
            alt=""
            className="h-80 w-full rounded-tr-3xl object-cover transition-all duration-300 ease-in-out"
          />
          <div className="p-4 text-center">
            <strong className="text-xl font-medium text-gray-900">
              Đồ chơi
            </strong>
            <p className="mt-2 text-pretty text-gray-700">
              Các loại đồ chơi khác nhau cho chó mèo của bạn
            </p>
            <span className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900">
              Mua Ngay Đồ Chơi
            </span>
          </div>
        </a>

        {/* Type 4 */}
        <a
          href="shop?type=6723b36da8cc66e7c07a830c" // Liên kết riêng cho Type 4
          className="relative block w-1/4 rounded-tr-3xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
          onMouseEnter={() => handleMouseEnter("type4")}
          onMouseLeave={() => handleMouseLeave("type4")}
        >
          <img
            src={hovered.type4 ? img8 : img7} // Thay đổi ảnh riêng cho Type 4
            alt=""
            className="h-80 w-full rounded-tr-3xl object-cover transition-all duration-300 ease-in-out"
          />
          <div className="p-4 text-center">
            <strong className="text-xl font-medium text-gray-900">Thuốc</strong>
            <p className="mt-2 text-pretty text-gray-700">
              Thuốc sử dụng riêng cho chó mèo với tình trạng gặp phải khác nhau
            </p>
            <span className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900">
              Mua Ngay Thuốc
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Type;
