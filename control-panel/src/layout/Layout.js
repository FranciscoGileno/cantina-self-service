import React from 'react';
import UserInfo from './UserInfo';
import Drawer from './Drawer';
import * as MDL from 'react-mdl/lib/Layout';
const Layout = ({ children}) => (
  <MDL.Layout fixedHeader fixedDrawer>
    <MDL.Header title="CSS - BRUM">
      <MDL.Navigation>
        <UserInfo />
      </MDL.Navigation>
    </MDL.Header>
    <Drawer />
    <MDL.Content className="mdl-color--grey-200">
      {children}
    </MDL.Content>
  </MDL.Layout>
);

export default Layout;
