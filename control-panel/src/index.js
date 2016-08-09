import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Dashboard from './dashboard/dashboard';
import ProductList from './products/product-list';
import CategoryList from './categories/category-list';
import OrderList from './orders/order-list';
import './index.css';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="/products" component={ProductList} />
      <Route path="/categories" component={CategoryList} />
      <Route path="/orders" component={OrderList} />
    </Route>
  </Router>
), document.getElementById('root'));
