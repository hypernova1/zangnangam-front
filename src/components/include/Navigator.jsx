import React, {useEffect, useState} from 'react';
import './Navigator.css';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../../api';
import NavigatorItem from './NavigatorItem';

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
      <NavLink exact to="/" className="Logo">ZangNanGam</NavLink>
      <nav>
        <ul className="CategoryTitles">
          {
            categories.map((category, index) => (
              <NavigatorItem
                index={index}
                category={category}
                key={index}
              />
            ))
          }
        </ul>
      </nav>
    </aside>
  );
};

export default Navigator;
