import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Adopt from "../../components/Adopt/Adopt";
import { fetchAllAdopts } from "../../services/donation.service";
import imgAdopt from "../../assets/images/Adopt/adoptbaneer.png";
import Image from "../../components/designLayouts/Image";
import ReactPaginate from "react-paginate";

const statusOptions = [
  "Chưa có người nhận nuôi", // Mặc định
  "Đã có người nhận nuôi", // Lựa chọn
];

const AdoptPage = () => {
  const [adopts, setAdopts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalItems: 1,
    totalPageItems: 1,
    totalPage: 1,
    page: 1,
    limit: 5,
  });
  const [searchParam, setSearchParam] = useSearchParams();

  const handlePageClick = (event) => {
    const pageClicked = event.selected + 1;
    setSearchParam((prev) => {
      prev.set("page", pageClicked);
      return prev;
    });
  };

  const handleChangeFilterStatus = (event) => {
    const status = event.target.value;
    setSearchParam((prev) => {
      prev.set("status", status);
      return prev;
    });
  };

  useEffect(() => {
    const getAdopts = async () => {
      try {
        const res = await fetchAllAdopts({
          limit: 12,
          page: searchParam.get("page") || 1,
          status: searchParam.get("status") || "Chưa có người nhận nuôi", // Trạng thái mặc định
        });
        setAdopts(res.data);
        setPagination(res.pagination);
      } catch (err) {
        setError(err.message || "Failed to load adopts");
      } finally {
        setLoading(false);
      }
    };

    getAdopts();
  }, [searchParam]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  return (
    <div className="p-6">
      <Image imgSrc={imgAdopt} className="w-full h-full object-cover mb-6" />

      <div className="flex justify-between mb-6">
        <select
          onChange={handleChangeFilterStatus}
          className="bg-gray-100 p-2 rounded-md"
          value={searchParam.get("status") || "Chưa có người nhận nuôi"} // Mặc định
        >
          {statusOptions.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
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
      <div className="flex w-full justify-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pagination.totalPage}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
      </div>
    </div>
  );
};

export default AdoptPage;
