import React from 'react';
import './CategoryInfo.css';

const CategoryInfo = ({ category }) => {
  return (
    <div className="CategoryInfo">
      <div>Name</div>
      <input type="text" value={category.name} />
      <div>Path</div>
      <input type="text" value={category.path} />
      <div>Role</div>
      <input type="text" />
    </div>
  );
};

export default CategoryInfo;