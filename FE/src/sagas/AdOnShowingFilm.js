import { takeEvery, put } from 'redux-saga/effects';
import * as constants from '../constants';
import deleteAPIs from '../fetchAPI/deleteAPIs';
import * as actions from '../actions/Actions';

function* deleteLiveFilm(action) {
  try {
    const data = {
      path: '/films/live',
      method: constants.DELETE,
      data: action.payload,
    };
    yield deleteAPIs(data);
    yield put(actions.deleteLiveFilmSuccess());
    yield put(
      actions.getGenreAdminRequest({ pageIndex: 1, genre: 'in_theater' }),
    );
  } catch (error) {
    yield put(actions.deleteLiveFilmFailure(error));
  }
}

function* deleteHotFilm(action) {
  try {
    const data = {
      path: '/films/hot',
      method: constants.DELETE,
      data: action.payload,
    };
    yield deleteAPIs(data);
    yield put(actions.deleteHotFilmSuccess());
    yield put(
      actions.getGenreAdminRequest({ pageIndex: 1, genre: 'hot' }),
    );
  } catch (error) {
    yield put(actions.deleteHotFilmFailure(error));
  }
}

function* deleteNewFilm(action) {
  try {
    console.log(action,'Saga này ');
    const data = {
      path: '/films/new',
      method: constants.DELETE,
      data: action.payload,
    };
    yield deleteAPIs(data);
    yield put(actions.deleteNewFilmSuccess());
    yield put(
      actions.getGenreAdminRequest({ pageIndex: 1, genre: 'new' }),
    );
  } catch (error) {
    yield put(actions.deleteNewFilmFailure(error));
  }
}
export const AdOnShowingFilm = [
  takeEvery(constants.DELETE_LIVE_FILM_REQUEST, deleteLiveFilm),
  takeEvery(constants.DELETE_HOT_FILM_REQUEST, deleteHotFilm),
  takeEvery(constants.DELETE_NEW_FILM_REQUEST, deleteNewFilm)
];
