import React, { useState } from 'react';
import { connect } from 'react-redux';
import './CategoryInfo.css';
import { modifyCategory } from '../../api';
import { updateCategory } from '../../reducers/category';
import { popupThunk } from '../../reducers/popup';

const CategoryInfo = ({ category, setCategory, updateCategory, popupThunk }) => {

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const showWarning = (message) => {
    popupThunk({ message });
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
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCategory: (categories) => dispatch(updateCategory(categories)),
  popupThunk: (popup) => dispatch(popupThunk(popup)),
});

export default connect(null, mapDispatchToProps)(CategoryInfo);