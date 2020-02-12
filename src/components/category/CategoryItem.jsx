import React from 'react';
import './CategoryItem.css';

const CategoryItem = ({ category, viewCategoryInfo, index, activeCategory }) => {
  return (
    <div
      className={`CategoryItem${ category.id === activeCategory ? ' isActive' : '' }`}
      onClick={() => viewCategoryInfo(index)}
      role="button"
    >
      <div className="CategoryValue">{ category.name }</div>
    </div>
  );
};

export default CategoryItem;
