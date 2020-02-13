import React, { useState, useEffect } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { loginThunk } from '../reducers/auth';
import { popupThunk } from '../reducers/popup';

const Login = ({ loginThunk, isAuthenticated, popupThunk }) => {

  const history = useHistory();
  const location = useLocation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (isAuthenticated) {
      history.push(from.pathname);
    }
  }, [isAuthenticated, history, from.pathname]);

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleClick = async () => {
    const result = await loginThunk(form.email, form.password);
    if (result) {
      history.push(from.pathname);
    } else {
      popupThunk({ message: '계정 정보가 일치하지 않습니다.' });
    }
  };
  return (
    <form className="LoginTemplate">
      <div className="LoginInput">
        <div className="Label">
            Email
        </div>
        <div className="Email">
          <input type="text" value={form.email} id="email" onChange={updateField} />
        </div>
      </div>
      <div className="LoginInput">
        <div className="Label">
          Password
        </div>
        <div className="Password">
          <input
            type="password"
            value={form.password}
            id="password"
            onChange={updateField}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleClick();
              }
            }}
            autoComplete="false"
          />
        </div>
      </div>
      <div className="LoginBtnWrap">
        <button type="button" onClick={handleClick}>로그인</button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loginThunk: (email, password) => dispatch(loginThunk(email, password)),
  popupThunk: (popup) => dispatch(popupThunk(popup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
