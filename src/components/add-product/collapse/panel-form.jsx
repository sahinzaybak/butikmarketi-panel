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
  const [images, setImages] = useState();
  const [selectedRadio, setSelectedRadio] = useState();
  const [selectedCheckSizes, setSelectedCheckSizes] = useState([]);
  const [selectedCheckColors, setSelectedCheckColors] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);

  let selectedCategorySlug = useSelector((state) => state.addProduct.selectedCategorySlug); //Filter Listesi (Cinsiyet, Beden, Renk ..vs)
  const onChangeImageUpload = async (imageList) => {
    setImages(imageList);
    const fmData = new FormData();
    const config = { headers: { "content-type": "multipart/form-data" } };
    fmData.append("image", imageList[0].file);
    try {
      const res = await axios.post("https://api.imgbb.com/1/upload?key=8b372dc4d088f787a0516386606606eb", fmData, config)
      if (res != null) {
        console.log(res)
        setSelectedImage(res.data.data.display_url)
      }
    } catch (err) { }
  };
  const onChangeRadio = e => {
    setSelectedRadio(e.target.value)
  };

  function onChangeCheck(e, title) {
    if (title == "size") {
      if (e.target.checked) {
        setSelectedCheckSizes([
          ...selectedCheckSizes,
          { size_title: e.target.value },
        ]);
      } else {
        // remove from list
        setSelectedCheckSizes(
          selectedCheckSizes.filter((size) => size.size_title !== e.target.value),
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
        // remove from list
        setSelectedCheckColors(
          selectedCheckColors.filter((size) => size.color_title !== e.target.value),
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
      image: selectedImage,
      butik: "yesybutik",
      butik_whatsapp: "yesybutik",
      butik_image: "https://webizade.com/bm/img/butik-8.jpg",
      category: selectedCategorySlug,
      gender: selectedRadio,
      size: selectedCheckSizes,
      images: [],
      comments: [],
      colors: selectedCheckColors
    }));
  };

  return (
    <div className="add-product__prop">
      <Form onFinish={onFinishForm} autoComplete="off">
        <div className="row">
          <div className="col-md-3">
            <ImageUploading value={images} onChange={onChangeImageUpload} vdataURLKey="data_url">
              {
                ({ imageList, onImageUpload }) => (
                  <div className="add-product__image" onClick={onImageUpload}>
                    {imageList == "" &&
                      <div className="d-flex align-items-center justify-content-center flex-column h-100">
                        <PlusOutlined />
                        <h6 className="mt-3">Ürün Resmi Ekle</h6>
                      </div>
                    }
                    <div className="upload__image-wrapper h-100">
                      {imageList && imageList.map((image, index) => (
                        <div key={index} className="image-item h-100">
                          <img src={image.dataURL} alt="" width="100" />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
            </ImageUploading>
          </div>

          <div className="col-md-9">
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
          </div>
        </div>

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
        <Button type="primary" htmlType="submit">Gönder</Button>
      </Form>
    </div>

  );
};

export default PanelForm;
