import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "../assets/scss/add-product.scss";
import { IsAddedProduct } from '../helpers/helpers'
//Components
import AddProductCard from './add-product/add-product-card'
import Modal from './add-product/modal'

const AddProduct = () => {
  const [preview, setPreview] = useState(false);
  const [destroyForm, setDestroyForm] = useState(false);

  let isAddedProduct = IsAddedProduct() //yeni ürün eklendiğinde
  useEffect(() => {
    if (isAddedProduct) {
      setPreview(false)
      setDestroyForm(true)
    }
  }, [isAddedProduct]);

  return (
    <div className="add-product">
      <AddProductCard onClickOpenModal={() => { setPreview(true) }} />
      <Modal destroyForm={destroyForm} preview={preview} onCancel={() => { setPreview(false) }} />
    </div>
  );
};

export default AddProduct;
