import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CommentWrapper } from '../components';
import './PostDetail.css';
import {
  getPostDetail,
  removePost,
  writeComment,
  modifyComment,
  removeComment,
} from '../api';
import { savePost } from '../reducers/post';
import { popupThunk } from '../reducers/popup';

const PostDetail = ({ match, userEmail, savePost, popupThunk }) => {
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

  const modifyPost = () => {
    savePost(post);
    history.push(`/${categoryPath}/modify/${post.id}`);
  };

  const deletePost = () => {
    // eslint-disable-next-line no-restricted-globals,no-alert
    const confirmRemove = confirm('삭제하시겠습니까?');
    if (!confirmRemove) return;
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

  const onClickRemoveComment = (commentId, postId) => {
    removeComment(commentId, postId)
      .then((res) => res.data)
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        console.log(err);
        popupThunk({ message: '권한이 없습니다.' });
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
          dangerouslySetInnerHTML={{
            '__html': post.content,
          }}
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
        onClickRemoveComment={onClickRemoveComment}
      />
    </article>
  );
};

const mapStateToProps = (state) => ({
  userEmail: state.auth.userSummary.email,
});

const mapDispatchToProps = (dispatch) => ({
  savePost: (post) => dispatch(savePost(post)),
  popupThunk: (popup) => dispatch(popupThunk(popup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
