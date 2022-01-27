import {combineReducers} from 'redux'
import auth from './auth'
import addProduct from './add-product'
import butik from './butik'
import analysis from './analysis'
import orders from './orders'

export default combineReducers({
  auth,
  addProduct,
  butik,
  analysis,
  orders
})