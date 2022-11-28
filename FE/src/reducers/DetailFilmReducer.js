import * as Constants from '../constants';

const DEFAULT_STATE = {
  isFetching: null,
  dataFetched: false,
  error: false,
  errorMessage: null,
  filmDetail: null,
};

const DetailFilmReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case Constants.GET_FILM_DETAIL_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case Constants.GET_FILM_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        error: false,
        errorMessage: null,
        filmDetail: action.payload,
      };
    case Constants.GET_FILM_DETAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default DetailFilmReducer;
