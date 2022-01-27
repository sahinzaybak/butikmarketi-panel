
import { Modal, Input, Form, Button } from "antd";
const OrderModal = ({ preview, onCancel, destroyForm, othersOrderDetail }) => {
  return (
    <Modal
      visible={preview}
      footer={null}
      destroyOnClose={destroyForm}
      width={600}
      centered
      onCancel={() => { onCancel() }}>
      <div className="add-product__modal">
        <h4 className="add-product__modal-title order-title">Sipariş Detayları</h4>
        <div className="order-detail">
          <div className="row">
            <div className="col-md-12 mt-2">
              <div className="row">
                <div className="col-md-6">
                  <div className="order-detail__item">
                    <span>Ürün Adı</span>
                    <p>{othersOrderDetail?.attributes?.products?.data[0]?.attributes?.title}</p>
                  </div>
                  <div className="order-detail__item">
                    <span>Sipariş Veren</span>
                    <p>{othersOrderDetail?.attributes?.nameSurname}</p>
                  </div>
                  <div className="order-detail__item">
                    <span>Telefon No</span>
                    <p>{othersOrderDetail?.attributes?.phone}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="order-detail__item">
                    <span>Açıklama</span>
                    <p>{othersOrderDetail?.attributes?.description}</p>
                  </div>
                  <div className="order-detail__item">
                    <span>Adres</span>
                    <p>{othersOrderDetail?.attributes?.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 order-detail__top">
              <div className="row no-gutters">
                <div className="col-md-3 order-detail__col">
                  <div className="order-detail__item">
                    <span>Adet</span>
                    <p>x{othersOrderDetail?.attributes?.count}</p>
                  </div>
                </div>
                <div className="col-md-3 order-detail__col">
                  <div className="order-detail__item">
                    <span>Beden</span>
                    <p>{othersOrderDetail?.attributes?.size}</p>
                  </div>
                </div>
                <div className="col-md-3 order-detail__col">
                  <div className="order-detail__item">
                    <span>Renk</span>
                    <p>{othersOrderDetail?.attributes?.color}</p>
                  </div>
                </div>
                <div className="col-md-3 order-detail__col">
                  <div className="order-detail__item">
                    <span>Toplam Fiyat</span>
                    <p>{othersOrderDetail?.attributes?.totalPrice} ₺</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-actions  w-100">
              <div className="order-item column status d-block pl-0 pt-0 shadow-none">
              {!othersOrderDetail?.attributes?.status ? <span>Beklemede</span> : <span>Kargoda</span>}
              </div>
              <p>Müşterinizin kargosunu takip edebilmesi için, ürününüzü kargoya verdikten sonra <br /> <strong>kargo numarasını</strong> girmeniz gerekmektedir.</p>
              <div className="d-flex">
                <Form.Item className="w-100 mb-0" name="price" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input placeholder="Kargo Numarası Giriniz" />
                </Form.Item>
                <Button type="primary" htmlType="submit">Gönder</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
