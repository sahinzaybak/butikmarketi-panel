import axios from "axios";

export const login = (form_values) => (dispatch) => {
    axios.post("http://localhost:3001/butik/login", {
        username: form_values.user_name,
        password: form_values.password,
      }).then((response) =>
        dispatch({
          type: "AUTH_INFO",
          payload: response.data,
        })
      ).catch((error) => {
        if(error.response.status == 401){
          dispatch({
            type: "AUTH_INFO",
            payload:error.response.data
          })
        }
    })
};
