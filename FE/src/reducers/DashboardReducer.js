import * as Constants from '../constants';

const DEFAULT_STATE = {
  isFetching: null,
  films: [],
  maxPages: 0,
  activePage: 1,
  error: false,
  errorMsg: '',
  totalPage: 0,
  pageIndex: 1,
  genre: '',
  textSearch: '',
  listAllFilm: [],
  listActor: [],
  listCinema: [],
  tempCinema: '',
  listSmallCinema: [],
  listNotHot: [],
  listNotNew: [],
};

const DashboardReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case Constants.GET_NEW_FILM_REQUEST:
    case Constants.GET_ACTOR_REQUEST:
    case Constants.GET_CINEMA_ADMIN_REQUEST:
    case Constants.GET_CINEMA_REQUEST:
    case Constants.ADD_FILM_REQUEST:
    case Constants.GET_HOT_FILM_ADMIN_REQUEST:
    case Constants.SEARCH_FILM_ADMIN_REQUEST:
    case Constants.SEARCH_ALL_FILM_ADMIN_REQUEST:
    case Constants.ADD_ACTOR_REQUEST:
    case Constants.ADD_CINEMA_CLUSTER_REQUEST:
    case Constants.SEARCH_ACTOR_REQUEST:
    case Constants.UPDATE_FILM_REQUEST:
    case Constants.UPDATE_ACTOR_REQUEST:
    case Constants.UPDATE_CINEMA_CLUSTER_REQUEST:
    case Constants.GET_NOT_HOT_FILM_REQUEST:
    case Constants.GET_NOT_NEW_FILM_REQUEST:
    case Constants.UPDATE_HOT_FILM_REQUEST:
    case Constants.UPDATE_NEW_FILM_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case Constants.GET_GENRE_FILM_ADMIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        genre: action.payload?.genre ? action.payload.genre : '',
      };

    case Constants.GET_NEW_FILM_SUCCESS:
    case Constants.ADD_ACTOR_SUCCESS:
    case Constants.ADD_FILM_SUCCESS:
    case Constants.ADD_CINEMA_CLUSTER_SUCCESS:
    case Constants.UPDATE_FILM_SUCCESS:
    case Constants.UPDATE_ACTOR_SUCCESS:
    case Constants.UPDATE_CINEMA_CLUSTER_SUCCESS:
    case Constants.UPDATE_HOT_FILM_SUCCESS:
    case Constants.UPDATE_NEW_FILM_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case Constants.GET_NEW_FILM_FAILURE:
    case Constants.GET_ACTOR_FAILURE:
    case Constants.GET_CINEMA_ADMIN_FAILURE:
    case Constants.GET_CINEMA_FAILURE:
    case Constants.SEARCH_FILM_ADMIN_FAILURE:
    case Constants.SEARCH_ALL_FILM_ADMIN_FAILURE:
    case Constants.ADD_FILM_FAILURE:
    case Constants.ADD_ACTOR_FAILURE:
    case Constants.ADD_CINEMA_CLUSTER_FAILURE:
    case Constants.UPDATE_FILM_FAILURE:
    case Constants.UPDATE_ACTOR_FAILURE:
    case Constants.UPDATE_CINEMA_CLUSTER_FAILURE:
    case Constants.GET_NOT_HOT_FILM_FAILURE:
    case Constants.GET_NOT_NEW_FILM_FAILURE:
    case Constants.UPDATE_HOT_FILM_FAILURE:
    case Constants.UPDATE_NEW_FILM_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.payload,
      };
    case Constants.GET_ALL_FILM_ADMIN_SUCCESS:
      return {
        ...state,
        listAllFilm: action.payload.response.Films,
        totalPage: action.payload.response.totalPage,
        pageIndex: action.payload.pageIndex,
        textSearch: action.payload.textSearch ? action.payload.textSearch : '',
      };
    case Constants.GET_HOT_FILM_ADMIN_SUCCESS:
    case Constants.SEARCH_FILM_ADMIN_SUCCESS:
    case Constants.SEARCH_ALL_FILM_ADMIN_SUCCESS:
    case Constants.GET_GENRE_FILM_ADMIN_SUCCESS:
      return {
        ...state,
        films: action.payload.response.Films,
        totalPage: action.payload.response.totalPage,
        pageIndex: action.payload.pageIndex,
        textSearch: action.payload.textSearch ? action.payload.textSearch : '',
      };
    case Constants.GET_ACTOR_SUCCESS:
    case Constants.SEARCH_ACTOR_SUCCESS:
      const {activePage, totalPage, listActor, textSearch} = action.payload;
      return {
        ...state,
        listActor: listActor,
        activePage: activePage,
        totalPage: totalPage,
        textSearch: textSearch ? textSearch : '',
      };
    case Constants.GET_CINEMA_ADMIN_SUCCESS:
      return {
        ...state,
        listCinema: action.payload.listCinema,
        pageIndex: action.payload.pageIndex,
        totalPage: action.payload.totalPage,
      };
    case Constants.GET_CINEMA_SUCCESS:
      return {
        ...state,
        listSmallCinema: action.payload,
      };
    case Constants.ADD_CINEMA_REQUEST:
      return {
        ...state,
        tempCinema: action.payload,
      };
    case Constants.CLEAR_TEMP_CINEMA:
      return {
        ...state,
        tempCinema: '',
      };
    case Constants.GET_NOT_HOT_FILM_SUCCESS:
      return {
        ...state,
        listNotHot: action.payload,
      };

    case Constants.GET_NOT_NEW_FILM_SUCCESS:
      return {
        ...state,
        listNotNew: action.payload,
      };
    default:
      return state;
  }
};

export default DashboardReducer;
