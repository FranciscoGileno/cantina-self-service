import React, { Component } from 'react';
import Layout from './layout/layout';
import firebase from 'firebase';
import './App.css';

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
      this.setState({
        isLoading: false,
        user: user
      });
    });

    this.state = {
      isLoading: true,
      user: null,
    };
  }

  handleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  }

  handleSignout() {
    this.auth.signOut();
  }


  render() {
    const { children, ...props } = this.props;
    console.log("render", this.state);
    return (
      <div className="App">
        <Layout user={this.state.user} onSignout={this.handleSignout} {...props}>
          {
            this.state.isLoading
            ? <div>Loading...</div>
            : (this.state.user ? children : <button onClick={this.handleLogin}>Login</button>)
          }
        </Layout>
      </div>
    );
  }
}

export default App;
