import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CategoryItem, CategoryInfo } from '../components';
import './CategoryManager.css';

const CategoryManager = ({ categories }) => {

  const [category, setCategory] = useState(categories[0]);

  const viewCategoryInfo = (id) => {
    setCategory(categories[id]);
  };

  return (
    <div className="CategoryManager">
      <div className="CategoryListWrap">
        <button type="button" className="CategoryCreateButton">+</button>
        <button type="button" className="CategoryRemoveButton">-</button>
        <ul className="CategoryList">
          {
            categories && categories.map((category, index) => (
              <CategoryItem
                category={category}
                index={index}
                viewCategoryInfo={viewCategoryInfo}
                key={category.id}
              />
            ))
          }
        </ul>
      </div>
      <CategoryInfo category={category} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category,
});

export default connect(mapStateToProps)(CategoryManager);
