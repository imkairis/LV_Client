import { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { getAllProducts } from "../../../services";
import { useSearchParams } from "react-router-dom";
import { toObjectSearchParams } from "../../../utils/searchParams.utils";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [pagination, setPagination] = useState({
    totalItems: 1,
    totalPageItems: 1,
    totalPage: 1,
    page: 1,
    limit: 5,
  });

  const startOffset = useMemo(
    () => (pagination.page === 1 ? 1 : pagination.page * pagination.limit),
    [pagination]
  );
  const endOffset = useMemo(
    () =>
      pagination.page === 1
        ? 1 + pagination.limit
        : pagination.page * pagination.limit + pagination.limit,
    [pagination]
  );

  const handlePageClick = (event) => {
    const pageClicked = event.selected + 1;
    setSearchParam((prev) => {
      prev.set("page", pageClicked);
      return prev;
    });
  };

  useEffect(() => {
    const obj = toObjectSearchParams(searchParam);
    if (!obj?.limit) {
      obj.limit = 9;
    }
    getAllProducts(obj)
      .then((res) => {
        setProducts(res.data);
        setPagination(res.pagination);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchParam]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items products={products} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
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

        <p className="text-base font-normal text-lightText">
          Products from {startOffset} to {endOffset} of {pagination.totalItems}
        </p>
      </div>
    </div>
  );
};

export default Pagination;

function Items({ products }) {
  return (
    <>
      {products &&
        products?.map((item) => (
          <div key={item._id} className="w-full">
            <Product {...item} />
          </div>
        ))}
    </>
  );
}
