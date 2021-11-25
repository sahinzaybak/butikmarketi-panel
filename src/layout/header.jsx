import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../assets/scss/layout/header.scss'
import addProduct from '../assets/images/add-product.png'
import products from '../assets/images/products.png'
import orders from '../assets/images/orders.png'
import analystic from '../assets/images/analystic.png'
import arrowRight from '../assets/images/arrow-right.png'

let butikInfo
const Header = () => {
  const dispatch = useDispatch()
  butikInfo = useSelector(state => state.butik.butikInfo)
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("butik_info")) != null) { //localStorge basket bilgilerini al ve basketList state'ni doldur.
      dispatch({ type: "BUTIK_INFO", payload: JSON.parse(localStorage.getItem("butik_info")) });
    }
  }, []);

  return (
    <>
      {butikInfo &&
        <div className="header">
          <div className="d-flex flex-column">
            <div className="header-top">
              <div className="header-top__logo mb-2">
                <img src={butikInfo.butik_image} alt="" />
              </div>
              <h2>{butikInfo.butik_name}</h2>
            </div>
            <div className="header-menu">
              <div className="header-menu__item">
                <div className="header-menu__icon">
                  <img src={analystic} alt="" />
                </div>
                <div className="header-menu__text">
                  <h4>Genel Analiz</h4>
                  <img src={arrowRight} alt="" />
                </div>
              </div>
              <div className="header-menu__item">
                <div className="header-menu__icon">
                  <img src={products} alt="" />
                </div>
                <div className="header-menu__text">
                  <h4>Ürün İşlemleri</h4>
                  <img src={arrowRight} alt="" />
                </div>
              </div>
              <div className="header-menu__item">
                <div className="header-menu__icon">
                  <img src={orders} alt="" />
                </div>
                <div className="header-menu__text">
                  <h4>Siparişlerim</h4>
                  <img src={arrowRight} alt="" />
                </div>
              </div>
              <div className="header-menu__item">
                <div className="header-menu__icon">
                  <img src={products} alt="" />
                </div>
                <div className="header-menu__text">
                  <h4>Ayarlar</h4>
                  <img src={arrowRight} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )

}

export default Header;
