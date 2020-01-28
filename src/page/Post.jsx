import React, { useEffect } from 'react';

const Post = ({ match }) => {
  const { category, postId } = match.params;
  useEffect(() => {
  });
  return (
    <div>Post</div>
  );
};

export default Post;
