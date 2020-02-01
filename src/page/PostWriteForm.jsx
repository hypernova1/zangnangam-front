import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './PostWriteForm.css';

const PostWriteForm = ({ match }) => {
  const { category } = match.params;

  const handleClick = () => {

  };

  const handleSubmit = () => {

  };

  return (
    <form className="WriteForm" onSubmit={handleSubmit}>
      <input type="text" className="PostTitle" placeholder="제목을 입력하세요."/>
      <div className="EditorWrap">
        <Editor
          apiKey="x2gdmpp1etfrlqthrpd0iwrepqpuocm1jxtvfy74tdrbw8w5"
          init={{
            height: 600,
            menubar: false,
            plugin: [
              'advlist autolink lists link image',
              'charmap print preview anchor help',
              'searchreplace visualblocks code',
              'insertdatetime media table paste wordcount',
            ],
            toolbar:
              `undo redo | formatselect | bold italic |
              alignleft aligncenter alignright |
              bullist numlist outdent indent | help`,
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

export default PostWriteForm;
