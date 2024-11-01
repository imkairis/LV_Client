import { instanceAxios } from "../constants/instanceAxios";

export const getAllProducts = async (params = {}) => {
    const query = new URLSearchParams(params);
    const url =
        query.size !== 0 ? `/products?${query.toString()}` : "/products";
    return instanceAxios.get(url).then(res => res.data);
};

export const getProductById = async id => {
    return instanceAxios.get(`/products/${id}`).then(res => res.data);
};

export const getAllProductTypes = async queries => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/types?${params}`).then(res => res.data);
};

export const getAllAges = async queries => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/ages?${params}`).then(res => res.data);
};

export const getAllTargets = async queries => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/targets?${params}`).then(res => res.data);
};
