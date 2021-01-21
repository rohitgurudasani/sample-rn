import { favList } from './actions';

const initialState = {
  list: [],
  isLoading: true,
  favList: [],
};

export default function (state = initialState, action) {
  if (action.type === 'FETCH_LIST_SUCCESS') {
    return {
      ...state,
      list: action.list,
    };
  }
  if (action.type === 'LIST_IS_LOADING') {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }
  if (action.type === 'ADD_FAV_ITEM') {
    if (state.favList.length > 4) {
      return state;
    } else {
      return {
        ...state,
        favList: [...state.favList, action.favItem],
      };
    }
  }
  return state;
}
