import React from 'react';
import { NavLink } from 'react-router-dom';
import './Post.css';

const Post = ({ item, category }) => {
  return (
    <article
      className="PostWrapper"
    >
      <div className="PostWriteDate">{ item.created }</div>
      <NavLink to={`/${category}/${item.id}`} className="PostTitle">
        { item.title }
      </NavLink>
    </article>
  );
};

export default Post;
