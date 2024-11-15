import React from "react";
import { Link } from "react-router-dom"; // Thêm link
import Adopt from "../../components/Adopt/Adopt";
import adoptData from "../../components/Adopt/data";

const AdoptPage = () => {
  return (
    <div className="p-6">
      {/* Thêm dòng chữ tiêu đề */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Nhận nuôi thú cưng
      </h1>

      {/* Thêm nút "Add" */}
      <div className="text-center mb-6">
        <Link
          to="/addpet" // Đường dẫn đến trang AddPetForm
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Thêm thú cưng
        </Link>
      </div>

      {/* Hiển thị danh sách thú cưng */}
      <div className="grid grid-cols-4 gap-4">
        {adoptData.map((adopt) => (
          <Adopt
            key={adopt.id}
            id={adopt.id}
            image={adopt.image}
            age={adopt.age}
            name={adopt.name}
            description={adopt.description}
            status={adopt.status}
          />
        ))}
      </div>
    </div>
  );
};

export default AdoptPage;
