import {combineReducers} from 'redux'
import auth from './auth'
import addProduct from './add-product'
import butik from './butik'

export default combineReducers({
  auth,
  addProduct,
  butik
})