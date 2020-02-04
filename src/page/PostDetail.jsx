import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPostDetail, writeComment } from '../api';
import './PostDetail.css';
import Comment from '../components/Comment';

const PostDetail = ({ match, userEmail }) => {
  const { category, postId } = match.params;
  const [post, setPost] = useState({});
  const [writerEmail, setWriterEmail] = useState('');
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    userInfo: {},
    nonMemberName: '',
    nonMemberPwd: '',
    content: '',
    postId,
    category,
  });

  useEffect(() => {
    getPostDetail(category, postId)
      .then(res => res.data)
      .then(data => {
        setPost(data);
        setWriterEmail(data.writer.email);
        setComments(data.comments);
      });
  }, []);

  const createMarkUp = () => ({
    __html: post.content,
  });

  const handleChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value,
    });
  };
  const onClickWriteComment = () => {
    writeComment(commentForm)
      .then((res) => res.data)
      .then((data) => {
        setComments(data);
        setCommentForm({
          ...commentForm,
          nonMemberName: '',
          nonMemberPwd: '',
          content: '',
        });
      });
  };
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
                <button type="button" className="ModifyButton">
                  <NavLink to={`/modify/${category}/${post.id}`}>수정</NavLink>
                </button>
                <button type="button" className="RemoveButton">삭제</button>
              </div>
            )
          }
        </div>
        <div className="WriteComment">
          <div className="CommentWriter">
            <input
              type="text"
              placeholder="이름"
              className="WriterName"
              name="nonMemberName"
              onChange={handleChange}
              value={commentForm.nonMemberName}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="WriterPassword"
              name="nonMemberPwd"
              onChange={handleChange}
              value={commentForm.nonMemberPwd}
            />
          </div>
          <div className="InputComment">
            <textarea
              name="content"
              onChange={handleChange}
              value={commentForm.content}
            />
          </div>
          <div className="CommentButtonWrap">
            <button
              type="button"
              className="CommentButton"
              onClick={onClickWriteComment}
            >
              등록
            </button>
          </div>
        </div>
        <ul className="CommentWrap">
          {
            comments.map((comment) => (
              <Comment
                key={comment.id}
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
