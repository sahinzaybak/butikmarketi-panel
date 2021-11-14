import {combineReducers} from 'redux'
import auth from './auth'
import addProduct from './add-product'

export default combineReducers({
  auth,
  addProduct
})