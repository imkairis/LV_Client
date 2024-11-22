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

export const formatPrice = price => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};

export const isJSON = str => {
    try {
        return JSON.parse(str) && !!str;
    } catch (e) {
        console.error(e);
        return false;
    }
};
