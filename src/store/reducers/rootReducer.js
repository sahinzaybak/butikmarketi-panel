import {combineReducers} from 'redux'
import auth from './auth'
import addProduct from './add-product'
import butik from './butik'
import analysis from './analysis'

export default combineReducers({
  auth,
  addProduct,
  butik,
  analysis
})