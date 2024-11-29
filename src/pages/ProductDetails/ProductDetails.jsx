import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { getProductById } from "../../services";
import Image from "../../components/designLayouts/Image";
import { formatDate } from "../../utils/utils";
import ImgCD from "../../assets/images/BottomProduct.png";
import { useAddToCart } from "../../hooks/useAddToCart";
import Slider from "react-slick";

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
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300 bg-gray-50">
      {" "}
      {/* Màu nền toàn phần */}
      <div className="max-w-container mx-auto px-8 bg-gray-50 py-8 rounded-lg">
        {" "}
        {/* Khung nền chứa nội dung */}
        <Breadcrumbs title="" prevLocation={prevLocation} />
        <div className="md:grid justify-between md:grid-cols-3 gap-8 mt-5">
          {/* Hình ảnh sản phẩm */}
          <div className="col-span-1">
            <div className="p-4 bg-white shadow-lg rounded-lg w-full border-gray-300 md:h-full">
              <SlideImage images={productInfo?.images} />
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-gray-300 col-span-2">
            <span className="text-sky-500 font-semibold mt-4">
              {productInfo?.type?.name}
            </span>
            <h1 className="text-3xl font-bold leading-relaxed mt-4">
              {productInfo.name}
            </h1>

            <p className="font-medium text-lg mt-4">
              <strong>Đối tượng sử dụng:</strong>{" "}
              {productInfo?.targetAudience?.name}
            </p>

            <p className="font-medium text-lg mt-4">
              <strong>Xuất xứ:</strong> {productInfo.origin}
            </p>
            <p className="font-medium text-lg mt-4">
              <strong>Tình trạng:</strong> {productInfo.status}
            </p>

            <h6 className="text-2xl font-semibold leading-relaxed mt-4">
              {parseInt(productInfo.price).toLocaleString("vi-VN")} VND
            </h6>

            <div className="flex flex-row items-center gap-12 mt-6">
              <div className="flex flex-row items-center gap-4">
                {productInfo.quantity > 0 ? (
                  <button
                    onClick={() => handleAddToCart(productInfo)}
                    className="bg-sky-400 text-white font-semibold py-3 px-8 rounded-xl h-full transition-all duration-300 hover:bg-sky-600"
                  >
                    Thêm vào giỏ
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white font-semibold py-3 px-8 rounded-xl h-full cursor-not-allowed"
                  >
                    Hết hàng
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Chi tiết sản phẩm bổ sung */}
        <div className="mt-16 mb-16 space-y-4">
          <div className="bg-white shadow-lg rounded-lg p-6 border-gray-300">
            <h1 className="font-bold text-[26px] mt-6 text-center mb-5">
              Thông tin sản phẩm
            </h1>

            <div className="flow-root">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                {/* Mô tả sản phẩm */}
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Mô tả sản phẩm:</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {productInfo.description}
                  </dd>
                </div>

                {/* Hướng dẫn sử dụng */}
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">
                    Hướng dẫn sử dụng:
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {productInfo.userManual || "Không có hướng dẫn sử dụng"}
                  </dd>
                </div>

                {/* Các thông tin khác */}
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Khối lượng:</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {productInfo.weight} kg
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Thành phần:</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {productInfo.element}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Ngày sản xuất:</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {formatDate(productInfo.dateOfManufacture)}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Hạn sử dụng:</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {formatDate(productInfo.expirationDate)}
                  </dd>
                </div>
              </dl>
            </div>
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

const SlideImage = ({ images }) => {
  console.log(images);
  const settings = {
    customPaging: function (i) {
      const img = images[i];
      return (
        <li>
          <a>
            <Image
              imgSrc={img}
              isServer
              alt={img}
              className="size-12 object-cover"
            />
          </a>
        </li>
      );
    },
    dots: true,
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <Slider {...settings}>
      {images?.map((image, index) => (
        <div key={index}>
          <Image imgSrc={image} isServer alt={image} />
        </div>
      ))}
    </Slider>
  );
};
