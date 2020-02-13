import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../reducers/modal';
import './ConfirmModal.css';

const ConfirmModal = ({ modal, closeModal }) => {
  useEffect(() => {
    closeModal();
  }, [])
  return (
    <div className={`ConfirmModal${modal.visible ? ' Visible' : ''}`} onClick={closeModal}>
      <div className="ModalContent">
        <div>{ modal.message }</div>
        <div className="ModalButtonWrap">
          <button
            type="button"
            onClick={() => {
              modal.func();
              closeModal();
            }}
          >
            확인
          </button>
          <button
            type="button"
            onClick={closeModal}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);