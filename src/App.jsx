import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/include/Header';
import Navigator from './components/include/Navigator';
import Footer from './components/include/Footer';
import PrivateRoute from './components/util/PrivateRoute';

import Main from './page/Main';
import Login from './page/Login';
import PostList from './page/PostList';
import PostDetail from './page/PostDetail';
import PostWriteForm from './page/PostWriteForm';
import CategoryManager from './page/CategoryManager';
import NotFound from './page/NotFound';

import { getUserSummary } from './api';
import { saveUserSummary, loginFailure } from './reducers/auth';

const App = ({ isAuthenticated, userSummary, saveUserSummary, loginFailure }) => {
  useEffect(() => {
    if (isAuthenticated && !userSummary.email) {
      getUserSummary()
        .then((res) => res.data)
        .then((data) => {
          saveUserSummary(data);
        })
        .catch((err) => {
          console.error(err);
          loginFailure();
        });
    }
  });

  return (
    <Router className="MainTemplate">
      <Navigator />
      <Header />
      <section className="MainContent">
        <Switch>
          <Route exact path="/notfound" component={NotFound} />
          <Route exact path="/category/manage" component={CategoryManager} />
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <PrivateRoute
            path="/write"
            component={PostWriteForm}
          />
          <PrivateRoute
            path="/:categoryPath/modify/:postId"
            component={PostWriteForm}
          />
          <Route exact path="/:categoryPath" component={PostList} />
          <Route exact path="/:categoryPath/:postId" component={PostDetail} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </section>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userSummary: state.auth.userSummary,
});

const mapDispatchToProps = (dispatch) => ({
  saveUserSummary: (userSummary) => dispatch(saveUserSummary(userSummary)),
  loginFailure: () => dispatch(loginFailure()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
