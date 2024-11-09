import { useEffect, useState } from "react";
import NavTitle from "./NavTitle";
import { getAllTargets } from "../../../../services";
import { useSearchParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Targets = () => {
  const [targets, setTarget] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickTarget = (id) => {
    setSearchParams((prev) => {
      if (prev.get("targets") === id) {
        prev.delete("targets");
      } else {
        prev.set("targets", id);
      }
      return prev;
    });
  };

  useEffect(() => {
    getAllTargets().then((res) => {
      setTarget(res?.data || []);
    });
  }, []);

  return (
    <div className="w-full">
      <NavTitle title="Đối tượng sử dụng" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {targets.map(({ _id, name }) => (
            <li
              onClick={() => handleClickTarget(_id)}
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex justify-between items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer"
            >
              {name}
              {searchParams.get("targets") === _id && <IoClose />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Targets;
