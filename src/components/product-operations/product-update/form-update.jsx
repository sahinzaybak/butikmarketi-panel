import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Radio, Checkbox, Space, Input, Button, Form, Spin } from "antd";
import { PlusOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import ImageUploading from "react-images-uploading";
import axios from "axios";
import { store } from 'react-notifications-component';
import { IsAddedProduct } from '../../../helpers/helpers'

//Action
import { fetchUpdateProduct } from "../../../store/actions/add-product";

const FormUpdate = ({ optionsList, selectedProductInfo }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const [images, setImages] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [imageSlider, setImageSlider] = useState([]);
  const [coverImage, setCoverImage] = useState(0);
  const [isAllUploadImage, setIsAllUploadImage] = useState(true);

  let imageSliderArray = []
  let selectedCheckboxes = []
  selectedProductInfo.sizes.forEach(element => { //checkboxlar seçili gelsin diye.
    selectedCheckboxes.push(element.size_title)
  });

  useEffect(() => {
    form.setFieldsValue({
      productName: selectedProductInfo.title,
      price: selectedProductInfo.price,
      desc: selectedProductInfo.description,
      link: selectedProductInfo.link
    });
  }, [selectedProductInfo]);

  //Resim yükle
  function onChangeImageUpload(imageList) {
    setIsAllUploadImage(false)
    setImages(imageList);
    const fmData = new FormData();
    const config = { headers: { "content-type": "multipart/form-data" } };
    imageList.forEach((item) => { //Seçilen resimleri aktar
      fmData.append("image", item.file);
      try {
        axios.post("https://api.imgbb.com/1/upload?key=8b372dc4d088f787a0516386606606eb", fmData, config).then(value => {
          if (value != null) {
            imageSliderArray.push({ image_slider: value.data.data.display_url })
            setImageSlider(imageSliderArray)
            if (imageSliderArray.length == imageList.length) { //resimlerin hepsi yüklendikten sonra..
              setIsAllUploadImage(true)
            }
          }
        })
      } catch (err) { console.log(err) }
    });
  };

  //Kapak resmi seç
  function selectCoverImage(index, imagesType) {
    if (imagesType == "defaultImages") setCoverImage(selectedProductInfo.images[index]) //gelen resimlerden seç
    else setCoverImage(imageSlider[index]) //eklenen resimlerden seç
  };

  //Beden ve Renk seçimi => seçili checkboxlar
  function onChangeCheckbox(checkedValues, title) {
    if (title == "size") { // seçili bedenler
      selectedProductInfo.size = []
      checkedValues.forEach(element => {
        selectedProductInfo.size.push({ "size_title": element })
      });
    }
    if (title == "color") { //seçili renkler
      selectedProductInfo.colors = [] = []
      checkedValues.forEach(element => {
        selectedProductInfo.colors.push({ "color_title": element })
      });
    }
  }

  //Formu güncelle
  function onFinishForm(values) {
    // default resimlerle + yeni eklenen resimleri birleştir.
    imageSlider.forEach(element => {
      selectedProductInfo.images.push(element)
    });
    confirm({
      title: 'Ürününüz güncelleniyor..',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: 'Ürün bilgilerinizde değişiklik yapmak istiyor musunuz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 1000 ? resolve : reject, 1000);
          setTimeout(async () => {
            await dispatch(fetchUpdateProduct({
              title: values.productName,
              desc: values.desc,
              price: values.price,
              link: values.link,
              image: coverImage != "" ? coverImage.image_slider : selectedProductInfo.image,
              category: selectedProductInfo.category,
              filter_title: selectedProductInfo.filter_title,
              gender: selectedRadio != "" ? selectedRadio : selectedProductInfo.gender,
              size: selectedProductInfo.size,
              images: selectedProductInfo.images,
              comments: [],
              colors: selectedProductInfo.colors
            }, selectedProductInfo._id))

            if (IsAddedProduct) { //yeni ürün eklendiğinde (helpers)
              store.addNotification({
                message: "Tebrikler, ürününüz başarıya güncellendi :)",
                type: "success",
                insert: "top",
                width: 300,
                showIcon: true,
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2000,
                  onScreen: false
                },
              })
            }
          }, 1000);
        }).catch(() => false);
      },
      onCancel() { },
    });
  };

  return (
    <div className="product-operation__prop">
      <Form onFinish={onFinishForm} autoComplete="off" form={form}>
        <div className="row">
          <div className="col-md-4 p-0">
            <ImageUploading multiple value={images} onChange={onChangeImageUpload} vdataURLKey="data_url">
              {
                ({ imageList, onImageUpload }) => (
                  <>
                    <div className="product-operation__prop-wrp">
                      <div className="product-operation__image" onClick={onImageUpload}>
                        <div className="d-flex align-items-center justify-content-center h-100">
                          <PlusOutlined />
                          <h6 className="ml-2">Ürün Resimleri Ekle</h6>
                        </div>
                      </div>
                      <div className="upload__image-wrapper h-100">
                        <div className="row no-gutters">
                          <div className="cover mb-2 mt-2">
                            {coverImage != "" ? <img src={coverImage.image_slider} alt="" /> : <img src={selectedProductInfo.image} alt="" />}
                          </div>

                          {!isAllUploadImage &&
                            <div className="product-operation__loading">
                              <Spin indicator={<LoadingOutlined className="spin" style={{ fontSize: 40 }} spin />} />
                            </div>
                          }

                          {/* Default Resim listesi */}
                          {selectedProductInfo.images && selectedProductInfo.images.map((image, index) => (
                            <div className="col-md-3">
                              <div key={index} className="image-item" onClick={() => selectCoverImage(index, "defaultImages")}>
                                <img src={image.image_slider} alt="" width="100" />
                              </div>
                            </div>
                          ))}

                          {/* Yüklenen Resim listesi */}
                          {imageList && imageList.map((image, index) => (
                            <div className="col-md-3">
                              <div key={index} className="image-item" onClick={() => selectCoverImage(index, "newImages")}>
                                <img src={image.dataURL} alt="" width="100" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )
              }
            </ImageUploading>
          </div>

          <div className="col-md-8 pl-5">
            <div className="row">
              <div className="col-md-8">
                <Form.Item name="productName" rules={[{ required: true, message: 'Ürün ismini giriniz.' }]}
                  shouldUpdate={(prevValues, curValues) => {
                    return prevValues?.productName !== curValues?.productName;
                  }}>
                  <Input placeholder="Ürün İsmi" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item name="price" rules={[{ required: true, message: 'Ürün fiyatını giriniz.' }]}
                  shouldUpdate={(prevValues, curValues) => {
                    return prevValues?.price !== curValues?.price;
                  }}>
                  <Input placeholder="Ürün Fiyatı (₺)" />
                </Form.Item>
              </div>
            </div>
            <Form.Item name="desc" rules={[{ required: true, message: 'Ürün açıklaması giriniz.' }]}
              shouldUpdate={(prevValues, curValues) => {
                return prevValues?.desc !== curValues?.desc;
              }}>
              <Input.TextArea placeholder="Ürün Açıklaması" />
            </Form.Item>
            <Form.Item name="link" rules={[{ required: true, message: 'Ürün instagram linkini giriniz.' }]}
              shouldUpdate={(prevValues, curValues) => {
                return prevValues?.link !== curValues?.link;
              }}>
              <Input placeholder="Ürün İnstagram Linki" />
            </Form.Item>

            <div className="product-operation__prop-filters mt-4 pt-2">
              <div className="row">
                {optionsList != "" && optionsList.filter.map((option, index) => (
                  <>
                    {option.main_title == "price" ? "" :
                      <div className="col-md-4" key={index}>
                        <h6>{option.main_title_text}</h6>
                        {option.main_title == "gender" ?
                          <Radio.Group onChange={(e) => setSelectedRadio(e.target.value)} defaultValue={selectedProductInfo.gender}>
                            <Space direction="vertical">
                              {option.filter_sub.map((option_sub, index) => (
                                <Radio value={option_sub.title} key={index}>{option_sub.title}</Radio>
                              ))}
                            </Space>
                          </Radio.Group>
                          :
                          <Checkbox.Group defaultValue={selectedCheckboxes} onChange={(checkedValues) => onChangeCheckbox(checkedValues, option.main_title)}>
                            <Space direction="vertical">
                              {option.filter_sub.map((option_sub, index) => (
                                <Checkbox
                                  value={option_sub.title}
                                  key={index}>{option_sub.title}
                                </Checkbox>
                              ))}
                            </Space>
                          </Checkbox.Group>
                        }
                      </div>
                    }
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button className="button" htmlType="submit">Ürünü Güncelle</Button>
      </Form>
    </div>

  );
};

export default FormUpdate;
