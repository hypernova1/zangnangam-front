import React, {useEffect, useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navigator.css';
import NavigatorItem from './NavigatorItem';
import { getCategories } from '../../api';
import gear from '../../image/gear.png';

const Navigator = ({ userRole }) => {
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getCategories()
      .then(res => res.data)
      .then(data => {
        setCategories(data);
      });
  }, [categories.length]);

  const handleCategory = () => {
    history.push('/category/manage');
  };

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
      {
        userRole === 'admin' && (
          <div className="MenuSettingButtonWrap">
            <img
              className="MenuSettingButton"
              src={gear}
              alt="메뉴 설정"
              onClick={handleCategory}
            />
          </div>
        )
      }
    </aside>
  );
};

const mapStateToProps = (state) => ({
  userRole: state.auth.userSummary.role,
});

export default connect(mapStateToProps)(Navigator);
