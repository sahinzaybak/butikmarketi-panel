import axios from "axios";
export const fetchOrderList = (buikId) => {
  return (dispatch) => {
    axios.get(`http://localhost:1337/api/orders?populate=products&filters[butikId]=${buikId}`).then((value) => {
      dispatch({
        type: "FETCH_ORDER_LIST",
        payload: value.data.data,
      });
    });
  };
};
