import { PlusOutlined } from '@ant-design/icons';
const AddProductCard = ({ onClickOpenModal }) => {
  return (
    <div className="add-product" onClick={() => onClickOpenModal()}>
      <div className="add-product__box d-flex flex-column">
        <PlusOutlined className="add-product__plus-icon" />
        <h6 className="mt-3">Ürün Ekle</h6>
      </div>
    </div>
  );
};

export default AddProductCard;
