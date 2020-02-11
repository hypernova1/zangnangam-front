import * as api from '../api';

const GET_CATEGORY = 'category/GET_CATEGORY';
const UPDATE_CATEGORY = 'category/UPDATE_CATEGORY';

export const getCategory = () => ({
  type: GET_CATEGORY,
});

export const updateCategory = (category) => ({
  type: UPDATE_CATEGORY,
  payload: {
    category,
  },
});

export const categoryThunk = () => (dispatch) => {
  return api.getCategories()
    .then((res) => res.data)
    .then((data) => {
      dispatch(updateCategory(data));
    })
    .catch((err) => console.log(err));
};

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return state;
    case UPDATE_CATEGORY:
      return [
        ...action.payload.category,
      ];
    default:
      return state;
  }
}
