import axios from "axios";

export const fetchAnalysisValues = () => {
  return async (dispatch) => {
    await axios.get(`http://localhost:5000/api/butik/homestats`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("butik_token")}`
      },
    })
      .then((value) => {
        dispatch({
          type: "ANALYSIS_VALUES",
          payload: value.data
        });
      });
  };
};
