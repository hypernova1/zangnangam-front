import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './FlashPopup.css';

const FlashPopup = ({ message, visible }) => {
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    if (visible) {
      setClosing(true);
      setTimeout(() => {
        setClosing(false);
      }, 1000);
    }
  }, [visible]);

  if (!visible && !closing) return null;

  return (
    <div className="FlashPopupWrapper">
      <div className={`FlashPopup ${closing ? 'bounceOut' : 'bounceIn'} animated`}>
        { message }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  visible: state.popup.visible,
  message: state.popup.message,
});

export default connect(mapStateToProps)(FlashPopup);
