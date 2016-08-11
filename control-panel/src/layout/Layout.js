import React from 'react';
import NavLink from '../navlink';
import UserInfo from './user-info';

const Layout = ({ children, onSignout, user }) => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Cantina Self Service - BRUM</span>
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
        <NavLink to="/" onlyActiveOnIndex={true}>Dashboard</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </nav>
    </div>
    <main className="mdl-layout__content mdl-color--grey-200">
      <div>
        {children}
      </div>
    </main>
  </div>
);

export default Layout;
