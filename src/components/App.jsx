import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from './Header';
import Navigator from './Navigator';
import PrivateRoute from './PrivateRoute';

import PostList from '../page/PostList';
import PostDetail from '../page/PostDetail';
import PostWriteForm from '../page/PostWriteForm';

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
          <Route exact path="/write" component={PostWriteForm} />
          <Route exact path="/modify/:category/:postId" component={PostWriteForm} />
          <Route exact path="/:category" component={PostList} />
          <Route path="/:category/:postId" component={PostDetail} />
        </Switch>
      </section>
    </Router>
  );
};

export default App;
