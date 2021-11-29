const OrderTable = ({onClickOpenModalUpdate}) => {
  return (
    <div className="order-wrp">
      <div className="order-list">
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
            <span>Ürün</span>
          </div>
          <div className="order-item">
            <span>Fiyat</span>
          </div>
          <div className="order-item">
            <span>Adet</span>
          </div>
          <div className="order-item">
            <span>Total</span>
          </div>
          <div className="order-item">
            <span>Detaylar</span>
          </div>
        </div>
        <div className="order-list__wrp">
          <div className="order-item column">
            <span>#10214513115</span>
          </div>
          <div className="order-item column">
            <span>22/02/2021</span>
          </div>
          <div className="order-item column status">
            <span>Beklemede</span>
          </div>
          <div className="order-item column">
            <span>Şahin ZAYBAK</span>
          </div>
          <div className="order-item column">
            <span>Erkek Oduncu Gömlek</span>
          </div>
          <div className="order-item column">
            <span>80.90 ₺</span>
          </div>
          <div className="order-item column">
            <span>2 </span>
          </div>
          <div className="order-item column">
            <span>160.99₺</span>
          </div>
          <div className="order-item column">
            <span>Detayları Gör</span>
          </div>
        </div>
        <div className="order-list__wrp">
          <div className="order-item column">
            <span>#10214513115</span>
          </div>
          <div className="order-item column">
            <span>22/02/2021</span>
          </div>
          <div className="order-item column status">
            <span>Beklemede</span>
          </div>
          <div className="order-item column">
            <span>Şahin ZAYBAK</span>
          </div>
          <div className="order-item column">
            <span>Erkek Oduncu Gömlek</span>
          </div>
          <div className="order-item column">
            <span>80.90 ₺</span>
          </div>
          <div className="order-item column">
            <span>2 </span>
          </div>
          <div className="order-item column">
            <span>160.99₺</span>
          </div>
          <div className="order-item column">
            <span>Detayları Gör</span>
          </div>
        </div>
        <div className="order-list__wrp">
          <div className="order-item column">
            <span>#10214513115</span>
          </div>
          <div className="order-item column">
            <span>22/02/2021</span>
          </div>
          <div className="order-item column status">
            <span>Beklemede</span>
          </div>
          <div className="order-item column">
            <span>Şahin ZAYBAK</span>
          </div>
          <div className="order-item column">
            <span>Erkek Oduncu Gömlek</span>
          </div>
          <div className="order-item column">
            <span>80.90 ₺</span>
          </div>
          <div className="order-item column">
            <span>2 </span>
          </div>
          <div className="order-item column">
            <span>160.99 ₺</span>
          </div>
          <div className="order-item column" onClick={() => onClickOpenModalUpdate(true)}>
            <span>Detayları Gör</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTable;
