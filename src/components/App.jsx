import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from './Header';
import Navigator from './Navigator';
import PrivateRoute from './PrivateRoute';

import PostList from '../page/PostList';
import Post from '../page/Post';

import Login from '../page/Login';

const App = () => {
  return (
    <Router className="MainTemplate">
      <Navigator />
      <Header />
      <section className="MainContent">
        <Switch>
          <Route path="/login" component={Login} />
          {/*
          <PrivateRoute path="/:category">
            <BestPost />
          </PrivateRoute>
          */}
          <Route exact path="/:category" component={PostList} />
          <Route path="/:category/:postId" component={Post} />
        </Switch>
      </section>
    </Router>
  );
};

export default App;
