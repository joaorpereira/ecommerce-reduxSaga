import React from 'react'
import { Switch } from 'react-router-dom'
import MyRoute from './MyRoute'
import {
  Home,
  Products,
  Cart,
  Login,
  SignUp,
  Profile,
  Shipping,
  Payment,
  PlaceOrder,
  Order,
  Users,
  UserEdit,
  ProductList,
  ProductEdit,
  OrderList,
} from '../screens/index'

const Routes = () => {
  return (
    <Switch>
      <MyRoute exact path={'/'} component={Home} />
      <MyRoute exact path={'/login'} component={Login} />
      <MyRoute exact path={'/register'} component={SignUp} />
      <MyRoute exact path={'/profile'} component={Profile} isPrivate />
      <MyRoute exact path={'/shipping'} component={Shipping} isPrivate />
      <MyRoute exact path={'/payment'} component={Payment} isPrivate />
      <MyRoute exact path={'/orders'} component={PlaceOrder} isPrivate />
      <MyRoute exact path={'/cart'} component={Cart} isPrivate />
      <MyRoute exact path={'/admin/users'} component={Users} isPrivate />
      <MyRoute exact path={'/admin/products'} component={ProductList} isPrivate />
      <MyRoute exact path={'/admin/orders'} component={OrderList} isPrivate />
      <MyRoute exact path={'/admin/user/:id/edit'} component={UserEdit} isPrivate />
      <MyRoute exact path={'/admin/product/:id/edit'} component={ProductEdit} isPrivate />
      <MyRoute exact path={'/product/:id'} component={Products} />
      <MyRoute exact path={'/order/:id'} component={Order} isPrivate />
    </Switch>
  )
}

export default Routes
