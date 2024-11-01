import { instanceAxios } from "../constants/instanceAxios";

export const getAllProducts = async (params = {}) => {
    const query = new URLSearchParams(params);
    console.log(query);

    const url =
        query.size !== 0 ? `/products?${query.toString()}` : "/products";
    return instanceAxios.get(url).then(res => res.data);
};

export const getProductById = async id => {
    return instanceAxios.get(`/products${id}`);
};
