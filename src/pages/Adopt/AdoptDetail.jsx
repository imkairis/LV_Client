import { useParams } from "react-router-dom";
import adoptData from "../../components/Adopt/data";

const AdoptDetailPage = () => {
  const { id } = useParams();
  const adoptItem = adoptData.find((item) => item.id === Number(id));

  if (!adoptItem) {
    return <p>Không tìm thấy thông tin thú cưng.</p>;
  }

  const handleAdoptionRequest = () => {
    alert(`Bạn đã gửi yêu cầu nhận nuôi cho ${adoptItem.name}`);
    // Thêm logic xử lý gửi yêu cầu nhận nuôi ở đây (API hoặc lưu trạng thái)
  };

  return (
    <div className="md:grid justify-between md:grid-cols-3 gap-8 mt-5">
      {/* Hình ảnh thú cưng */}
      <div className="col-span-1">
        <div className="p-4 bg-white shadow-lg rounded-lg w-full border-gray-300 md:h-full">
          <img
            src={adoptItem.image}
            alt={adoptItem.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Thông tin thú cưng */}
      <div className="bg-white shadow-lg rounded-lg p-6 border-gray-300 col-span-2">
        <span className="text-green-500 font-semibold mt-4">
          {adoptItem.species}
        </span>
        <h1 className="text-3xl font-bold leading-relaxed mt-4">
          {adoptItem.name}
        </h1>

        <p className="font-medium text-lg mt-4">
          <strong>Tuổi:</strong> {adoptItem.age}
        </p>

        <p className="font-medium text-lg mt-4">
          <strong>Tiền sử bệnh:</strong> {adoptItem.medicalHistory}
        </p>

        <p className="font-medium text-lg mt-4">
          <strong>Bệnh hiện tại:</strong>{" "}
          {adoptItem.currentCondition || "Không có"}
        </p>

        <p className="font-medium text-lg mt-4">
          <strong>Địa chỉ tặng:</strong> {adoptItem.giftAddress}
        </p>

        <p className="font-medium text-lg mt-4">
          <strong>Trạng thái:</strong> {adoptItem.status}
        </p>

        <button
          onClick={handleAdoptionRequest}
          className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
        >
          Yêu cầu nhận nuôi
        </button>
      </div>
    </div>
  );
};

export default AdoptDetailPage;
