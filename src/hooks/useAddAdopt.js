import { useDispatch } from "react-redux";
import { usePromiseWithToast } from "./usePromiseWithToast";
import { createDonation } from "../services/donation.service";

export const useAddAdopt = () => {
    const dispatch = useDispatch();

    const { active } = usePromiseWithToast({
        callback: (donationData) => createDonation(donationData), // gọi đến API để tạo donation
        successMessage: "Thêm thú cưng thành công!",
        errorMessage: "Thêm thú cưng thất bại.",
        loadingMessage: "Đang thêm thú cưng...",
        successCallback: (donationData, data) => {
            // Sau khi tạo thành công donation, dispatch action cập nhật Redux store nếu cần thiết
            dispatch({
                type: "ADD_ADOPT",
                payload: data, // dữ liệu trả về từ server sau khi tạo thành công
            });
        },
    });

    return {
        handleAddAdopt: active, // Trả về hàm `active` để sử dụng trong component
    };
};
