import axios from "axios";

export const login = (form_values) => (dispatch) => {
  axios.post("http://localhost:1337/api/auth/local", {
      identifier: form_values.user_name,
      password: form_values.password,
    })
    .then((response) =>
      dispatch({
        type: "AUTH_INFO",
        payload: response,
      })
    )
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 500) {
        dispatch({
          type: "AUTH_INFO",
          payload: error.response.data,
        });
      }
    });

  axios.get(`http://localhost:1337/api/butiks?filters[butik_email]=${form_values.user_name}`).then((value) => {
      localStorage.setItem(
        "butik_info",
        JSON.stringify({
          butik_id: value.data.data[0].id,
          butik_name: value.data.data[0].attributes.butik_name,
          butik_email: value.data.data[0].attributes.butik_email,
          butik_image: value.data.data[0].attributes.butik_image,
        })
      );
    });
    
};
