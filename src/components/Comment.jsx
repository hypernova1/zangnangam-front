import React from 'react';
import './Comment.css';

const Comment = ({ comment }) => {
  return (
    <li className="Comment">
      <div className="CommentWriter">{ comment.writer.name }</div>
      <div className="CommentWriteDate">{ comment.created }</div>
      <div className="CommentContent">{ comment.comment }</div>
    </li>
  );
};

export default Comment;