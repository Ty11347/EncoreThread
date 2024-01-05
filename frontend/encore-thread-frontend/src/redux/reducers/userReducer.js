const initialState = {
  user: null,
  cartId: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    case 'SET_CART_ID':
      return {
        ...state,
        cartId: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
