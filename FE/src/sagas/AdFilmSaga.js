import * as types from '../constants';
import getAPI from '../fetchAPI/getAPI';
import { takeEvery, put } from 'redux-saga/effects';
import postAPIFormData from '../fetchAPI/postAPIFormData';
import postAPI from '../fetchAPI/postAPI';
import * as Constants from '../constants';
import * as actions from '../actions/Actions';

function* getHotFilm() {
  let data = {
    method: types.GET,
    path: '/finds/hot',
  };
  let res = yield getAPI(data);
  try {
    yield put({
      type: types.GET_HOT_FILM_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: types.GET_HOT_FILM_FAILURE,
      payload: {
        errorMessage: error,
      },
    });
  }
}

function* getNewFilm() {
  let data = {
    method: types.GET,
    path: '/finds/new',
  };
  let res = yield getAPI(data);
  try {
    yield put({
      type: types.GET_NEW_FILM_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: types.GET_NEW_FILM_FAILURE,
      payload: {
        errorMessage: error,
      },
    });
  }
}

function* updateFilm(action) {
  try {
    console.log(action);
    const formData = new FormData();
    const filmData = new Blob([JSON.stringify(action.payload.filmData)], {
      type: 'application/json',
    });
    if (action.payload?.cover?._id === undefined) {
      formData.append('cover_image', action.payload.cover);
    }
    if (action.payload?.review?._id === undefined) {
      formData.append('review_image', action.payload.review);
    }
    if (action.payload?.poster?._id === undefined) {
      formData.append('poster_image', action.payload.poster);
    }
    action.payload?.film.forEach((filmImg) => {
      if (filmImg?._id === undefined) {
        formData.append('film_image', filmImg);
      }
    });
    formData.append('filmData', filmData);
    yield postAPIFormData({
      method: Constants.PUT,
      path: `/films/${action.payload._id}`,
      data: formData,
    });
    yield put(actions.updateFilmSuccess());
    if (action.payload.path === '/dashboard') {
      yield put(actions.getAllFilmAction({ pageIndex: 1 }));
    } else if (action.payload.path === '/dashboard/hot') {
      yield put(actions.getGenreAdminRequest({ genre: 'hot', pageIndex: 1 }));
    } else if (action.payload.path === '/dashboard/new') {
      yield put(actions.getGenreAdminRequest({ genre: 'new', pageIndex: 1 }));
    }
  } catch (error) {
    yield put(actions.updateFilmFailure(error));
  }
}

function* getNotHotFilm() {
  let data = {
    method: types.GET,
    path: '/finds/not_hot',
  };
  let res = yield getAPI(data);
  try {
    yield put(actions.getNotHotFilmSuccess(res));
  } catch (error) {
    yield put(actions.getNotHotFilmFailure(error));
  }
}

function* getNotNewFilm() {
  let data = {
    method: types.GET,
    path: '/finds/not_new',
  };
  let res = yield getAPI(data);
  try {
    yield put(actions.getNotNewFilmSuccess(res));
  } catch (error) {
    yield put(actions.getNotNewFilmFailure(error));
  }
}

function* updateHotFilm(action) {
  try {
    yield postAPI({
      method: Constants.POST,
      path: `/films/add_hot`,
      data: action.payload,
    });
    yield put(actions.updateHotFilmSuccess());
    yield put(actions.getGenreAdminRequest({ pageIndex: 1, genre: 'hot' }));
  } catch (error) {
    yield put(actions.updateHotFilmFailure(error));
  }
}

function* updateNewFilm(action) {
  try {
    yield postAPI({
      method: Constants.POST,
      path: `/films/add_new`,
      data: action.payload,
    });
    yield put(actions.updateNewFilmSuccess());
    yield put(actions.getGenreAdminRequest({ pageIndex: 1, genre: 'new' }));
  } catch (error) {
    yield put(actions.updateNewFilmFailure(error));
  }
}

export const AdFilmSaga = [
  takeEvery(types.GET_HOT_FILM_REQUEST, getHotFilm),
  takeEvery(types.GET_NEW_FILM_REQUEST, getNewFilm),
  takeEvery(types.GET_NOT_HOT_FILM_REQUEST, getNotHotFilm),
  takeEvery(types.GET_NOT_NEW_FILM_REQUEST, getNotNewFilm),
  takeEvery(types.UPDATE_FILM_REQUEST, updateFilm),
  takeEvery(types.UPDATE_HOT_FILM_REQUEST, updateHotFilm),
  takeEvery(types.UPDATE_NEW_FILM_REQUEST, updateNewFilm),
];
