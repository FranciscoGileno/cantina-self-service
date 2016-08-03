import React, { Component } from 'react';
import Layout from './layout/Layout.js';
import firebase from 'firebase';
import ProductList from './products/product-list.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    console.log('constructor');

    const firebaseApp = firebase.initializeApp({
      apiKey: 'AIzaSyCZVjDEhIriyoXIg-lihfRZ9WvA3ZuhJ2o',
      authDomain: 'cantinaselfservice.firebaseapp.com',
      databaseURL: 'https://cantinaselfservice.firebaseio.com',
      storageBucket: 'cantinaselfservice.appspot.com',
    });

    this.auth = firebaseApp.auth();

    this.auth.onAuthStateChanged((user) => {
      console.log('onAuthStateChanged', user);
      if (user) {
        this.setState({ user: user });
        return;
      }
    });

    this.state = {
      user: this.auth.currentUser,
    };
  }

  handleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  }

  handleSignout() {
    this.auth.signOut();
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  render() {
    console.log('user: ', this.state.user);
    return (
      <div className="App">
        <Layout user={this.state.user} onSignout={this.handleSignout}>
          {this.state.user ? <ProductList /> : <button onClick={this.handleLogin}>Login</button> }
        </Layout>
      </div>
    );
  }
}

export default App;
