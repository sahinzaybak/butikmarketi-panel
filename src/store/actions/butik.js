import axios from "axios";

export const fetchButikProducts = (butik_id) => {
  return async (dispatch) => {
    await axios.get(`http://localhost:3001/butik/products/butikProducts`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("butik_token")}`
      },
    })
      .then((value) => {
        dispatch({
          type: "FETCH_BUTIK_PRODUCTS",
          payload: value.data.data
        });
      });
  };
};
