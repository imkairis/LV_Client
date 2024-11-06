import { instanceAxios } from "../constants/instanceAxios";

export const createObjectAddress = ({ name, phone, address }) => {
    return {
        _id: new Date().toString(),
        name,
        phone,
        address,
    };
};

export const createAddress = async ({ name, phone, address, id, userId }) => {
    if (!id) {
        return instanceAxios.put(`/accounts/${userId}`, {
            address: JSON.stringify(
                createObjectAddress({ name, phone, address })
            ),
        });
    }
    return instanceAxios.put(`/accounts/${userId}`, {
        address: JSON.stringify({
            _id: new Date().toString(),
            name,
            phone,
            address,
        }),
    });
};
