import React from 'react';
import './Comment.css';

const Comment = ({ comment }) => {
  return (
    <li className="Comment">
      <div className="CommentWriter">{ comment.writer ? comment.writer.name : comment.nonMemberName }</div>
      <div className="CommentWriteDate">{ comment.created }</div>
      <div className="CommentContent">{ comment.content }
        {/*<div className="ModifyCommentForm">
          <textarea />
        </div>*/}
      </div>
    </li>
  );
};

export default Comment;
