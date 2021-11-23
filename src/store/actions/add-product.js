import axios from "axios";

export const fetchMainCategory = () => {
  return async (dispatch) => {
    await axios
      .get("http://localhost:3001/categories/filter/choose")
      .then((value) => {
        dispatch({
          type: "FETCH_MAIN_CATEGORY_LIST",
          payload: value.data,
        });
      });
  };
};

export const fetchSubCategory = (mainCategoryTitle) => {
  return async (dispatch) => {
    await axios
      .get(
        `http://localhost:3001/categories/filter/choose/${mainCategoryTitle}`
      )
      .then((value) => {
        dispatch({
          type: "FETCH_SUB_CATEGORY_LIST",
          payload: value.data,
        });
      });
  };
};

export const fetchCategoryTitleList = (mainCategoryTitle, subCategoryTitle) => {
  return async (dispatch) => {
    await axios
      .get(
        `http://localhost:3001/categories/filter/choose/${mainCategoryTitle}/${subCategoryTitle}`
      )
      .then((value) => {
        dispatch({
          type: "FETCH_CATEGORY_TITLE_LIST",
          payload: value.data,
        });
      });
  };
};

export const fetchFilterOptions = (categoryTitle) => {
  return async (dispatch) => {
    await axios
      .get(`http://localhost:3001/filter/${categoryTitle}`)
      .then((value) => {
        dispatch({
          type: "FETCH_OPTIONS_LIST",
          payload: value.data.filter[0],
        });
      });
  };
};

export const fetchAddProduct = (selectedValues) => {
  return async (dispatch) => {
    await axios
      .post(
        "http://localhost:3001/product",
        {
          title: selectedValues.title,
          description: selectedValues.desc,
          price: selectedValues.price,
          link: selectedValues.link,
          image: selectedValues.image,
          category: selectedValues.category,
          filter_title: selectedValues.filterTitle,
          gender: selectedValues.gender,
          size: selectedValues.size,
          images: selectedValues.images,
          comments: [],
          colors: selectedValues.colors,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("butik_token")}`,
          },
        }
      )
      .then((value) => {
        if (value.status == 200) {
          dispatch({
            type: "ADDED-PRODUCT",
            payload: value,
          });
        }
      });
  };
};

export const fetchUpdateProduct = (selectedValues, productId) => {
  return async (dispatch) => {
    await axios
      .put(
        `http://localhost:3001/product/update/${productId}`,
        {
          title: selectedValues.title,
          description: selectedValues.desc,
          price: selectedValues.price,
          link: selectedValues.link,
          image: selectedValues.image,
          category: selectedValues.category,
          gender: selectedValues.gender,
          size: selectedValues.size,
          images: selectedValues.images,
          comments: [],
          colors: selectedValues.colors,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("butik_token")}`,
          },
        }
      )
      .then((value) => {
        if (value.status == 200) {
          dispatch({
            type: "ADDED-PRODUCT",
            payload: value,
          });
        }
      });
  };
};
