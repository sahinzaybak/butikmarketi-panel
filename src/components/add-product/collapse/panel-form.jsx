import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Radio, Checkbox, Space, Input, Button, Form } from "antd";
import ImageUploading from "react-images-uploading";
import { PlusOutlined } from '@ant-design/icons';
import axios from "axios";

//action
import { fetchAddProduct } from "../../../store/actions/add-product";

const PanelForm = ({ optionsList }) => {
  const dispatch = useDispatch();
  const [mainCategoryValue, setMainCategoryValue] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState();
  const [selectedCheckSizes, setSelectedCheckSizes] = useState([]);
  const [selectedCheckColors, setSelectedCheckColors] = useState([]);
  const [imageSlider, setImageSlider] = useState([]);
  const [coverImage, setCoverImage] = useState(0);

  let selectedCategorySlug = useSelector((state) => state.addProduct.selectedCategorySlug); //Filter Listesi (Cinsiyet, Beden, Renk ..vs)
  let imageSliderArray = []
  const onChangeImageUpload = (imageList) => {
    setImages(imageList);
    const fmData = new FormData();
    const config = { headers: { "content-type": "multipart/form-data" } };

    //Seçilen resimleri aktar
    imageList.forEach(async (item) => {
      fmData.append("image", item.file);
      try {
        await axios.post("https://api.imgbb.com/1/upload?key=8b372dc4d088f787a0516386606606eb", fmData, config).then(value => {
          if (value != null) {
            imageSliderArray.push({ image_slider: value.data.data.display_url })
            setImageSlider(imageSliderArray)
          }
        })
      } catch (err) { console.log(err) }
    });

  };
  const onChangeRadio = e => {
    setSelectedRadio(e.target.value)
  };

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

  const onFinishForm = (values) => {
    dispatch(fetchAddProduct({
      title: values.productName,
      desc: values.desc,
      price: values.price,
      link: values.link,
      image: coverImage != "" ? coverImage : imageSlider[0],
      butik: "yesybutik",
      butik_whatsapp: "yesybutik",
      butik_image: "https://webizade.com/bm/img/butik-8.jpg",
      category: selectedCategorySlug,
      gender: selectedRadio,
      size: selectedCheckSizes,
      images: imageSlider,
      comments: [],
      colors: selectedCheckColors
    }));
  };

  function selectCoverImage(index) {
    setCoverImage(imageSlider[index])
    
  };

  return (
    <div className="add-product__prop">
      <Form onFinish={onFinishForm} autoComplete="off">
        <div className="row">
          <div className="col-md-4 p-0">
            <ImageUploading multiple value={images} onChange={onChangeImageUpload} vdataURLKey="data_url">
              {
                ({ imageList, onImageUpload }) => (
                  <>
                    <div className="add-product__prop-wrp">
                      <div className="add-product__image" onClick={onImageUpload}>
                        <div className="d-flex align-items-center justify-content-center h-100">
                          <PlusOutlined />
                          <h6 className="ml-2">Ürün Resmi Ekle</h6>
                        </div>
                      </div>
                      <div className="upload__image-wrapper h-100">
                        <div className="row no-gutters">
                          <div className="cover mb-2 mt-2">
                            {imageList != "" && coverImage == "" &&
                              <img src={imageList[0].dataURL} alt="" />
                            }
                            {coverImage != "" &&
                              <img src={coverImage.image_slider} alt="" />
                            }
                          </div>
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
            <Form.Item name="link" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input placeholder="Ürün İnstagram Linki" />
            </Form.Item>

            <div className="add-product__prop-filters mt-4 pt-2">
              <div className="row">
                {optionsList != "" && optionsList.filter.map((option, index) => (
                  <>
                    {option.main_title == "price" ? "" :
                      <div className="col-md-4" key={index}>
                        <h6>{option.main_title_text}</h6>
                        {option.main_title == "gender" ?
                          <Radio.Group onChange={onChangeRadio} defaultValue={mainCategoryValue}>
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


        <Button type="primary" htmlType="submit">Gönder</Button>
      </Form>
    </div>

  );
};

export default PanelForm;
