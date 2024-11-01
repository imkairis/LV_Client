import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { formatDate } from "../../../utils/utils";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();

  console.log(productInfo);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">
        {productInfo?.productName || productInfo?.name}
      </h2>
      <p className="text-xl font-semibold">
        {parseInt(productInfo.price).toLocaleString("vi-VN")} VND
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
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>

      <div className="mt-10">
        <h3 className="font-medium text-lg">Product information:</h3>
        <div className="flex flex-col gap-2 mt-2">
          <p className="font-medium text-lg">
            <span className="font-normal">Description:</span>{" "}
            {productInfo.description}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Origin:</span> {productInfo.origin}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Weight:</span> {productInfo.weight} kg
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">User Manual:</span>{" "}
            {productInfo.userManual}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Manufacture Date:</span>{" "}
            {formatDate(productInfo.dateOfManufacture)}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Expiration Date:</span>{" "}
            {formatDate(productInfo.expirationDate)}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Target Audience:</span>{" "}
            {productInfo?.targetAudience?.name}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Age Group:</span>{" "}
            {productInfo?.ageGroup?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
