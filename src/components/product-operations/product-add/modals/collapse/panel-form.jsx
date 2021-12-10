import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Radio, Checkbox, Space, Input, Button, Form, Spin } from "antd";
import { PlusOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import ImageUploading from "react-images-uploading";
import axios from "axios";
import { store } from 'react-notifications-component';
import { IsAddedProduct } from '../../../../../helpers/helpers'

//Actions
import { fetchAddProduct } from "../../../../../store/actions/add-product";

const PanelForm = ({ optionsList }) => {
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const [mainCategoryValue, setMainCategoryValue] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState();
  const [selectedCheckSizes, setSelectedCheckSizes] = useState([]);
  const [selectedCheckColors, setSelectedCheckColors] = useState([]);
  const [imageSlider, setImageSlider] = useState([]);
  const [coverImage, setCoverImage] = useState(0);
  const [isAllUploadImage, setIsAllUploadImage] = useState(true);

  let selectedCategorySlug = useSelector((state) => state.addProduct.selectedCategorySlug); //Filter Listesi (Cinsiyet, Beden, Renk ..vs)
  let selectedCategoryFilterTitle = useSelector((state) => state.addProduct.selectedCategoryFilterTitle); //Filter Listesi (Cinsiyet, Beden, Renk ..vs)
  let imageSliderArray = []

  //Resim yükleme
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

  //Kapak fotoğrafı seç
  function selectCoverImage(index) {
    setCoverImage(imageSlider[index])
  };

  //Beden ve Renk seçimi => seçili checkboxlar
  function onChangeCheck(e, title) {
    if (title == "size") {
      if (e.target.checked) {
        setSelectedCheckSizes([
          ...selectedCheckSizes,
          { size_title: e.target.value }
        ]);
      } else {
        setSelectedCheckSizes(
          selectedCheckSizes.filter((size) => size.size_title !== e.target.value) //sil
        );
      }
    }
    if (title == "color") {
      if (e.target.checked) {
        setSelectedCheckColors([
          ...selectedCheckColors,
          { color_title: e.target.value },
        ]);
      } else {
        setSelectedCheckColors(
          selectedCheckColors.filter((size) => size.color_title !== e.target.value) //sil
        );
      }
    }
  }

  //Formu gönder
  function onFinishForm(values) {
    confirm({
      title: 'Ürününüz yayınlanıyor..',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: 'Ürün bilgileriniz doğru ise, ürününüzü yayınlamak istiyor musunuz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 1000 ? resolve : reject, 1000);
          setTimeout(async () => {
            await dispatch(fetchAddProduct({
              title: values.productName,
              desc: values.desc,
              price: values.price,
              link: values.link,
              image: coverImage != "" ? coverImage.image_slider : imageSlider[0].image_slider,
              category: selectedCategorySlug,
              filterTitle: selectedCategoryFilterTitle,
              gender: selectedRadio,
              size: selectedCheckSizes,
              images: imageSlider,
              comments: [],
              colors: selectedCheckColors
            }))
            if (IsAddedProduct) { //yeni ürün eklendiğinde(true) (helpers)
              store.addNotification({
                message: "Tebrikler, ürününüz başarıya yayınladı :)",
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
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div className="product-operation__prop">
      <Form onFinish={onFinishForm} autoComplete="off">
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
                            {imageList != "" && coverImage == "" && <img src={imageList[0].dataURL} alt="" />}
                            {coverImage != "" && <img src={coverImage.image_slider} alt="" />}
                          </div>
                          {!isAllUploadImage &&
                            <div className="product-operation__loading">
                              <Spin indicator={<LoadingOutlined className="spin" style={{ fontSize: 40 }} spin />} />
                            </div>
                          }
                          {imageList && imageList.map((image, index) => (
                            <div className="col-md-3">
                              <div key={index} className="image-item" onClick={() => selectCoverImage(index)}>
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
                <Form.Item name="productName" rules={[{ required: true, message: 'Ürün ismini giriniz.' }]}>
                  <Input placeholder="Ürün İsmi" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item name="price" rules={[{ required: true, message: 'Ürün fiyatı giriniz.' }]}>
                  <Input placeholder="Ürün Fiyatı (₺)" />
                </Form.Item>
              </div>
            </div>
            <Form.Item name="desc" rules={[{ required: true, message: 'Ürün açıklaması giriniz.' }]}>
              <Input.TextArea placeholder="Ürün Açıklaması" />
            </Form.Item>
            <Form.Item name="link" rules={[{ required: true, message: 'Ürün instagram linkini giriniz.' }]}>
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
                          <Radio.Group onChange={(e) => setSelectedRadio(e.target.value)} defaultValue={mainCategoryValue}>
                            <Space direction="vertical">
                              {option.filter_sub.map((option_sub, index) => (
                                <Radio value={option_sub.title} key={index}>{option_sub.title}</Radio>
                              ))}
                            </Space>
                          </Radio.Group>
                          :
                          <Checkbox.Group defaultValue={mainCategoryValue}>
                            <Space direction="vertical">
                              {option.filter_sub.map((option_sub, index) => (
                                <Checkbox onChange={(e) => onChangeCheck(e, option.main_title)} value={option_sub.title} key={index}>{option_sub.title}</Checkbox>
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
        <Button className="button" htmlType="submit">Ürünü Ekle</Button>
      </Form>
    </div>
  );
};

export default PanelForm;
