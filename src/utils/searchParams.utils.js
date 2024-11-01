export const toObjectSearchParams = searchParams => {
    const searchParamsObj = {};
    for (const [key, value] of searchParams.entries()) {
        searchParamsObj[key] = value;
    }
    return searchParamsObj;
};
