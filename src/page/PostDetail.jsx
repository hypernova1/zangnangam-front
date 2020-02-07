import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CommentWrapper from '../components/CommentWrapper';
import './PostDetail.css';
import {
  getPostDetail,
  removePost,
  writeComment,
  modifyComment,
  removeComment,
} from '../api';
import { savePost } from '../reducers/post';

const PostDetail = ({ match, userEmail, savePost }) => {
  const { categoryPath, postId } = match.params;
  const history = useHistory();
  const [post, setPost] = useState({});
  const [writerEmail, setWriterEmail] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostDetail(categoryPath, postId)
      .then((res) => res.data)
      .then((data) => {
        setPost(data);
        setWriterEmail(data.writer.email);
        setComments(data.comments);
      })
      .catch((err) => {
        console.error(err);
        history.push('/notfound');
      });
  }, [categoryPath, postId]);

  const createMarkUp = () => ({
    __html: post.content,
  });

  const modifyPost = () => {
    savePost(post);
    history.push(`/${categoryPath}/modify/${post.id}`);
  };

  const deletePost = () => {
    // eslint-disable-next-line no-restricted-globals,no-alert
    const _confirm = confirm('삭제하시겠습니까?');
    if (!_confirm) return;
    removePost(postId, categoryPath)
      .then((res) => res.data)
      .then(() => {
        history.push(`/${categoryPath}`);
      })
      .catch((error) => console.error(error));
  };

  const onClickWriteComment = (commentForm) => {
    writeComment(commentForm)
      .then((res) => res.data)
      .then((data) => setComments(data));
  };

  const onClickModifyComment = (comment) => {
    modifyComment(comment)
      .then((res) => res.data)
      .then((data) => setComments(data));
  };

  const onClickDeleteComment = (commentId, postId) => {
    removeComment(commentId, postId)
      .then((res) => res.data)
      .then((data) => {
        setComments(data);
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
      <div className="CommentInfo">
        Comment: { comments.length }
        {
          userEmail === writerEmail && (
            <div className="PostButton">
              <button type="button" className="ModifyButton" onClick={modifyPost}>
                수정
              </button>
              <button
                type="button"
                className="RemoveButton"
                onClick={deletePost}
              >
                삭제
              </button>
            </div>
          )
        }
      </div>
      <CommentWrapper
        comments={comments}
        postId={postId}
        categoryPath={categoryPath}
        onClickWriteComment={onClickWriteComment}
        onClickModifyComment={onClickModifyComment}
        onClickDeleteComment={onClickDeleteComment}
      />
    </article>
  );
};

const mapStateToProps = (state) => ({
  userEmail: state.auth.userSummary.email,
});

const mapDispatchToProps = (dispatch) => ({
  savePost: (post) => dispatch(savePost(post)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
