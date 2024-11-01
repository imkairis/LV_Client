export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

export const formatDate = (date, opt = {}) => {
    return new Date(date).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...opt,
    });
};
