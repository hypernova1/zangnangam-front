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

  const { from } = location.state || { form: {pathname: '/'} };

  useEffect(() => {
    console.log(form.email);
  }, [form]);
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
      <label htmlFor="email">
        Email
        <input type="text" value={form.email} id="email" onChange={updateField} />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" value={form.password} id="password" onChange={updateField} />
      </label>
      <button type="button" onClick={handleClick}>로그인</button>
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
