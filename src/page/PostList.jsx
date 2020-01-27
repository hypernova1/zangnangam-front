import React, { useEffect } from 'react';
import Post from '../components/Post';
import { getPostList}  from '../api';

const PostList = ({ match }) => {
  useEffect(() => {
    const { category } = match.params;
    getPostList(category, 1)
      .then(res => res.data)
      .then(data => console.log(data.content));
  });
  return (
    <div>New Post</div>
  );
};

export default PostList;