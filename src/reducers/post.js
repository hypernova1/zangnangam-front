const SAVE_POST = 'post/SAVE_POST';
const REMOVE_POST = 'post/REMOVE_POST';
const GET_POST = 'post/GET_POST';

export const savePost = (post) => ({
  type: SAVE_POST,
  payload: post,
});

export const removePost = () => ({
  type: REMOVE_POST,
});

export const getPost = () => ({
  type: GET_POST,
});

const initialState = {
  post: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_POST:
      return {
        post: action.payload,
      };
    case REMOVE_POST:
      return {
        post: null,
      };
    case GET_POST:
    default:
      return state;
  }
}
