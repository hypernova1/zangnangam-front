import React, { useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ postId, categoryPath, onClickWriteComment }) => {
  const [commentForm, setCommentForm] = useState({
    userInfo: {},
    nonMemberName: '',
    nonMemberPwd: '',
    content: '',
    postId,
    categoryPath,
  });

  const handleChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="CommentForm">
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
          autoComplete="true"
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
          onClick={() => {
            onClickWriteComment(commentForm);
            setCommentForm({
              ...commentForm,
              nonMemberName: '',
              nonMemberPwd: '',
              content: '',
            });
          }}
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
