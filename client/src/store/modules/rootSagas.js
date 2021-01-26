import { all } from 'redux-saga/effects'

import products from './Product/productSagas'
import user from './User/userSagas'
import cart from './Cart/cartSagas'
import order from './Order/orderSagas'
import usersAdmin from './AdminUser/userAdminSagas'
import ordersAdmin from './AdminOrder/orderAdminSagas'

export default function* rootSagas() {
  return yield all([user, products, cart, order, usersAdmin, ordersAdmin])
}
