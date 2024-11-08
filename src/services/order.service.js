import { instanceAxios } from "../constants/instanceAxios";

/**
 *
 * @param {Object} order {
 * productOrder, address, deliveryStatus = "pending", payment = "cod", priceShipping = 0, }
 * @returns promise
 */
export const createOrder = async order => {
    return instanceAxios.post(`/orders`, order).then(res => res.data);
};
