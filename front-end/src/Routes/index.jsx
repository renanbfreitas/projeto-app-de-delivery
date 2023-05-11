import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Products from '../Pages/Products';
import CheckoutPage from '../Pages/CheckoutPage';
import OrderDetails from '../Pages/OrderDetails';

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/checkout" component={ CheckoutPage } />
      <Route path="/customer/orders/:id" component={ OrderDetails } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default Routes;
