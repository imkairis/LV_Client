import { useDispatch } from "react-redux";
import { usePromiseWithToast } from "./usePromiseWithToast";
import { updateAdopt } from "../services/donation.service";

export const useUpdateAdopt = () => {
    const dispatch = useDispatch();

    const { active } = usePromiseWithToast({
        callback: (...props) => updateAdopt(...props), // gọi đến API để tạo donation
        successMessage: "Cập nhật thú cưng thành công!",
        errorMessage: "Cập nhật thú cưng thất bại.",
        loadingMessage: "Đang cập nhật thú cưng...",
        successCallback: (_, data) => {
            // Sau khi tạo thành công donation, dispatch action cập nhật Redux store nếu cần thiết
            dispatch({
                type: "ADD_ADOPT",
                payload: data, // dữ liệu trả về từ server sau khi tạo thành công
            });
        },
    });

    return {
        handleUpdateAdopt: active, // Trả về hàm `active` để sử dụng trong component
    };
};
