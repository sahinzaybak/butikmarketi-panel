import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";

//Actions
import { fetchFilterOptions } from "../../../store/actions/add-product";

//Components
import PanelFormUpdate from './form-update'

const ModalUpdate = ({ preview, onCancel, selectedProductInfo }) => {
  const dispatch = useDispatch();
  let optionsList = useSelector((state) => state.addProduct.optionsList); //Filter Listesi (Cinsiyet, Beden, Renk ..vs)

  //Modal açıldığında ürüne ait filtreleri getir. (giyim => X,S,M,L ..vs)
  useEffect(() => {
    if (preview)
      dispatch(fetchFilterOptions(selectedProductInfo.filter_title)); 
  }, [selectedProductInfo]);

  return (
    <Modal
      visible={preview}
      footer={null}
      destroyOnClose={true}
      width={780}
      centered
      onCancel={() => { onCancel() }}>
      <div className="product-operation__modal">
        <h4 className="product-operation__modal-title">Ürün Bilgileri Düzenle</h4>
        <PanelFormUpdate
          optionsList={optionsList}
          selectedProductInfo={selectedProductInfo} />
      </div>
    </Modal>
  );
};

export default ModalUpdate;
