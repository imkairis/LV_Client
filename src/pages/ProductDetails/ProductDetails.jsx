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
  const [isCollapsed, setIsCollapsed] = useState(true); // Trạng thái thu gọn
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
      <div className="max-w-container mx-auto px-8 bg-white py-8 rounded-lg">
        {" "}
        {/* Khung nền chứa nội dung */}
        <Breadcrumbs title="" prevLocation={prevLocation} />
        <div className="flex flex-col justify-between lg:flex-row gap-8 mt-5">
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
          <div className="bg-white shadow-lg rounded-lg p-6 border-gray-300 w-full">
            <span className="text-violet-600 font-semibold mt-4">
              {productInfo?.type?.name}
            </span>
            <h1 className="text-3xl font-bold leading-relaxed mt-4">
              {productInfo.name}
            </h1>

            <p className="font-medium text-lg mt-4">
              <strong>Đối tượng sử dụng:</strong>{" "}
              {productInfo?.targetAudience?.name}
            </p>
            <h6 className="text-2xl font-semibold leading-relaxed mt-4">
              {parseInt(productInfo.price).toLocaleString("vi-VN")} VND
            </h6>

            <div className="flex flex-row items-center gap-12 mt-6">
              <div className="flex flex-row items-center gap-4">
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
        <div className="mt-16 mb-16 space-y-4">
          <div className="bg-white shadow-lg rounded-lg p-6 border-gray-300">
            <h1 className="font-bold text-[26px] mt-6 text-center mb-5">
              Thông tin sản phẩm
            </h1>

            {/* Mô tả sản phẩm (luôn hiển thị) */}
            <p className="font-medium text-lg" mt-4>
              <strong>Mô tả sản phẩm:</strong> {productInfo.description}
            </p>

            {/* Hướng dẫn sử dụng (luôn hiển thị) */}
            <p className="font-medium text-lg mt-4">
              <strong>Hướng dẫn sử dụng:</strong>{" "}
              {productInfo.userManual || "Không có hướng dẫn sử dụng"}
            </p>

            {/* Các thông tin khác sẽ bị thu gọn */}
            {!isCollapsed && (
              <>
                <p className="font-medium text-lg mt-4">
                  <strong>Xuất xứ:</strong> {productInfo.origin}
                </p>
                <p className="font-medium text-lg mt-4">
                  <strong>Khối lượng:</strong> {productInfo.weight} kg
                </p>

                <p className="font-medium text-lg mt-4">
                  <strong>Nhóm tuổi sử dụng:</strong>{" "}
                  {productInfo?.ageGroup?.name}
                </p>
                <p className="font-medium text-lg mt-4">
                  <strong>Thành phần:</strong> {productInfo.element}
                </p>
                <p className="font-medium text-lg mt-4">
                  <strong>Ngày sản xuất:</strong>{" "}
                  {formatDate(productInfo.dateOfManufacture)}
                </p>
                <p className="font-medium text-lg mt-4">
                  <strong>Hạn sử dụng:</strong>{" "}
                  {formatDate(productInfo.expirationDate)}
                </p>
              </>
            )}

            {/* Nút thu gọn/mở rộng */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="bg-violet-800 text-white font-semibold py-2 px-6 rounded-lg mt-4 mx-auto block"
            >
              {isCollapsed ? "Xem thêm" : "Thu gọn"}
            </button>
          </div>
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
