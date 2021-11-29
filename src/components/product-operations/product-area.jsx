import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons';
import ProductListContentLoader from '../content-loader/product-list-loader';

//Actions
import { fetchButikProducts } from '../../store/actions/butik'

let butikProducts
const ProductArea = ({ onClickOpenModal, onClickOpenModalUpdate, onClickOpenModalAnalysis }) => {
  const dispatch = useDispatch()
  butikProducts = useSelector(state => state.butik.butikProducts)
  useEffect(() => {
    dispatch(fetchButikProducts())
  }, []);

  return (
    <div className="add-product">
      <div className="d-flex flex-wrap flex-column">
        <div className="add-product__header d-flex align-items-center justify-content-between mb-4">
          <h4>Ürünleriniz (20)</h4>
          <div className="add-product__box d-flex mb-2" onClick={() => onClickOpenModal()}>
            <PlusOutlined className="add-product__plus-icon" />
            <h6 className="ml-2">Ürün Ekle</h6>
          </div>

        </div>

        <div className="product">
          {butikProducts == "" ? <ProductListContentLoader />
            :
            <>
              {butikProducts.products.map((product, index) => (
                <div className="product-item" key={index}>
                  <div className="product-item__info" onClick={() => onClickOpenModalUpdate(product)}>
                    <div className="product-image mb-2">
                      <img src={product.image} alt="" />
                    </div>
                    <h4 className="product-item__title">{product.title}</h4>
                    <p className="product-item__price">{product.price} ₺</p>
                  </div>
                  <p className="product-item__update mt-2 mb-2" onClick={() => onClickOpenModalUpdate(product)}>Düzenle</p>
                  <p className="product-item__analysis" onClick={() => onClickOpenModalAnalysis(product.image, product.title)}>Analiz Et</p>
                </div>
              ))}
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductArea;
