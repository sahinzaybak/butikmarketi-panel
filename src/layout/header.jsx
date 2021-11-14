import React, { useState } from 'react'
import '../assets/scss/layout/header.scss'
import addProduct from '../assets/images/add-product.png'
import products from '../assets/images/products.png'
import orders from '../assets/images/orders.png'
import analystic from '../assets/images/analystic.png'
import arrowRight from '../assets/images/arrow-right.png'
import butikLogo from '../assets/images/butik-logo.png'

const Header = () => {
  return (
    <div className="header">
      <div className="d-flex flex-column">
        <div className="header-top">
          <div className="header-top__logo mb-2">
            <img src={butikLogo} alt="" />
          </div>

          <h2>Cash Store</h2>
        </div>
        <div className="header-menu">
          <div className="header-menu__item">
            <div className="header-menu__icon">
              <img src={addProduct} alt="" />
            </div>
            <div className="header-menu__text">
              <h4>Ürün Ekle</h4>
              <img src={arrowRight} alt="" />
            </div>
          </div>
          <div className="header-menu__item">
            <div className="header-menu__icon">
              <img src={analystic} alt="" />
            </div>
            <div className="header-menu__text">
              <h4>Analiz</h4>
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
              <h4>Ürünlerim</h4>
              <img src={arrowRight} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
