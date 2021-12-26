import axios from "axios";
import { categories } from "../../api/categories";
import { filterOptions } from "../../api/filterOptions";

let categoriesArray = []
let mainCategories = []
let subCategories = []
let filterOptionsArray
export const fetchMainCategory = () => { //Ürün Ekle - Sol taraf kategoriler
  categoriesArray.push(categories.filter((x) => x.title))
  return async (dispatch) => {
    dispatch({
      type: "FETCH_MAIN_CATEGORY_LIST",
      payload: categoriesArray
    });
  };
};

export const fetchSubCategory = (mainCategoryTitle) => { //Ürün Ekle - Orta taraf kategoriler
  mainCategories = categoriesArray[0].filter(x => x.slug == mainCategoryTitle)
  return async (dispatch) => {
    dispatch({
      type: "FETCH_SUB_CATEGORY_LIST",
      payload: mainCategories[0].categories
    });
  };
};

export const fetchCategoryTitleList = (subCategoryTitle) => { //Ürün Ekle - Sağ taraf kategoriler
  subCategories = mainCategories[0].categories.filter(x => x.slug == subCategoryTitle)
  return async (dispatch) => {
    dispatch({
      type: "FETCH_CATEGORY_TITLE_LIST",
      payload: subCategories[0].categories
    });
  }
}

export const fetchFilterOptions = (mainCategoryTitle) => { //mainCategoryTitle=giyim, Filtreleme seçenekleri giyim => x, s, m ..
  filterOptionsArray = filterOptions.filter((x) => x.main_category == mainCategoryTitle)
  return async (dispatch) => {
    dispatch({
      type: "FETCH_OPTIONS_LIST",
      payload: filterOptionsArray[0]
    });
  };
}

export const fetchAddProduct = (selectedValues) => {
  return async (dispatch) => {
    await axios
      .post(
        "http://localhost:5000/product",
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
        `http://localhost:5000/product/update/${productId}`,
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
