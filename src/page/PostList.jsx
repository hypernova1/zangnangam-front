import React, { useEffect, useState, useRef } from 'react';
import Post from '../components/Post';
import { getPostList } from '../api';
import './PostList.css';

const PostList = ({ match }) => {

  const { category } = match.params;
  const [postList, setPostList] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [next, setNext] = useState(false);
  const pageNo = useRef(1);

  const fetchData = () => {
    getPostList(category, pageNo.current)
      .then((res) => res.data)
      .then((data) => {
        setPostList(data.postList);
        setCategoryName(data.categoryName);
        setNext(data.next);
      });
  };

  useEffect(() => {
    fetchData();
    return () => {
      pageNo.current = 1;
      setPostList([]);
    };
  }, [category]);

  const getMorePost = () => {
    pageNo.current += 1;
    getPostList(category, pageNo.current)
      .then((res) => res.data)
      .then((data) => {
        setPostList([...postList, ...data.postList]);
        setNext(data.next);
      });
  };
  return (
    <section className="PostList">
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
      {
        next && (
          <div
            className="MoreView"
            onClick={getMorePost}
            role="button"
            tabIndex="0"
          >
            더 보기
          </div>
        )
      }

    </section>

  );
};

export default PostList;
