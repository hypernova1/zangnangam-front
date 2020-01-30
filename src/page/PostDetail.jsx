import React, { useEffect, useState } from 'react';
import { getPostDetail } from '../api';
import './PostDetail.css';
import Comment from '../components/Comment';

const PostDetail = ({ match }) => {
  const { category, postId } = match.params;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostDetail(category, postId)
      .then(res => res.data)
      .then(data => {
        setPost(data);
        setComments(data.comments);
      });
  }, [postId, category]);
  return (
    <article className="PostDetail">
      <div className="PostHeader">
        <h2 className="PostTitle">{post.title}</h2>
        <div className="PostWriteDate">{ post.created }</div>
      </div>
      <div className="PostBody">
        <div className="PostContent">{post.content}</div>
      </div>
      <div className="PostComment">
        <div className="CommentInfo">
          Comment { comments.length }개
        </div>
        <div className="WriteComment">
          <div className="CommentWriter">
            <input type="text" placeholder="아이디" className="WriterId" />
            <input type="password" placeholder="비밀번호" className="WriterPassword" />
          </div>
          <div className="InputComment">
            <textarea />
          </div>
        </div>
        <ul className="CommentWrap">
          {
            comments.map((comment) => (
              <Comment key={comment.id}
                comment={comment}
              />
            ))
          }
        </ul>
      </div>
    </article>
  );
};

export default PostDetail;
