import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { getProductById } from "../../services";
import Image from "../../components/designLayouts/Image";
import { formatDate } from "../../utils/utils";
import ImgCD from "../../assets/images/BottomProduct.png";
import ImgP from "../../assets/images/paw.png";

const ProductDetails = () => {
  const location = useLocation();
  const { _id } = useParams();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    if (location.state?.item && location.state?.item?.img) {
      setProductInfo(location.state.item);
    } else {
      getProductById(_id, {
        populate: "type,ageGroup,targetAudience",
      }).then((res) => setProductInfo(res.data));
    }
    setPrevLocation(location.pathname);
  }, [_id, location.pathname, location.state?.item]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-8">
        {" "}
        {/* Đã thay px-4 thành px-8 */}
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 h-full -mt-5 xl:-mt-8  bg-gray-100 p-4">
          <div className="w-full aspect-[1/1] overflow-hidden">
            <Image
              className="w-full h-full object-cover object-center"
              imgSrc={productInfo?.img || productInfo?.images?.[0]}
              isServer={productInfo?.images}
              alt={productInfo.img}
            />
          </div>
          <div className="h-full w-full xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
        {/* <div>
          <Image imgSrc={ImgP} />
        </div> */}
        {/* Tách User Manual vào một section riêng biệt */}
        <div>
          <p></p>
        </div>
        <div className="mt-10 space-y-4">
          <h1 className="font-bold text-[26px] mt-6">Thông tin sản phẩm:</h1>

          <p className="font-medium text-lg">
            <span className="font-normal">Mô tả sản phẩm:</span>{" "}
            {productInfo.description}
          </p>
          <p className="font-medium text-lg">
            <span className="font-normal">Hướng dẫn sử dụng:</span>{" "}
            {productInfo?.userManual || "Không có hướng dẫn sử dụng"}
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
        <div className="mt-6">
          <Image imgSrc={ImgCD} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
