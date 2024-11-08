import { formatDate } from "../../../utils/utils";

const ProductInfo = ({ productInfo }) => {
  const handleAddToCart = () => {
    fetch(`${import.meta.env.VITE_HOST}/carts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: productInfo._id,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">
        {productInfo?.productName || productInfo?.name}
      </h2>
      <p className="text-xl font-semibold">
        {parseInt(productInfo.price).toLocaleString("vi-VN")} VND
      </p>
      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>

      <div className="mt-10">
        <h3 className="font-medium text-lg"></h3>
        <div className="flex flex-col gap-2 mt-2">
          <p className="font-medium text-lg">
            <span className="font-normal">Xuất xứ:</span> {productInfo.origin}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Khối lượng:</span>{" "}
            {productInfo.weight} kg
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Đối tượng sử dụng:</span>{" "}
            {productInfo?.targetAudience?.name}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Nhóm tuổi sử dụng:</span>{" "}
            {productInfo?.ageGroup?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
