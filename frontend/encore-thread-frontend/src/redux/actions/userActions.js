export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const setCartId = (cartId) => ({
  type: 'SET_CART_ID',
  payload: cartId,
});
