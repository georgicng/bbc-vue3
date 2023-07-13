import axios from '../utils/axios'
import { API_ENDPOINT_PREFIX, API_ENDPOINT_SUFFIX } from '../utils/config'

const getCategories = (params) =>
  axios.get(`${API_ENDPOINT_PREFIX}/categories/${API_ENDPOINT_SUFFIX}`, params)
const getProducts = (params) =>
  axios.get(`${API_ENDPOINT_PREFIX}/products/${API_ENDPOINT_SUFFIX}`, params)
const getProduct = (id, params) =>
  axios.get(`${API_ENDPOINT_PREFIX}/products/${API_ENDPOINT_SUFFIX}/${id}`, params)

export {
  getCategories,
  getProducts,
  getProduct
}
