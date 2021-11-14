import axios from "axios";
export const login = (form_values) => (dispatch) => {
  try {axios.post("http://localhost:3001/butik/login", {
        instagram_name: form_values.instagram_user_name,
        password: form_values.password,
      })
      .then((response) =>
        dispatch({
          type: "AUTH_INFO",
          payload: response.data.data,
        })
      );
  } catch (err) {
    console.log(err);
  }
};
