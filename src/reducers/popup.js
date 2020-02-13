const EXECUTE_POPUP = 'popup/EXECUTE_POPUP';
const CLOSE_POPUP = 'popup/CLOSE_POPUP';

export const executePopup = (popup) => ({
  type: EXECUTE_POPUP,
  payload: {
    ...popup,
  },
});

export const closePopup = () => ({
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
  result: '',
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case EXECUTE_POPUP:
      return {
        ...state,
        visible: true,
        message: action.payload.message,
      };
    case CLOSE_POPUP:
      return {
        ...state,
        visible: false,
        message: '',
      };
    default:
      return state;
  }
}
