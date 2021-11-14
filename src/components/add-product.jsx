import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "antd/dist/antd.css";
import "../assets/scss/add-product.scss";
import { Upload, Modal, Radio, Space, Input, Button, Form, Collapse } from "antd";
import { PlusOutlined } from '@ant-design/icons';

//actions
import { fetchMainCategory, fetchSubCategory, fetchCategoryTitleList, fetchFilterOptions } from "../store/actions/add-product";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(false);
  const [mainCategoryValue, setMainCategoryValue] = useState(false);
  const [subCategoryValue, setSubCategoryValue] = useState(false);
  const [categoryValue, setCategoryValue] = useState(false);
  const [activeProductInfoEntryTab, setActiveProductInfoEntryTab] = useState("disabled");
  const [activeCollapseKey, setActiveCollapseKey] = useState(['1']);
  const { Panel } = Collapse;


  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };

    fmData.append("image", file);
    try {
      const res = await axios.post("https://api.imgbb.com/1/upload?key=8b372dc4d088f787a0516386606606eb", fmData, config);
      if (res != null)
        onSuccess("Ok");
    } catch (err) { onError({ err }) }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    setDefaultFileList(fileList);
  };

  let mainCategoryList = useSelector((state) => state.addProduct.mainCategoryList); //Ana Kategori Listesi (Kadın, Erkek, Çocuk&Bebek, Ev&Yaşam ..vs)
  let subCategoryList = useSelector((state) => state.addProduct.subCategoryList); // Alt Kategori Listesi (Giyim, Ayakkabı, Çanta&Aksesuar ..vs)
  let categoryTitleList = useSelector((state) => state.addProduct.categoryTitleList); //Kategori Listesi (T-shirt, Pantolon, Şort ..vs)
  let optionsList = useSelector((state) => state.addProduct.optionsList); //Kategori Listesi (T-shirt, Pantolon, Şort ..vs)

  useEffect(() => {
    dispatch(fetchMainCategory()); //Ana kategorileri getir.
  }, []);

  function selectedMainCategory(e) { // Ana Kategori Seçimi (Kadın, Erkek, Çocuk&Bebek, Ev&Yaşam ..vs)
    const mainCatValue = e.target.value
    setMainCategoryValue(mainCatValue)
    dispatch(fetchSubCategory(mainCatValue)); //Alt kategorileri getir.
  };

  function selectedSubCategory(e) { // Alt Kategori Seçimi (Giyim, Ayakkabı, Çanta&Aksesuar ..vs)
    const subCatValue = e.target.value
    setSubCategoryValue(subCatValue)
    dispatch(fetchCategoryTitleList(mainCategoryValue, subCatValue)); //kategorileri getir.
  };

  function selectedCategory(e) { // Filtreleme seçeneklerini getirir. (Size, Color..vs)
    const catValue = e.target.defaultValue;
    setCategoryValue(catValue)
    dispatch(fetchFilterOptions(catValue)); //kategorileri getir.
    setActiveProductInfoEntryTab("enable")
    setActiveCollapseKey(2)
  };

  const callback = (key) => {
    setActiveCollapseKey(key)
  }

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="add-product">
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        onChange={handleOnChange}
        multiple={true}
        onPreview={() => { setPreview(true) }}
        listType="picture-card"
        defaultFileList={defaultFileList}>
        {
          defaultFileList.length >= 5 ? null :
            <div className="d-flex flex-column">
              <PlusOutlined />
              <h6 className="mt-3">Ürün Ekle</h6>
            </div>
        }
      </Upload>
      <Modal
        visible={preview}
        footer={null}
        width={780}
        onCancel={() => {
          setPreview(false)
        }}>
        <div className="add-product__modal">
          <h4 className="add-product__modal-title">Ürün özellikleri ekle</h4>
          <Collapse accordion activeKey={activeCollapseKey} onChange={callback}>
            <Panel header="Ürününüz için bir kategori belirleyin" key="1">
              <div className="add-product__category">
                <div className="row">
                  <div className="col-md-4">
                    <div className="add-product__modal-item">
                      <h6>Ana Kategori Seçin</h6>
                      <Radio.Group onChange={selectedMainCategory} value={mainCategoryValue}>
                        <Space direction="vertical">
                          {mainCategoryList != "" && mainCategoryList.categories.map((mainCategory, index) => (
                            <Radio value={mainCategory.slug} defaultValue={mainCategory.title} key={index}>{mainCategory.title}</Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="add-product__modal-item">
                      <h6>Alt Kategori Seçin</h6>
                      <Radio.Group onChange={selectedSubCategory} value={subCategoryValue}>
                        <Space direction="vertical">
                          {subCategoryList != "" && subCategoryList.categories.map((subCategory, index) => (
                            <Radio value={subCategory.slug} key={index}>{subCategory.title}</Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="add-product__modal-item last">
                      <h6>Kategori Seçin</h6>
                      <Radio.Group onChange={selectedCategory} defaultValue={categoryValue}>
                        <Space direction="vertical">
                          {categoryTitleList != "" && categoryTitleList.categories.categories.map((category, index) => (
                            <Radio value={category.title} defaultValue={category.filter_title} key={index}>{category.title}</Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel header="Ürününüzün bilgilerini giriniz" key="2" collapsible={activeProductInfoEntryTab}>
              <div className="add-product__prop">
                <Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                  <div className="row">
                    <div className="col-md-8">
                      <Form.Item name="productName" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input placeholder="Ürün İsmi" />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <Form.Item name="price" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input placeholder="Ürün Fiyatı (₺)" />
                      </Form.Item>
                    </div>
                  </div>
                  <Form.Item name="desc" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input placeholder="Ürün Açıklaması" />
                  </Form.Item>

                  <div className="add-product__prop-filters mt-4 pt-2">
                    <div className="row">
                      {optionsList != "" && optionsList.filter.map((option, index) => (
                        <div className="col-md-3" key={index}>
                          <h6>{option.main_title_text}</h6>
                          <Radio.Group defaultValue={mainCategoryValue}>
                            <Space direction="vertical">
                              {option.filter_sub.map((option_sub, index) => (
                                <Radio value={option_sub.title} key={index}>{option_sub.title}</Radio>
                              ))}

                            </Space>
                          </Radio.Group>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="primary" htmlType="submit">Gönder</Button>
                </Form>
              </div>
            </Panel>
          </Collapse>
        </div>
      </Modal>
    </div>


  );
};

export default AddProduct;
