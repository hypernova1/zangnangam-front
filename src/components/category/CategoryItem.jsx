import React from 'react';
import './CategoryItem.css';

const CategoryItem = ({ category, viewCategoryInfo, index }) => {
  return (
    <div className="CategoryItem" onClick={() => viewCategoryInfo(index)} role="button">
      <div className="CategoryName">{ category.name }</div>
    </div>
  );
};

export default CategoryItem;
