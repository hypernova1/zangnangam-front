import React, {useEffect, useState} from 'react';
import './Navigator.css';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../api';
import gear from '../image/gear.png';

const Navigator = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(res => res.data)
      .then(data => {
        setCategories(data);
      });
  }, [categories.length]);

  return (
    <aside className="MenuBar">
      <NavLink exact to="/" className="logo">ZangNanGam</NavLink>
      <nav>
        <ul className="CategoryTitles">
          {
            categories.map((category, index) => (
              <li key={index}>
                <NavLink
                  to={`/${category.path}`}
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
      <div className="MenuSettingButtonWrap">
        <img
          className="MenuSettingButton"
          src={gear}
          alt="메뉴 설정"
        />
      </div>
    </aside>
  );
};

export default Navigator;
