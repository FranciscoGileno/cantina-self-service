import React from 'react';
import App from './App';
import ProductList from './products/product-list';
import CategoryList from './categories/CategoryList';
import OrderList from './orders/order-list';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import firebase from 'firebase';

const flexCenter = {
  alignItems: 'center',
  justifyContent: 'center',
};

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

  componentDidUpdate() {
    window.componentHandler.upgradeDom();
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
    let component = <FirebaseApp.Loading />;
    if (!this.state.loading) {
      if (this.state.user == null) {
        component = <FirebaseApp.Login onClick={this.signIn} />
      } else {
        component = (
          <Router history={browserHistory}>
            <Route path="/" component={App}>
              <IndexRoute component={ProductList} />
              <Route path="/products" component={ProductList} />
              <Route path="/categories" component={CategoryList} />
              <Route path="/orders" component={OrderList} />
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

FirebaseApp.Loading = () => (
  <div className="mdl-layout mdl-js-layout mdl-color--grey-200" style={flexCenter}>
    <div className="mdl-spinner mdl-js-spinner is-active"></div>
  </div>
);

FirebaseApp.Login = ({onClick}) => (
  <div className="mdl-layout mdl-js-layout mdl-color--grey-200" style={flexCenter}>
    <button onClick={onClick} className="mdl-button mdl-js-button mdl-button--raised" style={{height: 64}}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px"
        viewBox="0 0 48 48">
          <g>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </g>
        </svg>
        <span style={{marginLeft: 20}}>Sign In with Google</span>
    </button>
  </div>
);

export default FirebaseApp;
