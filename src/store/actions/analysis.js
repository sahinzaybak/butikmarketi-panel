import axios from "axios";

export const fetchAnalysisValues = (butik_email) => {
  return async (dispatch) => {
    await axios.get(`http://localhost:1337/api/butiks?filters[butik_email]=${butik_email}&populate=products,clicks,products.clicks,products.whatsappClicks,products.instagramClicks`)
      .then((value) => {
        dispatch({
          type: "ANALYSIS_VALUES",
          payload: value.data.data[0].attributes
        });
      });
  };
};
