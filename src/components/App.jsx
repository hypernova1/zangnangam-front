import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom';
import Header from './Header';
import Navigator from './Navigator';

import BestPost from '../page/BestPost';
import NewPost from '../page/NewPost';

import Login from '../page/Login';

const App = () => {
  return (
    <Router className="MainTemplate">
      <Navigator />
      <Header />
      <section className="MainContent">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/best" component={BestPost} />
          <Route path="/new" component={NewPost} />
        </Switch>
      </section>
    </Router>
  );
};

export default App;
