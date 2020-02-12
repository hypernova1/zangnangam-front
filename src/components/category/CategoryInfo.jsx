import React, { useState } from 'react';
import { connect } from 'react-redux';
import './CategoryInfo.css';
import { modifyCategory } from '../../api';
import { updateCategory } from '../../reducers/category';
import {Warning} from "../index";

const CategoryInfo = ({ category, setCategory, updateCategory }) => {

  const [warningMessage, setWarningMessage] = useState('');
  const [warningVisibility, setWarningVisibility] = useState(false);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const showWarning = (message) => {
    setWarningMessage(message);
    setWarningVisibility(true);
    setTimeout(() => {
      setWarningVisibility(false);
    }, 1500);
  };

  const handleClick = () => {
    modifyCategory(category)
      .then((res) => res.data)
      .then((data) => {
        updateCategory(data);
        showWarning('카테고리가 업데이트 되었습니다.');
      });
  };

  return (
    <div className="CategoryInfo">
      <div className="CategoryInfoLabel">Name</div>
      <input type="text" name="name" value={category.name} onChange={handleChange} />
      <div className="CategoryInfoLabel">Path</div>
      <input type="text" name="path" value={category.path} onChange={handleChange} />
      <div className="CategoryInfoLabel">Role</div>
      <select name="role" value={category.role} onChange={handleChange}>
        <option value="all">모든 사람</option>
        <option value="admin">관리자</option>
      </select>
      <div className="CategoryModifyButtonWrap">
        <button type="button" onClick={handleClick}>수정</button>
      </div>
      <Warning visible={warningVisibility} message={warningMessage} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCategory: (categories) => dispatch(updateCategory(categories)),
});

export default connect(null, mapDispatchToProps)(CategoryInfo);