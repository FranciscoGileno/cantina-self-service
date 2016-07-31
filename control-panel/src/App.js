import React, { Component } from 'react';
import Layout from './layout/Layout.js'
import ProductList from './products/product-list.js'
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCZVjDEhIriyoXIg-lihfRZ9WvA3ZuhJ2o",
  authDomain: "cantinaselfservice.firebaseapp.com",
  databaseURL: "https://cantinaselfservice.firebaseio.com",
  storageBucket: "cantinaselfservice.appspot.com",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
    this.handleSignout = this.handleSignout.bind(this);
    this.auth = firebaseApp.auth();

    const onAuthStateChanged = (user) => {
      console.log("onAuthStateChanged", user);
      if (user) {
        this.setState({ user: user });
        return;
      }
      var provider = new firebase.auth.GoogleAuthProvider();
      this.auth.signInWithRedirect(provider);
    }
    this.auth.onAuthStateChanged(onAuthStateChanged.bind(this));
    this.auth.getRedirectResult().then((result) => {
      console.log("getRedirectResult", result);
      this.setState({ user: result.user });
    }).catch((error) => {
      console.log("getRedirectResult Error", error);
    });

  }

  handleSignout(){
    this.auth.signOut();
  }
  render() {
    console.log("user: ", this.state.user);
    return (
      <div className="App">
        <Layout user={this.state.user} onSignout={this.handleSignout}>
          {this.state.user ? <ProductList /> : '' }
        </Layout>
      </div>
    );
  }
}

export default App;
