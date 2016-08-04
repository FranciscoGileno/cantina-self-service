import React from 'react';
import UserInfo from './user-info.js';

const Layout = ({ children, onSignout, user }) => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header className="mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Cantina Self Service - Control Panel</span>
        <div className="mdl-layout-spacer"></div>
        {user ? (
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <a className="mdl-navigation__link" href="" onClick={onSignout}>
              <UserInfo name={user.displayName} photoUrl={user.photoURL} />
              Logout
            </a>
          </nav>
        ) : ''}
      </div>
    </header>
    <div className="mdl-layout__drawer">
      <span className="mdl-layout-title">Control Panel</span>
      <nav className="mdl-navigation">
        <a className="mdl-navigation__link" href="">Dashboard</a>
        <a className="mdl-navigation__link" href="">Products</a>
        <a className="mdl-navigation__link" href="">Categories</a>
        <a className="mdl-navigation__link" href="">Cart</a>
      </nav>
    </div>
    <main className="mdl-layout__content mdl-color--grey-100">
      <div className="mdl-grid">
        {children}
      </div>
    </main>
  </div>
);

export default Layout;
