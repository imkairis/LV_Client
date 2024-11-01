import { useEffect, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { useSearchParams } from "react-router-dom";

const ProductBanner = () => {
    const [limit, setLimit] = useState(9);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChangeLimit = e => {
        setLimit(e.target.value);
        setSearchParams(prev => {
            prev.set("limit", e.target.value);
            return prev;
        });
    };

    useEffect(() => {
        const limit = searchParams.get("limit");
        if (limit) {
            setLimit(limit);
        }
    }, [searchParams]);

    return (
        <div className='w-full flex flex-col md:flex-row md:items-center justify-end'>
            <div className='flex items-center gap-2 md:gap-6 mt-4 md:mt-0'>
                <div className='flex items-center gap-2 text-[#767676] relative'>
                    <label className='block'>Show:</label>
                    <select
                        onChange={handleChangeLimit}
                        id='countries'
                        value={limit}
                        className='w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor'
                    >
                        <option value='9'>9</option>
                        <option value='12'>12</option>
                        <option value='24'>24</option>
                        <option value='32'>32</option>
                    </select>
                    <span className='absolute text-sm right-3 top-2.5'>
                        <GoTriangleDown />
                    </span>
                </div>
            </div>
            {/* =========================================================
                            Right Part End here
        ======================================================== */}
        </div>
    );
};

export default ProductBanner;
