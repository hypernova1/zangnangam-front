const OPEN_MODAL = 'modal/OPEN_MODAL';
const CLOSE_MODAL = 'modal/CLOSE_MODAL';

export const openModal = (modal) => ({
  type: OPEN_MODAL,
  payload: {
    message: modal.message,
    func: modal.func,
  },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

const initialState = {
  visible: false,
  func: null,
  message: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        visible: true,
        func: action.payload.func,
        message: action.payload.message,
      };
    case CLOSE_MODAL:
      return {
        visible: false,
        func: null,
        message: '',
      };
    default:
      return state;
  }
}
