import * as Constants from '../constants';

const DEFAULT_STATE = {
  isFetching: null,
  listData: [],
  totalPage: 1,
  pageIndex: 1,
  content: '',
  genre: '',
  textSearch: '',
  status: false,
};

const ListFilmReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case Constants.GET_COMING_SOON_FILM_REQUEST:
    case Constants.GET_GENRE_FILM_REQUEST:
    case Constants.GET_IN_THEATER_FILM_REQUEST:
    case Constants.GET_FILM_PAGINATION_REQUEST:
      return {
        ...state,
        isFetching: true,
        content: action.payload?.content,
      };
    case Constants.GET_SEARCH_FILM_REQUEST:
      return {
        ...state,
        isFetching: true,
        content: action.payload?.content,
        status: true,
      };
    case Constants.GET_COMING_SOON_FILM_SUCCESS:
    case Constants.GET_GENRE_FILM_SUCCESS:
    case Constants.GET_IN_THEATER_FILM_SUCCESS:
    case Constants.GET_FILM_PAGINATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listData: action.payload.listData,
        totalPage: action.payload.totalPage,
        pageIndex: action.payload.pageIndex,
        genre: action.payload?.genre,

      };
    case Constants.GET_COMING_SOON_FILM_FAILURE:
    case Constants.GET_SEARCH_FILM_FAILURE:
    case Constants.GET_GENRE_FILM_FAILURE:
    case Constants.GET_IN_THEATER_FILM_FAILURE:
    case Constants.GET_FILM_PAGINATION_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case Constants.GET_SEARCH_FILM_SUCCESS:
      return {
        ...state,
        listData: action.payload.listData,
        totalPage: action.payload.totalPage,
        textSearch: action.payload.textSearch,
        isFetching: false,
        status: false,
      };

    default:
      return state;
  }

};

export default ListFilmReducer;
