const initialState = {
  orderList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ORDER_LIST":
      return {
        ...state,
        orderList: action.payload,
      };

    default:
      return state;
  }
};
