import axios from "axios";

export const fetchButikProducts = () => {
  return async (dispatch) => {
    await axios.get(`http://localhost:5000/api/butik/products`, {
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
