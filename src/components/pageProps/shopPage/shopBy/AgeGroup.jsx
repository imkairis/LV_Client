import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import NavTitle from "./NavTitle";
import { getAllAges } from "../../../../services";
import { useSearchParams } from "react-router-dom";

const AgeGroup = () => {
    const [ageGroup, setAgeGroup] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleClickAgeGroup = id => {
        setSearchParams(prev => {
            if (prev.get("ageGroup") === id) {
                prev.delete("ageGroup");
            } else {
                prev.set("ageGroup", id);
            }
            return prev;
        });
    };

    useEffect(() => {
        getAllAges({
            limit: 999,
        }).then(res => {
            setAgeGroup(res?.data || []);
        });
    }, []);

    return (
        <div className='w-full'>
            <NavTitle title='Shop by Age group' icons={false} />
            <div>
                <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
                    {ageGroup.map(({ _id, name }) => (
                        <li
                            onClick={() => handleClickAgeGroup(_id)}
                            key={_id}
                            className='border-b-[1px] border-b-[#F0F0F0] pb-2 flex justify-between items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 cursor-pointer'
                        >
                            {name}
                            {searchParams.get("ageGroup") === _id && (
                                <IoClose />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AgeGroup;
