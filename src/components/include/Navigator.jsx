import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navigator.css';
import NavigatorItem from './NavigatorItem';
import gear from '../../image/gear.png';

const Navigator = ({ userRole, categories }) => {
  const history = useHistory();
  useEffect(() => {
  }, [categories]);

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
                key={category.id}
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
