import React from 'react';
import { connect } from 'react-redux';
import './CategoryForm.css';
import { modifyCategory } from '../../api';
import { updateCategory } from '../../reducers/category';
import { popupThunk } from '../../reducers/popup';

const CategoryForm = ({
  category, mode, setMode, setCategory, updateCategory,
  popupThunk, cancelCategoryForm, registerCategory,
}) => {
  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    modifyCategory(category)
      .then((res) => res.data)
      .then((data) => {
        updateCategory(data);
        popupThunk({ message: '카테고리가 업데이트 되었습니다.' });
      });
  };

  return (
    <div className="CategoryForm">
      <div className="CategoryFormLabel">Name</div>
      <input type="text" name="name" value={category.name} onChange={handleChange} />
      <div className="CategoryFormLabel">Path</div>
      <input type="text" name="path" value={category.path} onChange={handleChange} />
      <div className="CategoryFormLabel">Role</div>
      <select name="role" value={category.role} onChange={handleChange}>
        <option value="all">모든 사람</option>
        <option value="admin">관리자</option>
      </select>
      <div className="CategoryModifyButtonWrap">
        {
          !category.isWrite || mode === 'update' ? (
            <button type="button" onClick={handleClick}>수정</button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  registerCategory(category);
                }}
              >
                등록
              </button>
              <button
                type="button"
                onClick={() => {
                  cancelCategoryForm();
                  setMode('update');
                }}
              >
                취소
              </button>
            </>
          )
        }
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCategory: (categories) => dispatch(updateCategory(categories)),
  popupThunk: (popup) => dispatch(popupThunk(popup)),
});

export default connect(null, mapDispatchToProps)(CategoryForm);