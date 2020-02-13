import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { CategoryItem, CategoryInfo } from '../components';
import { updateCategory } from '../reducers/category';
import { createCategory, removeCategory } from '../api';
import { popupThunk } from '../reducers/popup';
import { openModal } from '../reducers/modal';
import './CategoryManager.css';

const CategoryManager = ({ categories, updateCategory, popupThunk, openModal }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [mode, setMode] = useState('update');

  useEffect(() => {
    setCategoryList(categories);
  }, [categories]);

  const viewCategoryInfo = (id) => {
    setActiveCategory(categoryList[id]);
  };

  const createCategoryForm = () => {
    if (mode === 'create') {
      popupThunk({ message: '이미 등록하려는 메뉴가 있습니다.' });
      return;
    }
    setMode('create');
    const lastElem = categoryList[categoryList.length - 1];
    const newId = lastElem.id + 1;
    const newOrderNo = lastElem.orderNo + 1;

    setCategoryList(() => [
      ...categoryList,
      {
        id: newId,
        name: '새 메뉴 등록',
        path: '',
        role: 'all',
        orderNo: newOrderNo,
        isWrite: true,
      },
    ]);
  };

  const cancelCategoryForm = () => {
    setCategoryList(categoryList.slice(0, -1));
  };

  const registerCategory = (category) => {
    createCategory(category)
      .then((res) => res.data)
      .then((data) => {
        popupThunk({ message: '메뉴 등록이 완료되었습니다.' });
        updateCategory(data);
      });
  };

  const deleteCategory = () => {
    if (activeCategory.isWrite) {
      popupThunk({ message: '등록 중인 메뉴는 삭제할 수 없습니다.' });
      return;
    }
    openModal({
      message: '정말 삭제하시겠습니까?',
      func: () => {
        removeCategory(activeCategory)
          .then((res) => res.data)
          .then((data) => {
            popupThunk({ message: '메뉴가 삭제되었습니다.' });
            updateCategory(data);
          });
      },
    });
  };

  return (
    <>
      <h1 className="CategoryName">메뉴 변경</h1>
      <div className="CategoryManager">
        <div className="CategoryListWrap">
          <button type="button" className="CategoryCreateButton" onClick={createCategoryForm}>+</button>
          <button type="button" className="CategoryRemoveButton" onClick={deleteCategory}>-</button>
          <ul className="CategoryList">
            {
              categoryList && categoryList.map((category, index) => (
                <CategoryItem
                  category={category}
                  activeCategory={activeCategory.id}
                  index={index}
                  viewCategoryInfo={viewCategoryInfo}
                  key={category.id}
                />
              ))
            }
          </ul>
        </div>
        <CategoryInfo
          category={activeCategory}
          setCategory={setActiveCategory}
          cancelCategoryForm={cancelCategoryForm}
          registerCategory={registerCategory}
          mode={mode}
          setMode={setMode}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category,
});

const mapDispatchToProps = (dispatch) => ({
  updateCategory: (categories) => dispatch(updateCategory(categories)),
  popupThunk: (popup) => dispatch(popupThunk(popup)),
  openModal: (modal) => dispatch(openModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManager);
