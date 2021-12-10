import { Modal } from "antd";
import Analysis from './analysis'

const ModalAnalysis = ({ preview, onCancel, selectedProductCoverImage, selectedProductTitle }) => {
  return (
    <Modal
      visible={preview}
      footer={null}
      destroyOnClose={true}
      width={860}
      centered
      onCancel={() => { onCancel() }}>
      <div className="product-operation__modal">
        <h4 className="product-operation__modal-title">Ürün Analiz Bilgileri</h4>
        <Analysis selectedProductCoverImage={selectedProductCoverImage} selectedProductTitle={selectedProductTitle}/>
      </div>
    </Modal>
  );
};

export default ModalAnalysis;
