import { useDispatch } from "react-redux";
import { addToCart } from "../redux/orebiSlice";
import { usePromiseWithToast } from "./usePromiseWithToast";
import { addToCartService } from "../services/cart.service";

export const useAddToCart = () => {
    const dispatch = useDispatch();
    const { active } = usePromiseWithToast({
        callback: product => addToCartService(product._id),
        successMessage: "Đã thêm sản phẩm vào giỏ hàng",
        errorMessage: "Thêm sản phẩm thất bại",
        loadingMessage: "Đang thêm vào giỏ hàng.",
        successCallback: (_, data) => {
            dispatch(
                addToCart({
                    ...data,
                    quantity: 1,
                })
            );
        },
    });

    return {
        handleAddToCart: active,
    };
};
