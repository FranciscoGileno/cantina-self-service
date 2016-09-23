import React from 'react';
import App from './App';
import Login from './Login';
import Loading from './shared/Loading';
import ProductList from './products/ProductList';
import CategoryList from './categories/CategoryList';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import firebase from 'firebase';

class FirebaseApp extends React.Component {
  constructor(props) {
    super(props);

    this.firebaseApp = firebase.initializeApp({
      apiKey: 'AIzaSyCZVjDEhIriyoXIg-lihfRZ9WvA3ZuhJ2o',
      authDomain: 'cantinaselfservice.firebaseapp.com',
      databaseURL: 'https://cantinaselfservice.firebaseio.com',
      storageBucket: 'cantinaselfservice.appspot.com',
    });

    this.auth = this.firebaseApp.auth();
    this.database = this.firebaseApp.database();
    this.storage = this.firebaseApp.storage();

    this.auth.onAuthStateChanged(this.onAuthStateChanged);

    this.state = {
      loading: true,
      user: null,
    }
  }

  onAuthStateChanged = (user) => {
    this.setState({
      loading: false,
      user:  user,
    });
  };

  signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithRedirect(provider);
  };

  signOut = () => {
    this.auth.signOut();
  };

  getChildContext() {
    return {
      auth: this.auth,
      database: this.database,
      signOut: this.signOut,
      storage: this.storage,
      user: this.state.user,
    };
  }

  render() {
    let component = <Loading />;
    if (!this.state.loading) {
      if (this.state.user == null) {
        component = <Login onClick={this.signIn} />
      } else {
        component = (
          <Router history={browserHistory}>
            <Route path="/" component={App}>
              <IndexRoute component={ProductList} />
              <Route path="/products" component={ProductList} />
              <Route path="/categories" component={CategoryList} />
            </Route>
          </Router>
        )
      }
    }
    return component;
  }
}

FirebaseApp.childContextTypes = {
  auth: React.PropTypes.object,
  database: React.PropTypes.object,
  signOut: React.PropTypes.func,
  storage: React.PropTypes.object,
  user: React.PropTypes.object,
};

export default FirebaseApp;
