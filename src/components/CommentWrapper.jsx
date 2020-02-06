import React from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './CommentWrapper.css';

const CommentWrapper = ({ comments, postId, categoryPath, onClickWriteComment, userSummary }) => (
  <div className="CommentWrapper">
    <CommentForm
      postId={postId}
      categoryPath={categoryPath}
      onClickWriteComment={onClickWriteComment}
      userSummary={userSummary}
    />
    <ul className="CommentList">
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
);

const mapStateToProps = (state) => ({
  userSummary: state.auth.userSummary,
});

export default connect(mapStateToProps)(CommentWrapper);
