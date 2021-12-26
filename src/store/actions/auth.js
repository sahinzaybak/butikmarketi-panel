import axios from "axios";

export const login = (form_values) => (dispatch) => {
    axios.post("http://localhost:5000/api/butik/login", {
        email: form_values.user_name,
        password: form_values.password,
        role:"Butik"
      }).then((response) =>
        dispatch({
          type: "AUTH_INFO",
          payload: response
        })
      ).catch((error) => {
        if(error.response.status == 401 || error.response.status == 500 ){
          dispatch({
            type: "AUTH_INFO",
            payload:error.response.data
          })
        }
    })
};
