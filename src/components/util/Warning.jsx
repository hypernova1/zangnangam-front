import React, { useEffect, useState } from 'react';
import './Warning.css';

const Warning = ({ message, visible }) => {
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    if (visible) {
      setClosing(true);
      setTimeout(() => {
        setClosing(false);
      }, 1000);
    }
  }, []);

  if (!visible && !closing) return null;

  return (
    <div className="WarningWrapper">
      <div className={`Warning ${closing ? 'bounceOut' : 'bounceIn'} animated`}>
        { message }
      </div>
    </div>
  );
};

export default Warning;
