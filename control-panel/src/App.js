import React from 'react';
import Layout from './layout/Layout';

const App = ({ children }) => (
  <div className="App">
    <Layout>
      {children}
    </Layout>
  </div>
);

export default App;
