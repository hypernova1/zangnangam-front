import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import './Navigator.css';
import NavigatorItem from './NavigatorItem';
import { getCategories } from '../../api';
import gear from '../../image/gear.png';

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
