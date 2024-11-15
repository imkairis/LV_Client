import { ImCross } from "react-icons/im";
import Image from "../../components/designLayouts/Image"; // Ensure Image component is correctly imported
import { deleteItemCart, updateQuantity } from "../../services/cart.service";
import { useDispatch } from "react-redux";
import {
  updateQuantityItem,
  deleteItem as deleteItemInCart,
} from "../../redux/orebiSlice";

const ItemCard = ({ item, onCheck, checked }) => {
  const dispatch = useDispatch();
  const deleteItem = (productInfo) => {
    deleteItemCart(productInfo._id)
      .then(() => {
        dispatch(deleteItemInCart(productInfo._id));
      })
      .catch((err) => console.log(err));
  };

  const updateItem = (productInfo, quantity) => {
    console.log(productInfo, quantity);
    if (quantity < 1) return;
    if (quantity > productInfo.total) return;

    updateQuantity(productInfo._id, quantity)
      .then(() => {
        dispatch(
          updateQuantityItem({
            id: productInfo._id,
            quantity,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => deleteItem(item)}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        {/* Use Image component instead of img */}
        <Image
          className="w-32 h-32 object-cover"
          imgSrc={item.images?.[0]} // Optional default image if item.image is not provided
          isServer={true}
          alt={item.name || "Product Image"}
        />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      <div className="col-span-6 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          {parseInt(item.price).toLocaleString("vi-VN")} VND
        </div>

        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={() => updateItem(item, item.quantity - 1)}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item.quantity}</p>
          <span
            onClick={() => updateItem(item, item.quantity + 1)}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>{(item.quantity * item.price).toLocaleString("vi-VN")} VND</p>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <input
            type="checkbox"
            name="buy"
            value={item._id}
            onChange={onCheck}
            checked={checked}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
