import React from 'react';
import {Link} from 'react-router';

const NavLink = (props) => (
  <Link className="mdl-navigation__link" activeClassName="mdl-navigation__link--current" {...props} />
);

export default NavLink;
