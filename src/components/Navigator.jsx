import React, {useEffect, useState} from 'react';
import './Navigator.css';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../api';

const Navigator = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(res => res.data)
      .then(data => {
        setCategories(data);
      });
    console.log(categories);
  }, [categories.length]);

  return (
    <aside className="MenuBar">
      <NavLink exact to="/" className="logo">ZangNanGam</NavLink>
      <nav>
        <ul>
          {
            categories.map((category, index) => (
              <li key={index}>
                <NavLink
                  to={`/${category.id}`}
                  className="link"
                  activeClassName="is-active"
                >
                  {category.name}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </nav>
    </aside>
  );
};

export default Navigator;
