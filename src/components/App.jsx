import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from './Header';
import Navigator from './Navigator';
import PrivateRoute from './PrivateRoute';

import Main from '../page/Main';
import Login from '../page/Login';
import PostList from '../page/PostList';
import PostDetail from '../page/PostDetail';
import PostWriteForm from '../page/PostWriteForm';

const App = () => {
  return (
    <Router className="MainTemplate">
      <Navigator />
      <Header />
      <section className="MainContent">
        <Switch>
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
        </Switch>
      </section>
    </Router>
  );
};

export default App;
