import toast from "react-hot-toast";

export const usePromiseWithToast = ({
    callback,
    successMessage = "",
    errorMessage = "",
    loadingMessage = "",
    successCallback = () => {},
    errorCallback = () => {},
}) => {
    const active = async (...data) => {
        const toastId = toast.loading(loadingMessage);
        callback(...data)
            .then(res => {
                toast.success(successMessage);
                successCallback(res, ...data);
            })
            .catch(err => {
                console.error(err);
                toast.error(errorMessage);
                errorCallback(err, ...data);
            })
            .finally(() => {
                toast.dismiss(toastId);
            });
    };

    return {
        active,
    };
};
