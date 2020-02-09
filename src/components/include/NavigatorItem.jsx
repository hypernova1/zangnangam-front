import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigatorItem.css';

const NavigatorItem = ({ category }) => (
  <li className="NavigationItem">
    <NavLink
      to={`/${category.path}`}
      className="Link"
      activeClassName="is-active"
    >
      {category.name}
    </NavLink>
  </li>
);

export default NavigatorItem;
