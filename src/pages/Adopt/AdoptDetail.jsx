import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { instanceAxios } from "../../constants/instanceAxios";
import Image from "../../components/designLayouts/Image";

const AdoptDetailPage = () => {
  const { id } = useParams(); // Lấy `id` từ URL
  const [adoptItem, setAdoptItem] = useState(null); // Dữ liệu chi tiết thú cưng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdoptDetail = async () => {
      try {
        setLoading(true);
        const response = await instanceAxios.get(`/donations/${id}`); // API endpoint chi tiết
        setAdoptItem(response.data.data); // Giả sử dữ liệu chi tiết trong `data.data`
      } catch (err) {
        console.error("Error fetching adopt detail:", err);
        setError("Không thể tải thông tin thú cưng.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptDetail();
  }, [id]);

  if (loading) return <p>Đang tải thông tin thú cưng...</p>;
  if (error) return <p>{error}</p>;
  if (!adoptItem) return <p>Không tìm thấy thông tin thú cưng.</p>;

  const handleAdoptionRequest = () => {
    alert(`Bạn đã gửi yêu cầu nhận nuôi cho ${adoptItem.name}`);
    // Thêm logic xử lý gửi yêu cầu nhận nuôi (ví dụ gọi API POST).
  };
  console.log(adoptItem.images?.[0]);

  return (
    <div className="md:grid justify-between md:grid-cols-3 gap-8 mt-5">
      {/* Hình ảnh thú cưng */}
      <div className="col-span-1">
        <div className="p-4 bg-white shadow-lg rounded-lg w-full border-gray-300 md:h-full">
          <Image
            imgSrc={adoptItem.images?.[0]}
            isServer={true}
            // Lấy ảnh đầu tiên
            alt={adoptItem.name}
            className="w-full md:h-full h-64 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Thông tin thú cưng */}
      <div className="bg-white shadow-lg rounded-lg p-6 border-gray-300 col-span-2">
        <span className="text-green-500 font-semibold mt-4">
          {adoptItem.type} {/* Thể loại */}
        </span>
        <span className="text-green-500 font-semibold mt-4">
          {adoptItem.gender}
        </span>
        <h1 className="text-3xl font-bold leading-relaxed mt-4">
          {adoptItem.name}
        </h1>

        <p className="font-medium text-lg mt-4">
          <strong>Tuổi:</strong> {adoptItem.age}
        </p>

        <p className="font-medium text-lg mt-4">
          <strong>Tiền sử bệnh:</strong>{" "}
          {adoptItem.historyOfIssue || "Không có"}
        </p>

        <p className="font-medium text-lg mt-4">
          <strong>Bệnh hiện tại:</strong> {adoptItem.currentIssue || "Không có"}
        </p>

        <p className="font-medium text-lg mt-4">
          <strong>Trạng thái:</strong> {adoptItem.status}
        </p>

        <p className="font-medium text-lg mt-4">
          <strong>Địa chỉ:</strong> {adoptItem.address}
        </p>

        <p className="font-medium text-lg mt-4">
          <strong>Số điện thoại:</strong> {adoptItem.phone || "Không có"}
        </p>

        <p className="font-medium text-lg mt-4">
          <strong>Mô tả:</strong> {adoptItem.description || "Không có mô tả"}
        </p>

        <p className="font-medium text-lg mt-4">
          <strong>Ngày đăng:</strong>{" "}
          {new Date(adoptItem.createDate).toLocaleDateString() || "Không rõ"}
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
