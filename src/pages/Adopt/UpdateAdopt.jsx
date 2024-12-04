import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { instanceAxios } from "../../constants/instanceAxios";
import { useParams } from "react-router-dom";
import { useUpdateAdopt } from "../../hooks/useUpdateAdopt";

const statusOptions = [
  "Đang chờ xét duyệt",
  "Chưa có người nhận nuôi",
  "Đã có người nhận nuôi",
  "Từ chối",
];
const genderOptions = ["Đực", "Cái"];
const typeOptions = [
  "Chó cỏ",
  "Poodle",
  "Chihuahua",
  "Corgi",
  "Golden",
  "Pug",
  "Mèo mướp",
  "Mèo Anh lông ngắn",
  "Mèo Ba Tư",
  "Mèo tam thể",
  "Mèo Ai Cập",
];

const getDynamicStatusOptions = (currentStatus) => {
  switch (currentStatus) {
    case "Đang chờ xét duyệt":
      return ["Đang chờ xét duyệt", "Từ chối"];
    case "Chưa có người nhận nuôi":
      return ["Chưa có người nhận nuôi", "Từ chối", "Đã có người nhận nuôi"];
    case "Đã có người nhận nuôi":
      return ["Đã có người nhận nuôi"];
    case "Từ chối":
      return ["Từ chối"];
    default:
      return [];
  }
};

const UpdateAdopt = () => {
  const { id } = useParams();
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    historyOfIssue: "",
    currentIssue: "",
    status: "",
    address: "",
    phone: "",
    type: "",
    description: "",
    gender: "",
  });

  const { handleUpdateAdopt } = useUpdateAdopt();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchAdoptDetail = async () => {
      try {
        const response = await instanceAxios.get(`/donations/${id}`);
        setFormData({
          name: response.data.data?.name,
          age: response.data.data?.age,
          historyOfIssue: response.data.data?.historyOfIssue,
          currentIssue: response.data.data?.currentIssue,
          status: response.data.data?.status,
          address: response.data.data?.address,
          phone: response.data.data?.phone,
          type: response.data.data?.type,
          description: response.data.data?.description,
          gender: response.data.data?.gender,
        });
      } catch (err) {
        console.error("Error fetching adopt detail:", err);
      }
    };

    fetchAdoptDetail();
  }, [id]);

  const handleSubmit = () => {
    handleUpdateAdopt(id, {
      user: userInfo._id,
      ...formData,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Cập nhật thông tin thú cưng
      </h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột 1 */}
        <div>
          <label className="block text-gray-700 font-medium">Tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Tuổi</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Loại</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Chọn loại</option>
            {typeOptions.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Trạng thái</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {getDynamicStatusOptions(formData.status).map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Giới tính</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Chọn giới tính</option>
            {genderOptions.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Tiền sử vấn đề
          </label>
          <textarea
            name="historyOfIssue"
            value={formData.historyOfIssue}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Vấn đề hiện tại
          </label>
          <textarea
            name="currentIssue"
            value={formData.currentIssue}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium text-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAdopt;
