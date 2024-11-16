import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAddToCart } from "../../../hooks/useAddToCart";
import Image from "../../designLayouts/Image";

const Product = (props) => {
  const { handleAddToCart: actionAdd } = useAddToCart();
  const _id = props._id;
  const navigate = useNavigate();

  const handleProductDetails = () => {
    navigate(`/product/${_id}`, {
      state: { item: props },
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của sự kiện (chẳng hạn như tải lại trang)
    e.stopPropagation(); // Ngừng sự kiện bubble lên các phần tử cha
    actionAdd(props); // Thực hiện chức năng thêm sản phẩm vào giỏ hàng
  };

  return (
    <a
      href="#"
      className="group relative block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={handleProductDetails}
    >
      {/* Wishlist Button */}

      <div>
        <Image
          className="w-full h-full object-cover rounded-t-lg"
          imgSrc={props?.images?.[0] || props.img}
          alt="Product Image"
          isServer={!props?.color}
        />
      </div>

      {/* Product Info */}
      <div className="relative border border-gray-100 bg-white p-6 rounded-b-lg">
        <p className="text-gray-700">
          {parseInt(props?.price).toLocaleString("vi-VN")} VND
          {props?.originalPrice && (
            <span className="text-gray-400 line-through">
              {parseInt(props.originalPrice).toLocaleString("vi-VN")} VND
            </span>
          )}
        </p>

        {/* Giới hạn ký tự của productName */}
        <h3 className="mt-1.5 text-lg font-medium text-gray-900 line-clamp-2">
          {props?.name || "Product Name"}
        </h3>

        {/* Add to Cart / Buy Now Buttons */}
        <form className="mt-4 flex gap-4">
          {props.quantity > 0 ? (
            <button
              onClick={handleAddToCart} // Đảm bảo gọi hàm mà không làm trang tải lại
              className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
            >
              Thêm vào giỏ
            </button>
          ) : (
            <button
              disabled
              className="block w-full rounded bg-gray-400 px-4 py-3 text-sm font-medium text-gray-900 cursor-not-allowed"
            >
              Hết hàng
            </button>
          )}

          <button
            type="button"
            className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
          >
            Xem
          </button>
        </form>
      </div>
    </a>
  );
};

export default Product;
