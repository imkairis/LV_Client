import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createDonation } from "../../services/donation.service";

const AddPetForm = () => {
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
    images: [],
  });
  const [image, setImage] = useState([]);

  const statusOptions = ["Available", "Adopted", "Pending"];
  const typeOptions = ["Dog", "Cat"]; // Thay thế bằng danh sách từ API nếu cần

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = async () => {
    try {
      createDonation({
        user: userInfo._id,
        ...formData,
        images: image,
      }).then((data) => {
        console.log("Thú cưng đã được thêm:", data);
      });
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm thú cưng:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Adoptable Pet</h2>
      <div>
        {/* Tên */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Tuổi */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tuổi
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Loại */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Loại
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        {/* Tiền sử bệnh */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tiền sử vấn đề
          </label>
          <textarea
            name="historyOfIssue"
            value={formData.historyOfIssue}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>
        </div>

        {/* Vấn đề hiện tại */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Vấn đề hiện tại
          </label>
          <textarea
            name="currentIssue"
            value={formData.currentIssue}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>
        </div>

        {/* Trạng thái */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Trạng thái
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Chọn trạng thái</option>
            {statusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Địa chỉ */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Số điện thoại */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Mô tả */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Hình ảnh */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Hình ảnh
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Nút gửi */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Thêm thú cưng
        </button>
      </div>
    </div>
  );
};

export default AddPetForm;
