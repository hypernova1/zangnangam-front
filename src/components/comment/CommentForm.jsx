import React, {useEffect, useState} from 'react';
import './CommentForm.css';

const CommentForm = ({ postId, userSummary, onClickWriteComment }) => {
  const [commentForm, setCommentForm] = useState({
    email: '',
    nonMemberName: '',
    nonMemberPwd: '',
    content: '',
    postId,
  });
  const [commentValid] = useState({
    writer: false,
    content: false,
  });

  useEffect(() => {
    if (userSummary.email) {
      setCommentForm({
        ...commentForm,
        email: userSummary.email,
      });
      return;
    }
    setCommentForm({
      ...commentForm,
      email: '',
    });
  }, [userSummary.email]);

  const handleChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const writer = !!(userSummary.email || (commentForm.nonMemberName && commentForm.nonMemberPwd));
    const content = !!commentForm.content;
    if (!writer) {
      alert('이름을 입력해주세요.');
      return false;
    }
    if (!content) {
      alert('댓글 내용을 입력해주세요.');
      return false;
    }
    return writer && content;
  };

  const submitForm = () => {
    const result = validateForm();
    if (!result) return;
    onClickWriteComment(commentForm);
    setCommentForm({
      ...commentForm,
      nonMemberName: '',
      nonMemberPwd: '',
      content: '',
    });
  };

  return (
    <form className="CommentForm">
      <div className="CommentWriter">
        { userSummary.id ? (
          <>
            <div className="LoginMemberName">{userSummary.name}</div>
          </>
        ) : (
          <>
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
          </>
        )}
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
          onClick={submitForm}
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
