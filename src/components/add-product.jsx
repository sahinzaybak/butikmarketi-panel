import React, { useState } from "react";
import "antd/dist/antd.css";
import "../assets/scss/add-product.scss";

//Components
import AddProductCard from './add-product/add-product-card'
import Modal from './add-product/modal'

const AddProduct = () => {
  const [preview, setPreview] = useState(false);
  return (
    <div className="add-product">
      <AddProductCard onClickOpenModal={() => { setPreview(true) }} />
      <Modal preview={preview} onCancel={() => { setPreview(false) }} />
    </div>
  );
};

export default AddProduct;
