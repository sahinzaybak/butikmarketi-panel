import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Radio, Space, } from "antd";

//actions
import {fetchSubCategory, fetchCategoryTitleList, fetchFilterOptions } from "../../../store/actions/add-product";

const PanelCategory = ({ mainCategoryList, subCategoryList, categoryTitleList }) => {
  const dispatch = useDispatch();
  const [mainCategoryValue, setMainCategoryValue] = useState(false);
  const [subCategoryValue, setSubCategoryValue] = useState(false);
  const [categoryValue, setCategoryValue] = useState(false);

  function selectedMainCategory(e) { // Ana Kategori Seçimi (Kadın, Erkek, Çocuk&Bebek, Ev&Yaşam ..vs)
    const mainCatValue = e.target.value
    setMainCategoryValue(mainCatValue)
    dispatch(fetchSubCategory(mainCatValue)); //Alt kategorileri getir.
  };

  function selectedSubCategory(e) { // Alt Kategori Seçimi (Giyim, Ayakkabı, Çanta&Aksesuar ..vs)
    const subCatValue = e.target.value
    setSubCategoryValue(subCatValue)
    dispatch(fetchCategoryTitleList(mainCategoryValue, subCatValue)); //kategorileri getir.
  };

  function selectedCategory(e) { // Kategori Seçimi (T-shirt, Pantolon, Etek ..vs)
    const catValue = e.target.defaultValue;
    setCategoryValue(catValue)
    dispatch(fetchFilterOptions(catValue)); //kategorileri getir.
  };

  return (
    <div className="add-product__category">
      <div className="row">
        <div className="col-md-4">
          <div className="add-product__modal-item">
            <h6>Ana Kategori Seçin</h6>
            <Radio.Group onChange={selectedMainCategory} value={mainCategoryValue}>
              <Space direction="vertical">
                {mainCategoryList != "" && mainCategoryList.categories.map((mainCategory, index) => (
                  <>
                    {mainCategory.slug.includes("ayakkabi-canta") || mainCategory.slug.includes("saat-aksesuar") ? ""
                      :
                      <Radio value={mainCategory.slug} defaultValue={mainCategory.title} key={index}>{mainCategory.title}</Radio>
                    }
                  </>
                ))}
                <p>(Diğer kategorilere otomatik atama yapılır.)</p>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-4">
          <div className="add-product__modal-item">
            <h6>Alt Kategori Seçin</h6>
            <Radio.Group onChange={selectedSubCategory} value={subCategoryValue}>
              <Space direction="vertical">
                {subCategoryList != "" && subCategoryList.categories.map((subCategory, index) => (
                  <Radio value={subCategory.slug} key={index}>{subCategory.title}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-4">
          <div className="add-product__modal-item last">
            <h6>Kategori Seçin</h6>
            <Radio.Group onChange={selectedCategory} defaultValue={categoryValue}>
              <Space direction="vertical">
                {categoryTitleList != "" && categoryTitleList.categories.map((category, index) => (
                  <Radio value={category.title} defaultValue={category.filter_title} key={index}>{category.title}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelCategory;
