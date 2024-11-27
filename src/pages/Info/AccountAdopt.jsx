import React, { useEffect, useState } from "react";
import { getMyDonations } from "../../services/donation.service";

const AccountAdopt = () => {
  const [myDonations, setMyDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy donations của người dùng
    const fetchMyDonations = async () => {
      try {
        const donations = await getMyDonations();
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
            <li key={donation.id}>
              <h2>{donation.name}</h2>
              <p>{donation.description}</p>
              {/* Bạn có thể thêm các thông tin khác của donation ở đây */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AccountAdopt;
