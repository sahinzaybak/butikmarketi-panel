const initialState = {
	authInfo:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_INFO":
      return{
        ...state,
        authInfo: action.payload,
      }
    default:
		
      return state;
  }
}