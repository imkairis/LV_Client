import { instanceAxios } from "../constants/instanceAxios";

export const getAllProducts = async () => {
    return instanceAxios.get("/products").then(response => response.data);
};
