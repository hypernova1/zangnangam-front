import React from 'react';
import { NavLink } from 'react-router-dom';
import './Post.css';

const Post = ({ item, category }) => {
  return (
    <article
      className="PostWrapper"
    >
      <NavLink to={`/${category}/${item.id}`} className="PostTitle">
        { item.title }
      </NavLink>
      <div className="PostWriter">{ item.writer.name }</div>
    </article>
  );
};

export default Post;
