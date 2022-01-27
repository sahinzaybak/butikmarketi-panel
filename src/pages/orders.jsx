import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import '../assets/scss/order.scss'
import OrdersTable from '../components/orders/order-table'
import OrdersModal from '../components/orders/order-modal'

//Actions
import { fetchOrderList } from '../store/actions/orders'

const Orders = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState("");
  const [othersOrderDetail, setOthersOrderDetail] = useState("");

  let butikInfo = useSelector(state => state.butik.butikInfo)
  let orderList = useSelector(state => state.orders.orderList)
  useEffect(() => {
    if(butikInfo != "")
      dispatch(fetchOrderList(butikInfo.butik_id))
  }, [butikInfo]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(fetchOrderList(butikInfo.butik_id))
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="wrapper order">
      <div className="wrapper-header">
        <h3>Siparişlerim</h3>
      </div>
      <div className="wrapper-main">
        <div className="wrapper-main__item">
          <OrdersTable onClickOpenModalUpdate={(openModal, othersOrderDetail) => {
            setPreview(openModal);
            setOthersOrderDetail(othersOrderDetail)
          }
            } 
            orderList={orderList} />
          <OrdersModal othersOrderDetail={othersOrderDetail} preview={preview} onCancel={() => setPreview(false)} />
        </div>
      </div>
    </div>
  );
}
export default Orders
