import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { debounce } from "../../../utils/utils";
import {
  getAllProducts,
  getAllProductTypes,
} from "../../../services/product.service";
import { useClickOutside } from "../../../hooks";
import Image from "../../designLayouts/Image";

const HeaderBottom = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [search, setSearch] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const ref = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

  useClickOutside(ref, () => {
    setShow(false);
  });

  // Kiểm tra xem người dùng đã đăng nhập chưa
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchWithDebounce = useCallback(
    () =>
      debounce(async (e) => {
        if (!e.target.value) {
          setProducts([]);
          return;
        }
        setShowSuggest(true);
        const searchParams = new URLSearchParams();
        searchParams.append("search", e.target.value);
        return getAllProducts({
          search: e.target.value,
          limit: 9,
        }).then((res) => {
          setProducts(res.data);
        });
      }, 350),
    []
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchWithDebounce(e);
  };

  const handleSelectCategory = (id) => {
    navigate(`/shop?type=${id}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false); // Cập nhật lại trạng thái đăng xuất
    setShowUser(false);
    navigate("/signin");
  };

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const search = e.target["search"].value;
    if (!search) {
      setSearchParams((prev) => {
        prev.delete("search");
        return prev;
      });
      return;
    }
    setShowSuggest(false);
    if (pathname === "/shop") {
      setSearchParams((prev) => {
        prev.set("search", search);
        return prev;
      });
    } else {
      navigate(`/shop?search=${search}`);
    }
  };

  useEffect(() => {
    getAllProductTypes().then((res) => {
      setCategory(res?.data || []);
    });
  }, []);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
              >
                {category.map((item) => (
                  <li
                    key={item._id}
                    onClick={() => handleSelectCategory(item._id)}
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                  >
                    {item.name}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <form
              onSubmit={handleSubmitSearch}
              className="flex gap-2 justify-center items-center w-full"
            >
              <input
                name="search"
                value={search}
                className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                type="text"
                onChange={handleSearch}
                placeholder="Nhập tên sản phẩm bạn cần tìm kiếm sản phẩm bạn cần"
              />
              <FaSearch className="w-5 h-5" />
            </form>
            {products.length > 0 && showSuggest && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {products.map((item) => (
                  <SearchProductItem
                    key={item._id}
                    item={item}
                    onClick={() => handleNavigate(item._id)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-1 lg:mt-0 items-center pr-4 cursor-pointer relative text-sm h-10">
            {/* Kiểm tra trạng thái đăng nhập */}
            {isLoggedIn ? (
              <div
                onClick={() => setShowUser(!showUser)}
                className="flex items-center gap-2"
              >
                <FaUser />
                <FaCaretDown />
                {showUser && (
                  <motion.ul
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-6 left-0 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
                  >
                    <Link to="/info">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Infomation
                      </li>
                    </Link>
                    <li
                      onClick={handleLogout}
                      className="text-gray-400 px-4 py-1  border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer"
                    >
                      Logout
                    </li>
                  </motion.ul>
                )}
              </div>
            ) : (
              <Link to="/signin" className="text-primeColor">
                <FaUser />
              </Link>
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;

function SearchProductItem({ onClick, item }) {
  return (
    <div
      onClick={onClick}
      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
    >
      <Image
        className="w-24"
        imgSrc={item?.images?.[0]}
        alt="productImg"
        isServer
      />
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-lg">{item?.name}</p>
        <p className="text-gray-400 text-[14px]">{item?.category?.name}</p>
      </div>
    </div>
  );
}
