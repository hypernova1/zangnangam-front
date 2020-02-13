const EXECUTE_POPUP = 'popup/EXECUTE_POPUP';
const CLOSE_POPUP = 'popup/CLOSE_POPUP';

const executePopup = (popup) => ({
  type: EXECUTE_POPUP,
  payload: {
    ...popup,
  },
});

const closePopup = () => ({
  type: CLOSE_POPUP,
});

let isRequest = false;
export const popupThunk = (state) => (dispatch) => {
  if (isRequest) return;
  isRequest = true;
  dispatch(executePopup(state));
  setTimeout(() => {
    dispatch(closePopup());
    isRequest = false;
  }, 1500);
};

const initState = {
  visible: false,
  message: '',
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case EXECUTE_POPUP:
      return {
        visible: true,
        message: action.payload.message,
      };
    case CLOSE_POPUP:
      return {
        visible: false,
        message: '',
      };
    default:
      return state;
  }
}
