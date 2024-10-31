import { instanceAxios } from "../constants/instanceAxios";

export const getAllProducts = async (params = {}) => {
    const query = new URLSearchParams(params);
    return instanceAxios.get(`/products?${query}`).then(res => res.data);
};

export const getProductById = async (id) => {
    return instanceAxios.get(`/products${id}`);
}