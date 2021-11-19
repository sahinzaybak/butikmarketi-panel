import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons';

//Actions
import { fetchButikProducts } from '../../store/actions/butik'

let butikProducts
const AddProductCard = ({ onClickOpenModal }) => {
  const dispatch = useDispatch()
  butikProducts = useSelector(state => state.butik.butikProducts)
  useEffect(() => {
    dispatch(fetchButikProducts())
  }, []);

  return (
    <div className="add-product">
      <div className="d-flex flex-wrap">
        <div className="add-product__box d-flex" onClick={() => onClickOpenModal()}>
          <PlusOutlined className="add-product__plus-icon" />
          <h6 className="ml-2">Ürün Ekle</h6>
        </div>
        <div className="product">
          {butikProducts != "" && butikProducts.products.map((product, index) => (
            <div className="product-item">
              <div className="product-image">
                <img src={product.image} alt="" />
              </div>
              <h4>{product.title}</h4>
              <p>{product.price} ₺</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProductCard;
