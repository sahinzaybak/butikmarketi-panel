import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Radio, Checkbox, Space, Input, Button, Form } from "antd";
import ImageUploading from "react-images-uploading";
import { PlusOutlined } from '@ant-design/icons';
import axios from "axios";

const PanelForm = ({ optionsList }) => {
  const [mainCategoryValue, setMainCategoryValue] = useState(false);
  const [images, setImages] = useState();
  const maxNumber = 69;

  const onChangeImageUpload = async (imageList) => {
    setImages(imageList);
    const fmData = new FormData();
    const config = { headers: { "content-type": "multipart/form-data" } };
    fmData.append("image", imageList[0].file);
    try {
      const res = await axios.post("https://api.imgbb.com/1/upload?key=8b372dc4d088f787a0516386606606eb", fmData, config)
      if (res != null) {
        console.log(res.data.data.display_url)
      }
    } catch (err) { }
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="add-product__prop">
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <div className="row">
          <div className="col-md-3">
            <ImageUploading value={images} onChange={onChangeImageUpload} vmaxNumber={maxNumber} vdataURLKey="data_url">
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
                    {option.main_tite}
                    <h6>{option.main_title_text}</h6>
                    {option.main_title == "gender" ?
                      <Radio.Group defaultValue={mainCategoryValue}>
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
                            <>
                              <Checkbox value={option_sub.title} key={index}>{option_sub.title}</Checkbox>
                            </>
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
