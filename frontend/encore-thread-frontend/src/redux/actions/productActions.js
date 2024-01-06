export const setProductsAction = (products) => ({
  type: "SET_PRODUCTS",
  payload: products,
});

export const clearProductsAction = () => ({
  type: "CLEAR_PRODUCTS",
});
