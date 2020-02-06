import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
  });
  return (
    <div>
      404
      <NavLink to="/">메인으로</NavLink>
    </div>
  );
};

export default NotFound;