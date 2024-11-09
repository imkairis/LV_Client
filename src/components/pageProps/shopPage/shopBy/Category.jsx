import { useEffect, useState } from "react";
import NavTitle from "./NavTitle";
import { getAllProductTypes } from "../../../../services";
import { useSearchParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickCategory = (id) => {
    setSearchParams((prev) => {
      if (prev.get("type") === id) {
        prev.delete("type");
      } else {
        prev.set("type", id);
      }
      return prev;
    });
  };

  useEffect(() => {
    getAllProductTypes().then((res) => {
      setCategory(res?.data || []);
    });
  }, []);

  return (
    <div className="w-full">
      <NavTitle title="Loại sản phẩm" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {category.map(({ _id, name }) => (
            <li
              onClick={() => handleClickCategory(_id)}
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex justify-between items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer"
            >
              {name}

              {searchParams.get("type") === _id && <IoClose />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
