import { Modal } from "antd";
import Analysis from './analysis'

const ModalAnalysis = ({ preview, onCancel, selectedProductCoverImage, selectedProductTitle }) => {
  return (
    <Modal
      visible={preview}
      footer={null}
      destroyOnClose={true}
      width={780}
      centered
      onCancel={() => { onCancel() }}>
      <div className="add-product__modal">
        <h4 className="add-product__modal-title">Ürün Analiz Bilgileri</h4>
        <Analysis selectedProductCoverImage={selectedProductCoverImage} selectedProductTitle={selectedProductTitle}/>
      </div>
    </Modal>
  );
};

export default ModalAnalysis;
