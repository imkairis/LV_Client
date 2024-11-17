import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Adopt from "../../components/Adopt/Adopt";
import { fetchAllAdopts } from "../../services/donation.service";

const AdoptPage = () => {
  const [adopts, setAdopts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAdopts = async () => {
      try {
        const data = await fetchAllAdopts();
        setAdopts(data);
      } catch (err) {
        setError(err.message || "Failed to load adopts");
      } finally {
        setLoading(false);
      }
    };

    getAdopts();
  }, []);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Nhận nuôi thú cưng
      </h1>

      <div className="text-center mb-6">
        <Link
          to="/addpet"
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Thêm thú cưng
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {adopts.map((adopt) => (
          <Adopt
            key={adopt._id}
            id={adopt._id}
            image={adopt.images?.[0] || "default-image-url"} // Hiển thị ảnh đầu tiên hoặc ảnh mặc định
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
