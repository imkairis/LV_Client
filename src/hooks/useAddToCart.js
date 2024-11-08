import { useDispatch } from "react-redux";
import { addToCart } from "../redux/orebiSlice";
import { usePromiseWithToast } from "./usePromiseWithToast";
import { addToCartService } from "../services/cart.service";

export const useAddToCart = () => {
    const dispatch = useDispatch();
    const { active } = usePromiseWithToast({
        callback: product => addToCartService(product._id),
        successMessage: "Product added to cart",
        errorMessage: "Failed to add product to cart",
        loadingMessage: "Adding product to cart...",
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
