import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Header, Navigator, Footer, PrivateRoute, FlashPopup, ConfirmModal
} from './components';
import {
  CategoryManager, Main, Login, PostList, PostDetail, PostWriteForm, NotFound,
} from './page';
import './App.css';

import { getUserSummary } from './api';
import { saveUserSummary, loginFailure } from './reducers/auth';
import { categoryThunk } from './reducers/category';

const App = ({
  isAuthenticated, saveUserSummary, loginFailure, categories, categoryThunk,
}) => {
  useEffect(() => {
    if (!categories.length) {
      categoryThunk();
    }

    if (isAuthenticated) {
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
  }, [isAuthenticated]);

  return (
    <>
      <Router className="MainTemplate">
        <Navigator categories={categories} />
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
      <FlashPopup />
      <ConfirmModal />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userSummary: state.auth.userSummary,
  categories: state.category,
});

const mapDispatchToProps = (dispatch) => ({
  saveUserSummary: (userSummary) => dispatch(saveUserSummary(userSummary)),
  loginFailure: () => dispatch(loginFailure()),
  categoryThunk: () => dispatch(categoryThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
