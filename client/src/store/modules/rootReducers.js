import { combineReducers } from 'redux'

import { cartReducer } from './Cart/cartReducers'
import { productsReducer, productReducer, deleteProductReducer, createProductReducer, updateProductReducer, reviewProductReducer} from './Product/productReducers'
import { userReducer, userDetailReducer, userUpdateReducer} from './User/userReducers'
import { orderCreateReducer, orderGetDetailsReducer, orderPayReducer, orderDeliverReducer, getMyOrdersReducer } from './Order/orderReducers'
import { usersListReducer, deleteUserReducer } from './AdminUser/userAdminReducers'
import { ordersListReducer } from './AdminOrder/orderAdminReducers'

export default combineReducers({
  //@CLIENT
  user: userReducer,
  userDetail: userDetailReducer,
  userUpdate: userUpdateReducer,
  products: productsReducer,
  product: productReducer,
  reviewProduct: reviewProductReducer,
  cart: cartReducer,  
  orderCreate: orderCreateReducer,
  orderDetails: orderGetDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  myOrders: getMyOrdersReducer,

  //@ADMIN
  usersList: usersListReducer,
  userDelete: deleteUserReducer,
  ordersList: ordersListReducer,
  deleteProduct: deleteProductReducer,
  createProduct: createProductReducer,  
  updateProduct: updateProductReducer,
})
