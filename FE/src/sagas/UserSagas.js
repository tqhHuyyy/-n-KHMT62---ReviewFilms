import { takeEvery, put } from 'redux-saga/effects';
import * as types from '../constants';
import getAPI from '../fetchAPI/getAPI';
import getFilmDetailAPI from '../fetchAPI/getFilmDetailAPI';
import * as actions from '../actions/Actions';

function* getComingSoon(action) {
  try {
    const dataSend = {
      path: `/finds/coming_soon?_page=${action.payload.pageIndex}&_limit=${types.LIMIT}`,
      method: types.GET,
    };
    const listData = yield getAPI(dataSend);
    yield put({
      type: types.GET_COMING_SOON_FILM_SUCCESS,
      payload: {
        listData: listData.Films,
        totalPage: listData.totalPage,
        pageIndex: action.payload.pageIndex,
      },
    });
  } catch (error) {
    yield put(actions.getListFilmFailure(error));
  }
}
function* getInTheater(action) {
  try {
    const dataSend = {
      path: `/finds/in_theater?_page=${action.payload.pageIndex}&_limit=${types.LIMIT}`,
      method: types.GET,
    };
    const listData = yield getAPI(dataSend);
    yield put({
      type: types.GET_IN_THEATER_FILM_SUCCESS,
      payload: {
        listData: listData.Films,
        totalPage: listData.totalPage,
        pageIndex: action.payload.pageIndex,
      },
    });
  } catch (error) {
    yield put({
      type: types.GET_IN_THEATER_FILM_FAILURE,
      payload: error,
    });
  }
}

function* getGenreFilm(action) {
  try {
    const dataSend = {
      path: `/finds/${action.payload.genre}?_page=${action.payload.pageIndex}&_limit=${types.LIMIT}`,
      method: types.GET,
    };
    const listData = yield getAPI(dataSend);
    yield put({
      type: types.GET_GENRE_FILM_SUCCESS,
      payload: {
        listData: listData.Films,
        totalPage: listData.totalPage,
        pageIndex: action.payload.pageIndex,
        genre: action.payload.genre,
      },
    });
  } catch (error) {
    yield put({
      type: types.GET_GENRE_FILM_FAILURE,
      payload: error,
    });
  }
}
function* getFilmDetail(action) {
  try {
    const dataSend = {
      path: `/films/${action.payload}`,
      method: types.GET,
    };
    const result = yield getFilmDetailAPI(dataSend);
    yield put(actions.getFilmDetailSuccess(result));
  } catch (error) {
    yield put(actions.getFilmDetailFailure(error.message));
  }
}

function* getSearchFilm(action) {
  const { textSearch, pageIndex } = action.payload;
  const data = {
    path: `/films/search?q=${textSearch}&_page=${pageIndex}&_limit=${types.LIMIT}`,
    method: types.GET,
  };
  try {
    let res = yield getAPI(data);
    yield put({
      type: types.GET_SEARCH_FILM_SUCCESS,
      payload: {
        listData: res.Films,
        totalPage: res.totalPage,
        pageIndex: action.payload.pageIndex,
        textSearch: action.payload.textSearch,
      },
    });
  } catch (error) {
    yield put({
      type: types.GET_SEARCH_FILM_FAILURE,
      payload: {
        errorMessage: error,
      },
    });
  }
}

function* getFilmHomePage(action) {
  try {
    const dataSend = {
      path: `/finds/${action.payload.genre}?_page=${action.payload.pageIndex}&_limit=${types.LIMIT}`,
      method: types.GET,
    };
    const listData = yield getAPI(dataSend);
    yield put({
      type: types.GET_FILM_PAGINATION_SUCCESS,
      payload: {
        listData: listData.Films,
        totalPage: listData.totalPage,
        pageIndex: action.payload.pageIndex,
        genre: action.payload.genre,
      },
    });
  } catch (error) {
    yield put({
      type: types.GET_FILM_PAGINATION_FAILURE,
      payload: error,
    });
  }
}

export const UserSagas = [
  takeEvery(types.GET_COMING_SOON_FILM_REQUEST, getComingSoon),
  takeEvery(types.GET_IN_THEATER_FILM_REQUEST, getInTheater),
  takeEvery(types.GET_FILM_DETAIL_REQUEST, getFilmDetail),
  takeEvery(types.GET_SEARCH_FILM_REQUEST, getSearchFilm),
  takeEvery(types.GET_GENRE_FILM_REQUEST, getGenreFilm),
  takeEvery(types.GET_FILM_PAGINATION_REQUEST, getFilmHomePage),
];
