import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Collapse } from "antd";
import { IsAddedProduct } from '../../helpers/helpers'
//Actions
import { fetchMainCategory } from "../../store/actions/add-product";

//Components
import PanelCategory from './collapse/panel-category'
import PanelForm from './collapse/panel-form'

const Modals = ({ preview, onCancel, destroyForm }) => {
  const dispatch = useDispatch();
  const { Panel } = Collapse;
  const [activeCollapseKey, setActiveCollapseKey] = useState(['1']);
  const [isActiveFormTab, setIsActiveFormTab] = useState("disabled");

  let mainCategoryList = useSelector((state) => state.addProduct.mainCategoryList); //Ana Kategori Listesi (Kadın, Erkek, Çocuk&Bebek, Ev&Yaşam ..vs)
  let subCategoryList = useSelector((state) => state.addProduct.subCategoryList); // Alt Kategori Listesi (Giyim, Ayakkabı, Çanta&Aksesuar ..vs)
  let categoryTitleList = useSelector((state) => state.addProduct.categoryTitleList); //Kategori Listesi (T-shirt, Pantolon, Şort ..vs)
  let optionsList = useSelector((state) => state.addProduct.optionsList); //Filter Listesi (Cinsiyet, Beden, Renk ..vs)

  useEffect(() => {
    dispatch(fetchMainCategory()); //Modal açıldığında Ana kategorileri getir.
  }, []);

  useEffect(() => {
    if (optionsList != "") {
      setIsActiveFormTab("enable") //form tab'ının disabled kaldır, enabled yap.
      setActiveCollapseKey(2) //form tab'ını aç.
    }
  }, [optionsList]);

  let isAddedProduct = IsAddedProduct() //yeni ürün eklendiğinde
  useEffect(() => {
    if (isAddedProduct) {
      setActiveCollapseKey(1)
      setIsActiveFormTab("disabled") //form tab'ının disabled yap.
    }
  }, [isAddedProduct]);

  return (
    <Modal
      visible={preview}
      footer={null}
      destroyOnClose={destroyForm}
      width={780}
      centered
      onCancel={() => { onCancel() }}>
      <div className="add-product__modal">
        <h4 className="add-product__modal-title">Ürün Ekle</h4>
        <Collapse accordion activeKey={activeCollapseKey} onChange={(key) => setActiveCollapseKey(key)}>
          <Panel header="Ürününüz için bir kategori belirleyin" key="1">
            <PanelCategory
              mainCategoryList={mainCategoryList}
              subCategoryList={subCategoryList}
              categoryTitleList={categoryTitleList} />
          </Panel>
          <Panel header="Ürününüzün bilgilerini giriniz" key="2" collapsible={isActiveFormTab}>
            <PanelForm optionsList={optionsList} />
          </Panel>
        </Collapse>
      </div>
    </Modal>
  );
};

export default Modals;
