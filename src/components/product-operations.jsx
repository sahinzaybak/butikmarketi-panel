import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "../assets/scss/add-product.scss";
import { IsAddedProduct } from '../helpers/helpers'

//Components
import ProductArea from './product-operations/product-area'
import ModalAdd from './product-operations/product-add/modals/modal-add'
import ModalUpdate from './product-operations/product-update/modals/modal-update'

const ProductOperations = () => {
  const [preview, setPreview] = useState(false);
  const [previewModalUpdate, setPreviewModalUpdate] = useState(false);
  const [destroyForm, setDestroyForm] = useState(false);
  const [selectedProductInfo, setSelectedProductInfo] = useState()

  let isAddedProduct = IsAddedProduct() //yeni ürün eklendiğinde true yada false.
  useEffect(() => {
    if (isAddedProduct) { //ürün eklendiğinda yada güncellendiğinde formları kapat.
      setPreview(false)
      setDestroyForm(true)
      setPreviewModalUpdate(false)
    }
  }, [isAddedProduct]);

  return (
    <div className="add-product">
      <ProductArea // ürün ekleme 
        onClickOpenModal={() => { setPreview(true) }}
        onClickOpenModalUpdate={(selectedProduct) => {
          setPreviewModalUpdate(true)
          setSelectedProductInfo(selectedProduct)
        }} />
      <ModalAdd // ürün ekle modal
        destroyForm={destroyForm}
        preview={preview}
        onCancel={() => { setPreview(false) }} />
      <ModalUpdate // ürün düzenle modal
        preview={previewModalUpdate}
        selectedProductInfo={selectedProductInfo}
        onCancel={() => {setPreviewModalUpdate(false)}} />
    </div>
  );
};

export default ProductOperations;
