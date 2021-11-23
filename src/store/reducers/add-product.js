const initialState = {
  mainCategoryList: [],
  subCategoryList: [],
  categoryTitleList: [],
  optionsList: [],
  selectedCategorySlug: "",
  selectedCategoryFilterTitle:"",
  addedProduct: [],
  openProductAddFormTab: false,
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
    case "SELECTED_CATEGORY_INFO":
      return {
        ...state,
        selectedCategorySlug: action.payload.slug,
        selectedCategoryFilterTitle: action.payload.filterTitle
      };
    case "ADDED-PRODUCT":
      return {
        ...state,
        addedProduct: action.payload,
      };
    case "OPEN_ADD_PRODUCT_FORM_TAB":
      return {
        ...state,
        openProductAddFormTab: action.payload,
      };

    default:
      return state;
  }
};
