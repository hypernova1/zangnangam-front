import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CategoryItem, CategoryInfo, Warning } from '../components';
import { updateCategory } from '../reducers/category';
import { getCategories } from '../api';
import './CategoryManager.css';

const CategoryManager = ({ categories, updateCategory }) => {

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  useEffect(() => {
    getCategories()
      .then((res) => res.data)
      .then((data) => {
        updateCategory(data);
      });
  }, []);

  const viewCategoryInfo = (id) => {
    setActiveCategory(categories[id]);
  };

  return (
    <>
      <h1 className="CategoryName">메뉴 변경</h1>
      <div className="CategoryManager">
        <div className="CategoryListWrap">
          <button type="button" className="CategoryCreateButton">+</button>
          <button type="button" className="CategoryRemoveButton">-</button>
          <ul className="CategoryList">
            {
              categories && categories.map((category, index) => (
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManager);
