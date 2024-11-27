import React, { useEffect, useState } from "react";
import { getAllMyDonations } from "../../services/donation.service";
import { Link } from "react-router-dom";
const AccountAdopt = () => {
  const [myDonations, setMyDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy donations của người dùng
    const fetchMyDonations = async () => {
      try {
        const donations = await getAllMyDonations();
        setMyDonations(donations);
        setLoading(false);
      } catch (error) {
        setError("Có lỗi xảy ra khi tải thông tin donations.");
        setLoading(false);
      }
    };

    fetchMyDonations();
  }, []);

  if (loading) {
    return <div>Đang tải donations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Danh sách Donations của tôi</h1>
      <ul>
        {myDonations.length === 0 ? (
          <p>Không có donations nào.</p>
        ) : (
          myDonations.map((donation) => (
            <div
              key={donation._id}
              className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium">Mã thú cưng: #{donation._id}</p>
                <p className="text-gray-600">
                  {new Date(donation.createDate).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <Link
                  to={`/adopt/${donation._id}`}
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default AccountAdopt;
