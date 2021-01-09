import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { getUserSummary } from './api';
import { loginFailure, saveUserSummary } from './reducers/auth';
import { categoryThunk } from './reducers/category';

const Root = ({ isAuthenticated, saveUserSummary, loginFailure, categoryThunk }) => {
  useEffect(() => {
    categoryThunk();
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userSummary: state.auth.userSummary,
});

const mapDispatchToProps = (dispatch) => ({
  saveUserSummary: (userSummary) => dispatch(saveUserSummary(userSummary)),
  loginFailure: () => dispatch(loginFailure()),
  categoryThunk: () => dispatch(categoryThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);