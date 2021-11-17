const initialState = {
  mainCategoryList: [],
  subCategoryList: [],
  categoryTitleList: [],
  optionsList: [],
  selectedCategorySlug: "",
  addedProduct: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MAIN_CATEGORY_LIST":
      return {
        ...state,
        mainCategoryList: action.payload,
      };
    case "FETCH_SUB_CATEGORY_LIST":
      return {
        ...state,
        subCategoryList: action.payload,
      };
    case "FETCH_CATEGORY_TITLE_LIST":
      return {
        ...state,
        categoryTitleList: action.payload,
      };
    case "FETCH_OPTIONS_LIST":
      return {
        ...state,
        optionsList: action.payload,
      };
    case "FETCH_SELECTED_CATEGORY_SLUG":
      return {
        ...state,
        selectedCategorySlug: action.payload,
      };
    case "ADDED-PRODUCT":
      return {
        ...state,
        addedProduct: action.payload,
      };

    default:
      return state;
  }
};
