import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPostDetail } from '../api';
import './PostDetail.css';
import Comment from '../components/Comment';

const PostDetail = ({ match, userEmail }) => {
  const { category, postId } = match.params;
  const [post, setPost] = useState({});
  const [writerEmail, setWriterEmail] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostDetail(category, postId)
      .then(res => res.data)
      .then(data => {
        setPost(data);
        setWriterEmail(data.writer.email);
        setComments(data.comments);
      });
  }, [postId, category]);

  const createMarkUp = () => ({
    __html: post.content,
  });
  return (
    <article className="PostDetail">
      <div className="PostHeader">
        <h2 className="PostTitle">{post.title}</h2>
        <div className="PostWriteDate">{ post.created }</div>
      </div>
      <div className="PostBody">
        <div
          className="PostContent"
          dangerouslySetInnerHTML={createMarkUp()}
        />
      </div>
      <div className="PostComment">
        <div className="CommentInfo">
          Comment { comments.length }
          {
            userEmail === writerEmail && (
              <div className="PostButton">
                <button className="ModifyButton">수정</button>
                <button className="RemoveButton">삭제</button>
              </div>
            )
          }
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

const mapStateToProps = (state) => ({
  userEmail: state.auth.userInfo.email,
});


export default connect(mapStateToProps)(PostDetail);
