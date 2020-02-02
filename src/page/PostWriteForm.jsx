import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './PostWriteForm.css';
import { getCategories, writePost } from '../api';

const PostWriteForm = ({ userEmail }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
    writer: userEmail,
  });
  const [valid, setValid] = useState({
    title: false,
    content: false,
    category: false,
  });
  const history = useHistory();

  useEffect(() => {
    getCategories()
      .then((res) => res.data)
      .then((data) => {
        setCategoryList(data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    writePost(form)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .then((data) => console.log(data))
      .catch(() => alert('error'));
  };

  return (
    <form className="WriteForm" onSubmit={handleSubmit}>
      <select
        className="CategorySelect"
        name="category"
        onChange={handleChange}
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
        name="title"
      />
      <div className="EditorWrap">
        <Editor
          apiKey="x2gdmpp1etfrlqthrpd0iwrepqpuocm1jxtvfy74tdrbw8w5"
          cloudChannel="5-stable"
          onChange={handleEditorChange}
          init={{
            menubar: false,
            height: 600,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table contextmenu paste imagetools wordcount"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
          }}
        />
      </div>
      <div className="ButtonWrap">
        <button type="submit">등록</button>
        <button type="button" onClick={handleClick}>취소</button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  userEmail: state.auth.userInfo.email,
});

export default connect(mapStateToProps)(PostWriteForm);
