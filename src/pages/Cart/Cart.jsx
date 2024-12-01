import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { initCart, resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { clearCart } from "../../services/cart.service";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [prodBuy, setProdBuy] = useState([]);
  const [shippingCharge] = useState(30000);
  const nav = useNavigate();

  // Cập nhật lại giá khi sản phẩm trong giỏ hay sản phẩm đã chọn có thay đổi
  const totalAmt = useMemo(() => {
    if (prodBuy.length === 0) return 0;
    return products
      .filter((item) => prodBuy.some((id) => id === item._id))
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [prodBuy, products]);

  useEffect(() => {
    const fetchCartItem = () => {
      fetch(`${import.meta.env.VITE_HOST}/carts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const items = data.data.items.map((item) => {
            return {
              ...item.product,
              quantity: item.quantity,
            };
          });
          dispatch(initCart(items));
          // Luu ds id san pham da chọn
          setProdBuy(items.map((item) => item._id));
        })
        .catch((err) => console.log(err));
    };
    fetchCartItem();
  }, [dispatch]);

  const handleCheckProduct = (e) => {
    const selectedProduct = products.find(
      (item) => item._id === e.target.value
    );

    if (e.target.checked) {
      // Thêm sản phẩm vào danh sách đã chọn và cập nhật tổng
      setProdBuy((prevProdBuy) => [...prevProdBuy, selectedProduct]);
    } else {
      // Xóa sản phẩm khỏi danh sách đã chọn và cập nhật tổng
      setProdBuy((prevProdBuy) =>
        prevProdBuy.filter((id) => id !== e.target.value)
      );
    }
  };
  const handleResetCart = () => {
    clearCart()
      .then(() => {
        dispatch(resetCart()); // Làm trống giỏ hàng trong Redux store
        setProdBuy([]); // Reset lại các sản phẩm đã chọn
      })
      .catch((err) => console.log(err));
  };

  const handleNavigateCheckout = () => {
    if (prodBuy.length === 0) {
      toast.error("Vui lòng chọn sản phẩm muốn mua!");
      return;
    }

    const proToBuy = products.filter((item) =>
      prodBuy.some((id) => id === item._id)
    );

    nav("/checkout", {
      state: {
        items: proToBuy,
      },
    });
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products?.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Sản phẩm</h2>
            <h2>Giá</h2>
            <h2>Số lượng</h2>
            <h2>Tổng cộng</h2>
          </div>
          <div className="mt-5">
            <AnimatePresence>
              {products.map((item) => (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 900,
                    damping: 40,
                    duration: 0.4,
                  }}
                  key={item?._id}
                >
                  <ItemCard
                    item={item}
                    checked={item._id === prodBuy.find((id) => id === item._id)}
                    onCheck={handleCheckProduct}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={handleResetCart}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Xóa tất cả
          </motion.button>

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">
                Tổng giỏ hàng
              </h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Tổng cộng sản phẩm
                  <span className="font-semibold tracking-wide font-titleFont">
                    {totalAmt.toLocaleString("vi-VN")} VND
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Phí vận chuyển
                  <span className="font-semibold tracking-wide font-titleFont">
                    {shippingCharge.toLocaleString("vi-VN")} VND
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Tổng cộng
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    {(totalAmt + shippingCharge).toLocaleString("vi-VN")} VND
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                  onClick={handleNavigateCheckout}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
