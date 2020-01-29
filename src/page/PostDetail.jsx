import React, { useEffect, useState } from 'react';
import { getPostDetail } from '../api';
import './PostDetail.css';

const PostDetail = ({ match }) => {
  const { category, postId } = match.params;
  const [post, setPost] = useState({});

  useEffect(() => {
    getPostDetail(category, postId)
      .then(res => res.data)
      .then(data => {
        setPost(data);
      });
  }, [postId]);
  return (
    <article className="PostDetail">
      <div className="PostHeader">
        <h2 className="PostTitle">{post.title}</h2>
      </div>
      <div className="PostBody">
        <div className="PostContent">{post.content}</div>
      </div>
    </article>
  );
};

export default PostDetail;
