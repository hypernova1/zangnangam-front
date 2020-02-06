import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPostDetail, writeComment, removePost } from '../api';
import './PostDetail.css';
import Comment from '../components/Comment';
import { savePost } from '../reducers/post';

const PostDetail = ({ match, userEmail, savePost }) => {
  const { categoryPath, postId } = match.params;
  const history = useHistory();
  const [post, setPost] = useState({});
  const [writerEmail, setWriterEmail] = useState('');
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    userInfo: {},
    nonMemberName: '',
    nonMemberPwd: '',
    content: '',
    postId,
    categoryPath,
  });

  useEffect(() => {
    getPostDetail(categoryPath, postId)
      .then((res) => res.data)
      .then((data) => {
        setPost(data);
        setWriterEmail(data.writer.email);
        setComments(data.comments);
      });
  }, [categoryPath, postId]);

  const createMarkUp = () => ({
    __html: post.content,
  });

  const handleChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value,
    });
  };

  const onClickWriteComment = () => {
    writeComment(commentForm)
      .then((res) => res.data)
      .then((data) => {
        setComments(data);
        setCommentForm({
          ...commentForm,
          nonMemberName: '',
          nonMemberPwd: '',
          content: '',
        });
      });
  };

  const modifyPost = () => {
    savePost(post);
    history.push(`/${categoryPath}/modify/${post.id}`);
  };

  const deletePost = () => {
    // eslint-disable-next-line no-restricted-globals,no-alert
    const _confirm = confirm('삭제하시겠습니까?');
    if(!_confirm) return;
    removePost(postId, categoryPath)
      .then((res) => res.data)
      .then(() => {
        history.push(`/${categoryPath}`);
      })
      .catch((error) => alert(error));
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
      <div className="PostComment">
        <div className="CommentInfo">
          Comment
          {' '} { comments.length }
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
        <form className="WriteComment">
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
              onClick={onClickWriteComment}
            >
              등록
            </button>
          </div>
        </form>
        <ul className="CommentWrap">
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
