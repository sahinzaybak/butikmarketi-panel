import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "../assets/scss/product-operations.scss";
import "../assets/scss/atoms/accordion.scss";
import "../assets/scss/atoms/radio-checkbox.scss";
import { IsAddedProduct } from '../helpers/helpers'

//Components
import ProductArea from './product-operations/product-area'
import ModalAdd from './product-operations/product-add/modals/modal-add'
import ModalUpdate from './product-operations/product-update/modal-update'
import ModalAnalysis from './product-operations/product-analysis/modal-analysis'

const ProductOperations = () => {
  const [preview, setPreview] = useState(false);
  const [previewModalUpdate, setPreviewModalUpdate] = useState(false);
  const [previewModalAnalysis, setPreviewModalAnalysis] = useState(false);
  const [destroyForm, setDestroyForm] = useState(false);
  const [selectedProductInfo, setSelectedProductInfo] = useState()
  const [selectedProductCoverImage, setSelectedProductCoverImage] = useState()
  const [selectedProductTitle, setSelectedProductTitle] = useState()

  let isAddedProduct = IsAddedProduct() //yeni ürün eklendiğinde true yada false.
  useEffect(() => {
    if (isAddedProduct) { //ürün eklendiğinda yada güncellendiğinde formları kapat.
      setPreview(false)
      setDestroyForm(true)
      setPreviewModalUpdate(false)
    }
  }, [isAddedProduct]);

  return (
    <div className="product-operation">
      <ProductArea
        onClickOpenModal={() => { setPreview(true) }}
        onClickOpenModalUpdate={(selectedProduct) => {
          setPreviewModalUpdate(true)
          setSelectedProductInfo(selectedProduct)
        }}
        onClickOpenModalAnalysis={(productCoverImage,productTitle) => { 
          setPreviewModalAnalysis(true) 
          setSelectedProductCoverImage(productCoverImage)
          setSelectedProductTitle(productTitle)
        }}
      />

      {/* ürün ekle modal */}
      <ModalAdd
        destroyForm={destroyForm}
        preview={preview}
        onCancel={() => { setPreview(false) }} />

      {/*ürün düzenle modal*/}
      <ModalUpdate
        preview={previewModalUpdate}
        selectedProductInfo={selectedProductInfo}
        onCancel={() => { setPreviewModalUpdate(false) }} />

      {/* ürün analiz modal */}
      <ModalAnalysis
        preview={previewModalAnalysis}
        selectedProductCoverImage={selectedProductCoverImage}
        selectedProductTitle={selectedProductTitle}
        onCancel={() => { setPreviewModalAnalysis(false) }} />
    </div>
  );
};

export default ProductOperations;
