const initialState = {
	analysisValues:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "ANALYSIS_VALUES":
      return{
        ...state,
        analysisValues: action.payload,
      }
    default:
		
      return state;
  }
}