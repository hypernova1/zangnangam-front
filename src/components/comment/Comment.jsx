import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Comment.css';

const Comment = ({ comment, postId, userEmail, onClickModifyComment, onClickRemoveComment }) => {
  const [modifyState, setModifyState] = useState(false);
  const [commentData, setCommentData] = useState({
    ...comment,
  });

  const handleModify = () => {
    setModifyState(!modifyState);
  };

  const handleChange = (e) => {
    setCommentData({
      ...commentData,
      content: e.target.value,
      postId,
    });
  };

  const handleClick = () => {
    onClickModifyComment(commentData);
    setModifyState(!modifyState);
  };

  const handleRemove = () => {
    onClickRemoveComment(commentData.id, postId);
  };

  const renderModifyButton = () => {
    if (commentData.nonMemberName) return;
    return userEmail === commentData.writer.email && (
      <div className="CommentModifyButtonWrap">
        {
          modifyState ? (
            <button
              className="CommentConfirmButton"
              type="button"
              onClick={handleClick}
            >
              완료
            </button>
          ) : (
            <>
              <button
                className="CommentModifyButton"
                type="button"
                onClick={handleModify}
              >
                수정
              </button>
              <button
                className="CommentDeleteButton"
                type="button"
                onClick={handleRemove}
              >
                삭제
              </button>
            </>
          )
        }
      </div>
    );
  };

  return (
    <li className="Comment">
      <div className="CommentWriter">{ commentData.writer ? commentData.writer.name : commentData.nonMemberName }</div>
      <div className="CommentWriteDate">{ commentData.created }</div>
      <div className="CommentContent">
        {
          modifyState ? (
            <div className="ModifyCommentForm">
              <textarea
                value={commentData.content}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div>{ commentData.content }</div>
          )
        }
      </div>
      { renderModifyButton() }
    </li>
  );
};

const mapStateToProps = (state) => ({
  userEmail: state.auth.userSummary.email,
});

export default connect(mapStateToProps)(Comment);
