import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Post from '../components/Post';
import { getPostList } from '../api';
import './PostList.css';

const PostList = ({ match, isAuthenticated }) => {

  const { categoryPath } = match.params;
  const [postList, setPostList] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [next, setNext] = useState(false);
  const pageNo = useRef(1);

  useEffect(() => {
    getPostList(categoryPath, pageNo.current)
      .then((res) => res.data)
      .then((data) => {
        setPostList(data.postList);
        setCategoryName(data.categoryName);
        setNext(data.next);
      });
    return () => {
      pageNo.current = 1;
      setPostList([]);
    };
  }, [categoryPath]);

  const getMorePost = () => {
    pageNo.current += 1;
    getPostList(categoryPath, pageNo.current)
      .then((res) => res.data)
      .then((data) => {
        setPostList([...postList, ...data.postList]);
        setNext(data.next);
      });
  };
  return (
    <section className="PostList">
      <div>
        <div className="ButtonWrap">
          <button type="button" className="PostWriteButton">
            {
              isAuthenticated && (
                <NavLink
                  className="WriteButton"
                  to="/write"
                >
                  글쓰기
                </NavLink>
              )
            }
          </button>
        </div>
        <h2 className="CategoryName">{ categoryName }</h2>
      </div>
      {
        postList.map((item) => (
          <Post
            categoryPath={categoryPath}
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

const mapStateToProps = (state) => ({
  userEmail: state.auth.userInfo.email,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PostList);
