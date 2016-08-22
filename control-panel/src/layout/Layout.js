import React from 'react';
import Header from './Header';
import Drawer from './Drawer';

const Layout = ({ children}) => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <Header />
    <Drawer />
    <main className="mdl-layout__content mdl-color--grey-200">
      {children}
    </main>
  </div>
);

export default Layout;
