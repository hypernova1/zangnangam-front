import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/auth';

const Header = ({ isAuthenticated, logout }) => {
  return (
    <div className="Header">
      <h2>Header</h2>
      {
        isAuthenticated ? (
          <button
            type="button"
            className="AuthButton"
            onClick={logout}
          >
            로그아웃
          </button>
        ) : (
          <Link
            className="AuthButton"
            to="/login"
          >
            로그인
          </Link>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
