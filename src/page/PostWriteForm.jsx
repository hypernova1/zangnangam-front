import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './PostWriteForm.css';
import {
  getCategories,
  writePost,
  modifyPost,
} from '../api';
import { popupThunk } from '../reducers/popup';

const PostWriteForm = ({ match, userEmail, post, popupThunk }) => {

  const { postId } = match.params;
  const [categoryList, setCategoryList] = useState([]);
  const [form, setForm] = useState({
    writer: userEmail,
    title: '',
    content: '',
    categoryId: '',
  });

  const history = useHistory();

  useEffect(() => {
    console.log(post);
    getCategories()
      .then((res) => res.data)
      .then((data) => {
        setCategoryList(data);
      })
      .then(() => {
        if (!postId) return;
        setForm({
          ...form,
          title: post.title,
          content: post.content,
          categoryId: post.category.id,
        });
      });
  }, []);

  const handleClick = () => {
    history.goBack();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditorChange = (e) => {
    setForm({
      ...form,
      content: e.target.getContent(),
    });
  };
  const validateForm = () => {
    if (!form.categoryId) {
      popupThunk({ message: '카테고리를 선택해주세요.' });
      return false;
    }
    if (!form.title) {
      popupThunk({ message: '제목을 입력해주세요.' });
      return false;
    }
    if (!form.content) {
      popupThunk({ message: '내용을 입력해주세요.' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateForm();
    if (!result) return;
    let promise;
    if (postId) {
      promise = modifyPost(form, postId);
    } else {
      promise = writePost(form);
    }
    promise
      .then((res) => {
        return res.data;
      })
      .then((post) => {
        history.push(`/${post.category.path}/${post.id}`);
      })
      .catch((err) => popupThunk({ message: err }));
  };

  return (
    <form className="WriteForm" onSubmit={handleSubmit}>
      <h2>{ postId ? '수정하기' : '작성하기' }</h2>
      <select
        className="CategorySelect"
        name="categoryId"
        onChange={handleChange}
        value={form.categoryId}
      >
        <option value="">카테고리</option>
        {
          categoryList && (
            categoryList.map((item) => (
              <option
                value={item.id}
                key={item.id}
              >
                { item.name }
              </option>
            ))
          )
        }
      </select>
      <input
        type="text"
        className="PostTitle"
        placeholder="제목을 입력하세요."
        onChange={handleChange}
        value={form.title}
        name="title"
      />
      <div className="EditorWrap">
        <Editor
          apiKey="x2gdmpp1etfrlqthrpd0iwrepqpuocm1jxtvfy74tdrbw8w5"
          cloudChannel="5-stable"
          onChange={handleEditorChange}
          initialValue={form.content}
          init={{
            menubar: false,
            height: 600,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste imagetools wordcount"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
          }}
        />
      </div>
      <div className="ButtonWrap">
        <button type="submit">{ postId ? '수정' : '등록' }</button>
        <button type="button" onClick={handleClick}>취소</button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  userEmail: state.auth.userSummary.email,
  post: state.post.post,
});

const mapDispatchToProp = (dispatch) => ({
  popupThunk: (popup) => dispatch(popupThunk(popup)),
});

export default connect(mapStateToProps, mapDispatchToProp)(PostWriteForm);
