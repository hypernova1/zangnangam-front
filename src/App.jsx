import React, { useEffect } from 'react';
import {
  Switch, Route, useLocation,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Header, Navigator, Footer, PrivateRoute, FlashPopup, ConfirmModal
} from './components';
import {
  CategoryManager, Main, Login, PostList, PostDetail, PostWriteForm, NotFound,
} from './page';
import './App.css';

const App = ({ categories }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (err) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <>
      <Navigator categories={categories} />
      <Header />
      <section className="ContentWrap">
        <div className="MainContent">
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
        </div>
        <Footer />
      </section>
      <FlashPopup />
      <ConfirmModal />
    </>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category,
});


export default connect(mapStateToProps)(App);
