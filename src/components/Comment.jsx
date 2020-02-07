import React, { useState } from 'react';
import './Comment.css';

const Comment = ({ comment, postId, onClickModifyComment, onClickDeleteComment }) => {
  const [modifyState, setModifyState] = useState(false);
  const [commentData, setCommentData] = useState(comment);

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
    onClickDeleteComment(commentData.id, postId);
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
    </li>
  );
};

export default Comment;
