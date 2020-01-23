import React from 'react';
import './Header.css';
import { connect } from 'react-redux';


const Header = ({ isAuthenticated }) => {
  return (
    <div className="Header">
      <h2>Header</h2>
      {
        isAuthenticated ? (
          <button type="button">로그아웃</button>
        ) : (
          <button type="button">로그인</button>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Header);
