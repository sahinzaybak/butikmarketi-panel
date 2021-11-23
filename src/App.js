import {Route} from 'react-router-dom';
import { useHistory } from "react-router";
import loginPage from './pages/login.jsx'
import productOperations from './pages/product-operations'
import Header from './layout/header.jsx'
import "bootstrap/dist/css/bootstrap.css";
import './assets/global.scss'
import 'antd/dist/antd.css'; 

let loginUserInfo
function App() {
  // const history = useHistory();
  // loginUserInfo = JSON.parse(localStorage.getItem("butik_token"))
  return (
    <div className="App">
      {/* {loginUserInfo == null && history.push("/")} */}
      <Route exact path='/' component={loginPage}></Route>
      <Route path="/" render={(props) => (props.location.pathname !== "/") && <Header /> }></Route> 
      <Route path='/product-operations' component={productOperations}></Route>
    </div>
  );
}

export default App;
