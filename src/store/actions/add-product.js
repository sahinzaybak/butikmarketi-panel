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
      .post("http://localhost:3001/product", {
        title: selectedValues.title,
        description: selectedValues.desc,
        price: selectedValues.price,
        link: selectedValues.link,
        image: selectedValues.image,
        butik: "yesybutik",
        butik_whatsapp: "yesybutik",
        butik_image: "https://webizade.com/bm/img/butik-8.jpg",
        category: selectedValues.category,
        gender: selectedValues.gender,
        size: selectedValues.size,
        images: selectedValues.images,
        comments: [],
        colors: selectedValues.colors,
      })
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
