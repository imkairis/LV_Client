import { Link } from "react-router-dom";
import Image from "../../components/designLayouts/Image";

export const Adopt = ({ id, images, age, name, status, type, gender }) => {
  // Xác định màu nền dựa trên status
  const statusBgColor =
    status === "Chưa có người nhận nuôi"
      ? "bg-green-600"
      : status === "Đã có người nhận nuôi"
      ? "bg-blue-600"
      : "bg-gray-600"; // Màu mặc định nếu status khác giá trị mong muốn

  return (
    <div className="relative block rounded-tr-3xl border border-gray-100 overflow-hidden">
      {/* Status Badge */}
      <span
        className={`absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl px-6 py-4 font-normal uppercase tracking-widest text-white text-xs ${statusBgColor}`}
      >
        {status}
      </span>

      {/* Image */}
      <Image
        className="h-80 w-full rounded-tr-3xl object-cover"
        imgSrc={images?.[0]}
        isServer={true}
        alt={name}
      />

      {/* Content */}
      <div className="p-4 text-center">
        <strong className="text-xl font-medium text-gray-900"> {name} </strong>
        <p className="block text-xs text-gray-500 mt-1">Loài: {type}</p>
        <p className="block text-xs text-gray-500">Giới tính: {gender}</p>
        <p className="block text-xs text-gray-500">Tuổi: {age}</p>

        {/* Link to details */}
        <Link
          to={`/adopt/${id}`}
          className="mt-4 inline-block rounded-md border border-black bg-black px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
        >
          Xem Chi Tiết
        </Link>
      </div>
    </div>
  );
};

export default Adopt;
