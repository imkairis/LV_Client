import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Adopt from "../../components/Adopt/Adopt";
import { fetchAllAdopts } from "../../services/donation.service";
import imgAdopt from "../../assets/images/Adopt/adoptbaneer.png";
import Image from "../../components/designLayouts/Image";
const AdoptPage = () => {
  const [adopts, setAdopts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAdopts = async () => {
      try {
        const data = await fetchAllAdopts({ limit: 50 });
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
      <Image imgSrc={imgAdopt} className="w-full h-full object-cover mb-6" />

      <div className="text-center mb-6">
        <Link
          to="/addpet"
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Thêm thú cưng
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Danh sách thú cưng
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {adopts.map((adopt) => (
          <Adopt
            key={adopt._id}
            id={adopt._id}
            images={adopt.images || "default-image-url"} // Hiển thị ảnh đầu tiên hoặc ảnh mặc định
            age={adopt.age}
            name={adopt.name}
            description={adopt.description}
            status={adopt.status}
            gender={adopt.gender}
            type={adopt.type}
          />
        ))}
      </div>
    </div>
  );
};

export default AdoptPage;
