import React from 'react';
import NavLink from '../navlink';

const Drawer = () => (
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">Control Panel</span>
    <nav className="mdl-navigation">
      <NavLink to="/products" onlyActiveOnIndex={true}>Produtos</NavLink>
      <NavLink to="/categories">Categorias</NavLink>
      <NavLink to="/orders">Compras</NavLink>
    </nav>
  </div>
);

export default Drawer;
