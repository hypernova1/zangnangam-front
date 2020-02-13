import * as api from '../api';

const UPDATE_CATEGORY = 'category/UPDATE_CATEGORY';

export const updateCategory = (categories) => ({
  type: UPDATE_CATEGORY,
  payload: {
    categories,
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
    case UPDATE_CATEGORY:
      return [
        ...action.payload.categories,
      ];
    default:
      return state;
  }
}
