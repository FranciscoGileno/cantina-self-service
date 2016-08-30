import React from 'react';
import NavLink from '../navlink';
import * as MDL from 'react-mdl/lib/Layout';

const Drawer = () => (
  <MDL.Drawer title="Control Panel">
    <MDL.Navigation>
      <NavLink to="/products" onlyActiveOnIndex={true}>Produtos</NavLink>
      <NavLink to="/categories">Categorias</NavLink>
      <NavLink to="/orders">Compras</NavLink>
    </MDL.Navigation>
  </MDL.Drawer>
);

export default Drawer;
