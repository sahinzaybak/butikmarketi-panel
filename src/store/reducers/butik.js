const initialState = {
  butikProducts: [],
  butikInfo: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BUTIK_PRODUCTS":
      return {
        ...state,
        butikProducts: action.payload,
      };

    case "BUTIK_INFO":
      return {
        ...state,
        butikInfo: JSON.parse(localStorage.getItem("butik_info"))
      };
    default:
      return state;
  }
};
