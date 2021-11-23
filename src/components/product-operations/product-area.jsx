import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons';
import ProductListContentLoader from '../content-loader/product-list-loader';

//Actions
import { fetchButikProducts } from '../../store/actions/butik'

let butikProducts
const ProductArea = ({ onClickOpenModal, onClickOpenModalUpdate }) => {
  const dispatch = useDispatch()
  butikProducts = useSelector(state => state.butik.butikProducts)
  useEffect(() => {
    dispatch(fetchButikProducts())
  }, []);

  return (
    <div className="add-product">
      <div className="d-flex flex-wrap flex-column">
        <div className="add-product__box d-flex" onClick={() => onClickOpenModal()}>
          <PlusOutlined className="add-product__plus-icon" />
          <h6 className="ml-2">Ürün Ekle</h6>
        </div>

        <div className="product">
          {butikProducts == "" ? <ProductListContentLoader />
            :
            <>
              {butikProducts.products.map((product, index) => (
                <div className="product-item" key={index} onClick={() => onClickOpenModalUpdate(product)}>
                  <div className="product-image mb-2">
                    <img src={product.image} alt="" />
                  </div>
                  <h4 className="product-item__title">{product.title}</h4>
                  <p className="product-item__price">{product.price} ₺</p>
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
