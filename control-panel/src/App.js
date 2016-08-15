import React, { Component } from 'react';
import Layout from './layout/layout';
import firebase from 'firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignout = this.handleSignout.bind(this);

    const firebaseApp = firebase.initializeApp({
      apiKey: 'AIzaSyCZVjDEhIriyoXIg-lihfRZ9WvA3ZuhJ2o',
      authDomain: 'cantinaselfservice.firebaseapp.com',
      databaseURL: 'https://cantinaselfservice.firebaseio.com',
      storageBucket: 'cantinaselfservice.appspot.com',
    });

    this.auth = firebaseApp.auth();
    this.database = firebaseApp.database();

    this.auth.onAuthStateChanged((user) => {
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

  componentDidUpdate() {
    window.componentHandler.upgradeDom();
  }

  getChildContext() {
    return {
      database: this.database
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
    return (
      <div className="App">
        <Layout user={this.state.user} onSignout={this.handleSignout} {...props}>
          {
            this.state.isLoading
            ? <div className="mdl-spinner mdl-js-spinner is-active"></div>
            : (this.state.user ? children : <button onClick={this.handleLogin}>Login</button>)
          }
        </Layout>
      </div>
    );
  }
}

App.childContextTypes = {
  database: React.PropTypes.object
};
export default App;
