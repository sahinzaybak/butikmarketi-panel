const OrderTable = ({ onClickOpenModalUpdate, orderList }) => {
  return (
    <div className="order-wrp">
      <div className="order-list text-center">
        <div className="order-header">
          <div className="order-item">
            <span>Sipariş No</span>
          </div>
          <div className="order-item">
            <span>Sipariş Tarihi</span>
          </div>
          <div className="order-item">
            <span>Kargo Durum</span>
          </div>
          <div className="order-item">
            <span>Sipariş Veren</span>
          </div>
          <div className="order-item">
            <span>Telefon No</span>
          </div>
          <div className="order-item">
            <span>Sipariş Verilen Ürün</span>
          </div>
          <div className="order-item">
            <span>Ürün Fiyatı</span>
          </div>
          <div className="order-item">
            <span>Adet</span>
          </div>
          <div className="order-item">
            <span>Toplam Fiyat</span>
          </div>
          <div className="order-item">
            <span>Detaylar</span>
          </div>
        </div>
        {orderList.map((order, index) => (
          <div className="order-list__wrp" key={index}>
            <div className="order-item column">
              <span>#{order.attributes.orderNo}</span>
            </div>
            <div className="order-item column">
              <span>{order.attributes.orderDate}</span>
            </div>
            <div className="order-item column status">
              {!order.attributes.status ? <span>Beklemede</span> : <span>Kargoda</span>}
            </div>
            <div className="order-item column">
              <span>{order.attributes.nameSurname}</span>
            </div>
            <div className="order-item column">
              <span>{order.attributes.phone}</span>
            </div>
            <div className="order-item column">
              <span>{order.attributes.products.data[0].attributes.title}</span>
            </div>
            <div className="order-item column">
              <span>{order.attributes.products.data[0].attributes.price} ₺</span>
            </div>
            <div className="order-item column">
              <span>{order.attributes.count} </span>
            </div>
            <div className="order-item column">
              <span>{order.attributes.totalPrice} ₺</span>
            </div>
            <div className="order-item column" onClick={() => {
              onClickOpenModalUpdate(true, order);
            }}>
              <span>Detayları Gör / Kargoya Gönder</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderTable;
