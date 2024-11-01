import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const ProductInfo = ({ productInfo }) => {
    const dispatch = useDispatch();
    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-4xl font-semibold'>
                {productInfo?.productName || productInfo?.name}
            </h2>
            <p className='text-xl font-semibold'>${productInfo.price}</p>
            <p className='text-base text-gray-600'>{productInfo.des}</p>

            <p className='font-medium text-lg'>
                <span className='font-normal'>Origin:</span>{" "}
                {productInfo.origin}
            </p>
            <p className='font-medium text-lg'>
                <span className='font-normal'>Weight:</span>{" "}
                {productInfo.weight} kg
            </p>
            <p className='font-medium text-lg'>
                <span className='font-normal'>User Manual:</span>{" "}
                {productInfo.userManual}
            </p>
            <p className='font-medium text-lg'>
                <span className='font-normal'>Manufacture Date:</span>{" "}
                {productInfo.dateOfManufacture}
            </p>
            <p className='font-medium text-lg'>
                <span className='font-normal'>Expiration Date:</span>{" "}
                {productInfo.expirationDate}
            </p>
            <p className='font-medium text-lg'>
                <span className='font-normal'>Target Audience:</span>{" "}
                {productInfo.targetAudience}
            </p>
            <p className='font-medium text-lg'>
                <span className='font-normal'>Age Group:</span>{" "}
                {productInfo.ageGroup}
            </p>

            <button
                onClick={() =>
                    dispatch(
                        addToCart({
                            _id: productInfo._id,
                            name: productInfo.productName,
                            quantity: 1,
                            image: productInfo.images[0],
                            price: productInfo.price,
                        })
                    )
                }
                className='w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont'
            >
                Add to Cart
            </button>
            <p className='font-normal text-sm'>
                <span className='text-base font-medium'>Categories:</span>{" "}
                Spring collection, Streetwear, Women
            </p>
        </div>
    );
};

export default ProductInfo;
