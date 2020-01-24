import React, { useState, useEffect } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { loginThunk } from '../reducers/auth';

const Login = ({ loginThunk, isAuthenticated }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { form: { pathname: '/' } };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);
  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  const handleClick = async () => {
    const result = await loginThunk(form.email, form.password);
    if (result) {
      history.push(from);
    } else {
      alert('계정 정보가 일치하지 않습니다.');
    }
  };
  return (
    <div className="LoginTemplate">
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
          <input type="password" value={form.password} id="password" onChange={updateField} />
        </div>
      </div>
      <div className="LoginBtnWrap">
        <button type="button" onClick={handleClick}>로그인</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loginThunk: (email, password) => dispatch(loginThunk(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
