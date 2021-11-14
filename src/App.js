import {Route} from 'react-router-dom';
import loginPage from './pages/login.jsx'
import panelPage from './pages/panel.jsx'

import "bootstrap/dist/css/bootstrap.css";
import './assets/global.scss'
import 'antd/dist/antd.css'; 

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={loginPage}></Route>
      <Route path='/panel' component={panelPage}></Route>
    </div>
  );
}

export default App;
