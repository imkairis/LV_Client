import { instanceAxios } from "../constants/instanceAxios";

export const getCart = async () => {};

export const addToCartService = async productId => {
    return instanceAxios.post(`/carts`, { product: productId, quantity: 1 });
};

export const updateQuantity = async (id, quantity) => {
    return instanceAxios.put(`/carts`, { product: id, quantity });
};

export const deleteItemCart = async id => {
    return instanceAxios.delete(`/carts`, {
        data: { product: id },
    });
};

export const clearCart = async () => {
    return instanceAxios.delete(`/carts/all`);
};
