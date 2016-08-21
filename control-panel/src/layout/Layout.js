import React from 'react';
import NavLink from '../navlink';
import UserInfo from './UserInfo';

const Layout = ({ children}) => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <Layout.Header />
    <Layout.Drawer />
    <main className="mdl-layout__content mdl-color--grey-200">
      {children}
    </main>
  </div>
);

Layout.Header = () => (
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Cantina Self Service - BRUM</span>
      <div className="mdl-layout-spacer"></div>
      <nav className="mdl-navigation">
        <UserInfo />
      </nav>
    </div>
  </header>
);

Layout.Drawer = () => (
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">Control Panel</span>
    <nav className="mdl-navigation">
      <NavLink to="/products" onlyActiveOnIndex={true}>Produtos</NavLink>
      <NavLink to="/categories">Categorias</NavLink>
      <NavLink to="/orders">Compras</NavLink>
    </nav>
  </div>
);

export default Layout;
