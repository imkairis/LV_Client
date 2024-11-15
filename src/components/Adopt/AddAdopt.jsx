import React, { useState } from "react";
import axios from "axios";

const AddPetForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    medicalHistory: "",
    currentIllness: "",
    status: "",
    address: "",
    createdAt: "",
  });

  const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit"];
  const statusOptions = ["Available", "Adopted", "Pending"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("API_ENDPOINT_HERE", formData);
      console.log("Thú cưng đã được thêm:", response.data);
      // Sau khi thêm thành công, bạn có thể thực hiện các hành động khác như thông báo cho người dùng
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm thú cưng:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Adoptable Pet</h2>
      <form onSubmit={handleSubmit}>
        {/* Các input fields như hiện tại */}
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

        {/* Các input fields khác */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Loài
          </label>
          <select
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Chọn loài</option>
            {speciesOptions.map((species, index) => (
              <option key={index} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>

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

        {/* Các input fields còn lại */}
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

        {/* Các input fields còn lại */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Ngày tạo
          </label>
          <input
            type="date"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Thêm thú cưng
        </button>
      </form>
    </div>
  );
};

export default AddPetForm;
