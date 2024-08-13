export const convertSearchParamsToObj = (searchParams: URLSearchParams) => {
    const obj = {};
    searchParams.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}

