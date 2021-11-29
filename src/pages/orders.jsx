import React, { useState } from "react";
import '../assets/scss/order.scss'
import OrdersTable from '../components/orders/order-table'
import OrdersModal from '../components/orders/order-modal'
const Orders = () => {
  const [preview, setPreview] = useState("");
  return (
    <div className="wrapper order">
      <div className="wrapper-header">
        <h3>Siparişlerim</h3>
      </div>
      <div className="wrapper-main">
        <div className="wrapper-main__item">
          <OrdersTable onClickOpenModalUpdate={(openModal) => setPreview(openModal)} />
          <OrdersModal preview={preview} onCancel={() => setPreview(false)} />
        </div>
      </div>
    </div>
  );
}
export default Orders
