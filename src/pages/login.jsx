import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import '../assets/scss/login.scss'
import logo from '../assets/images/logo-2.png'
import { Form, Input, Button } from 'antd';
import { store } from 'react-notifications-component';

//actions
import { login } from "../store/actions/auth";

const Login = () => {
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (form_values) => { // Form Submit
    dispatch(login(form_values));
  };
  
  //Giriş yapıldı mı ?
  let isLogin;
  let authInfo = useSelector((state) => state.auth.authInfo);
  if (authInfo != "") isLogin = authInfo.data.status == 200 ? true : false
  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false; // ilk sayfa yüklendiğinde useEffect çalışmasın. Mount & Update ayrımı => useRef()
    else {
      store.addNotification({
        message: authInfo.data.message,
        type: isLogin ? "success" : "danger",
        insert: "top",
        width: isLogin ? 280 : 420,
        showIcon: true,
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: { duration: 2000, onScreen: false },
      })
      if (isLogin) {
        setTimeout(() => {
          history.push("/analysis")
          localStorage.setItem("butik_token", authInfo.data.token)
          localStorage.setItem("butik_info", JSON.stringify(authInfo.data.info[0]))
        }, 2500);
      }
    }
  }, [authInfo]);

  return (
    <div className="login">
      <div className="login-logo">
        <img className="login-logo__img" src={logo} alt="" />
      </div>
      <div className="login-wrp">
        <h2 className="login-title mb-1">Giriş Yapın.</h2>
        <p className="login-desc">Butik ürünlerinizi daha fazla satmak için butikmarketi dünyasına giriş yapın.</p>
        <div className="login-form mt-4">
          <Form onFinish={onFinish} autoComplete="off">
            <Form.Item name="user_name" rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin.' }]}>
              <Input placeholder="Kullanıcı Adınız" />
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
