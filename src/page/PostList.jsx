import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import Post from '../components/Post';
import { getPostList } from '../api';

const PostList = ({ match }) => {
  const { category } = match.params;
  const [postList, setPostList] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    getPostList(category, 1)
      .then((res) => res.data)
      .then((data) => {
        setPostList(data.postList);
        setCategoryName(data.categoryName);
        console.log(postList);
        return () => {
          setPostList([]);
        };
      });
  }, [category]);
  const handleClick = (category, postId) => {

  };
  return (
    <section>
      <h2 className="CategoryName">{ categoryName }</h2>
      {
        postList.map((item) => (
          <Post
            category={category}
            item={item}
            key={item.id}
          />
        ))
      }
    </section>
  );
};

export default PostList;