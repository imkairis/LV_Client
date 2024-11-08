import { FaShoppingCart } from "react-icons/fa";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useAddToCart } from "../../../hooks/useAddToCart";

const Product = props => {
    const { handleAddToCart: actionAdd } = useAddToCart();
    const _id = props._id;
    const navigate = useNavigate();

    const handleProductDetails = () => {
        navigate(`/product/${_id}`, {
            state: { item: props },
        });
    };

    const handleAddToCart = e => {
        e.stopPropagation();
        actionAdd(props);
    };

    return (
        <div
            className='w-full relative group h-full flex flex-col shadow cursor-pointer'
            onClick={handleProductDetails}
        >
            <div className='max-w-80 max-h-80 relative overflow-y-hidden'>
                <div>
                    <Image
                        className='w-full h-full'
                        imgSrc={props?.images?.[0] || props.img}
                        alt='Product Image'
                        isServer={!props?.color}
                    />
                </div>
                <div className='absolute top-6 left-8'>
                    {props.badge && <Badge text='New' />}
                </div>
                <div className='w-full h-8 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700'>
                    <ul className='w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r'>
                        <li
                            onClick={handleAddToCart}
                            className='text-[#767676] hover:text-primeColor text-sm font-normal flex items-center justify-start gap-2 hover:cursor-pointer mt-4 pb-1 duration-300 w-full pl-4'
                        >
                            Add to Cart
                            <span>
                                <FaShoppingCart />
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='max-w-80 py-6 pb-2 flex-1 flex flex-col gap-1 border-[1px] border-t-0 px-4'>
                <div className='flex items-center justify-between font-titleFont flex-1'>
                    <h2 className='text-lg text-primeColor font-bold line-clamp-2'>
                        {props?.productName || props?.name}
                    </h2>
                    <p className='text-[#767676] text-[14px]'>
                        {parseInt(props.price).toLocaleString("vi-VN")} VND
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Product;
