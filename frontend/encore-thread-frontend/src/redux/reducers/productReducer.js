const initialState = {
    products: [],
  };
  
  function productReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return {
          ...state,
          products: action.payload,
        };
      case 'CLEAR_PRODUCTS':
        return {
          ...state,
          products: [],
        };
      default:
        return state;
    }
  }
  
  export default productReducer;
  