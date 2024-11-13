import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { getProductById } from "../../services";
import Image from "../../components/designLayouts/Image";
import { formatDate } from "../../utils/utils";
import ImgCD from "../../assets/images/BottomProduct.png";
import { useAddToCart } from "../../hooks/useAddToCart";
const ProductDetails = () => {
  const location = useLocation();
  const { _id } = useParams();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState({});
  const [activeImg, setActiveImage] = useState("");
  const [amount, setAmount] = useState(1);
  const { handleAddToCart } = useAddToCart();

  useEffect(() => {
    if (location.state?.item && location.state?.item?.img) {
      setProductInfo(location.state.item);
      setActiveImage(location.state.item.img);
    } else {
      getProductById(_id, {
        populate: "type,ageGroup,targetAudience",
      }).then((res) => {
        setProductInfo(res.data);
        setActiveImage(res.data.img || res.data.images?.[0]);
      });
    }
    setPrevLocation(location.pathname);
  }, [_id, location.pathname, location.state?.item]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300 bg-white">
      {" "}
      {/* Màu nền toàn phần */}
      <div className="max-w-container mx-auto px-8 bg-gray-50 py-8 rounded-lg">
        {" "}
        {/* Khung nền chứa nội dung */}
        <Breadcrumbs title="" prevLocation={prevLocation} />
        <div className="flex flex-col justify-between lg:flex-row gap-16  mt-5">
          {/* Hình ảnh sản phẩm */}
          <div className="flex flex-col gap-6 lg:w-2/4">
            <div className="p-4 bg-white shadow-lg rounded-lg  border-gray-300">
              <Image
                imgSrc={productInfo?.img || productInfo?.images?.[0]}
                isServer={productInfo?.images}
                alt={productInfo.img}
              />
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex flex-col gap-4 lg:w-2/4 items-start">
            <div>
              <span className="text-violet-600 font-semibold">
                {productInfo?.type?.name}
              </span>
              <h1 className="text-3xl font-bold">{productInfo.name}</h1>
            </div>
            <p className="text-gray-700">{productInfo.description}</p>
            <h6 className="text-2xl font-semibold">
              {parseInt(productInfo.price).toLocaleString("vi-VN")} VND
            </h6>
            <p className="text-gray-700">
              <span className="text-gray-700">Xuất xứ:</span>{" "}
              {productInfo.origin}
            </p>
            <p className="text-gray-700">
              <span className="text-gray-700">Khối lượng:</span>{" "}
              {productInfo.weight} kg
            </p>
            <p className="text-gray-700">
              <span className="text-gray-700">Đối tượng sử dụng:</span>{" "}
              {productInfo?.targetAudience?.name}
            </p>
            <p className="text-gray-700">
              <span className="text-gray-700">Nhóm tuổi sử dụng:</span>{" "}
              {productInfo?.ageGroup?.name}
            </p>
            <div className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount((prev) => (prev > 1 ? prev - 1 : 1))}
                >
                  -
                </button>
                <span className="py-4 px-6 rounded-lg">{amount}</span>
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleAddToCart(productInfo)}
                className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        {/* Chi tiết sản phẩm bổ sung */}
        <div className="mt-10 space-y-4">
          <h1 className="font-bold text-[26px] mt-6">Thông tin sản phẩm:</h1>
          <p className="font-medium text-lg">
            <span className="font-normal">Hướng dẫn sử dụng:</span>{" "}
            {productInfo.userManual || "Không có hướng dẫn sử dụng"}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Thành phần:</span>{" "}
            {productInfo.element}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Ngày sản xuất:</span>{" "}
            {formatDate(productInfo.dateOfManufacture)}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Hạn sử dụng:</span>{" "}
            {formatDate(productInfo.expirationDate)}
          </p>
        </div>
        {/* Hình ảnh bổ sung */}
        <div className="mt-6">
          <Image imgSrc={ImgCD} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
