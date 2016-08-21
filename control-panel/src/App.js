import React, { Component } from 'react';
import Layout from './layout/Layout';
import './App.css';

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="App">
        <Layout>
          {children}
        </Layout>
      </div>
    );
  }
}

export default App;
