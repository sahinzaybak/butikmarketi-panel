import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import '../assets/scss/login.scss'
import logo from '../assets/images/logo-2.png'
import { Form, Input, Button } from 'antd';

//actions
import { login } from "../store/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let authInfo = useSelector((state) => state.auth.authInfo);

  if (authInfo != "") {
    localStorage.setItem('instagram_hash', authInfo.info[0].login[0].instagram_hash)
    localStorage.setItem('instagram_variable', authInfo.info[0].login[0].instagram_variable)
    localStorage.setItem('user_token', authInfo.token)
    history.push("/panel")
  }

  const onFinish = (form_values) => {
    dispatch(login(form_values));
  };
  return (
    <div className="login">
      <div className="login-logo">
        <img className="login-logo__img" src={logo} alt="" />
      </div>
      <div className="login-wrp">
        <h2 className="login-title mb-1">Giriş Yapın.</h2>
        <p className="login-desc">Butik ürünlerinizi daha fazla satmak için butikmarketi dünyasına giriş yapın.</p>
        <div className="login-form">
          <Form onFinish={onFinish} autoComplete="off">
            <Form.Item name="instagram_user_name" rules={[{ required: true, message: 'Lütfen butiğinizin instagram kullanıcı adını girin.' }]}>
              <Input placeholder="Butiğinizin İnstagram Kullanıcı Adı" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Lütfen şifrenizi girin.' }]}>
              <Input placeholder="Şifre" />
            </Form.Item>
            <Button className="button" htmlType="submit">Giriş Yap</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login
