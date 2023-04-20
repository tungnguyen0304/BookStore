export const increaseProduct = (product) => {
    return {
        type: "INCREASE",
        payload: product,
    };
};
export const decreaseProduct = (product) => {
    return {
        type: "DECREASE",
        payload: product,
    };
};
export const deleteProduct = (product) => {
    return {
        type: "DELETE",
        payload: product,
    };
};