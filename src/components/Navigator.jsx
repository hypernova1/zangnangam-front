import React from 'react';
import './Navigator.css';
import { NavLink, Switch } from 'react-router-dom';

const Navigator = () => {
  return (
    <aside className="MenuBar">
      <NavLink exact to="/" className="logo">ZangNanGam</NavLink>
      <nav>
        <ul>
          <li>
            <NavLink to="/best" className="link" activeClassName="is-active">인기글</NavLink>
          </li>
          <li>
            <NavLink to="/new" className="link" activeClassName="is-active">최신글</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Navigator;
