import React from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './CommentWrapper.css';

const CommentWrapper = ({ comments, postId, categoryPath, onClickWriteComment }) => (
  <div className="CommentWrapper">
    <CommentForm
      postId={postId}
      categoryPath={categoryPath}
      onClickWriteComment={onClickWriteComment}
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
  userEmail: state.auth.userSummary.email,
});

export default connect(mapStateToProps)(CommentWrapper);
