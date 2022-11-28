import { takeEvery, put, select } from 'redux-saga/effects';
import * as Constants from '../constants';
import getAPI from '../fetchAPI/getAPI';
import postAPIFormData from '../fetchAPI/postAPIFormData';
import deleteAPI from '../fetchAPI/deleteAPI';
import * as actions from '../actions/Actions';

function* getAllFilm(action) {
  try {
    let pageIndex = action.payload?.pageIndex;
    const response = yield getAPI({
      method: Constants.GET,
      path: `/films?_page=${pageIndex}&_limit=${Constants.LIMITFIME}`,
    });
    yield put({
      type: Constants.GET_ALL_FILM_ADMIN_SUCCESS,
      payload: {
        response,
        pageIndex: pageIndex,
      },
    });
  } catch (error) {
    yield put({
      type: Constants.GET_ALL_FILM_ADMIN_FAILURE,
      payload: error,
    });
  }
}

function* getGenreFilm(action) {
  try {
    const { pageIndex, genre } = action.payload;
    const response = yield getAPI({
      method: Constants.GET,
      path: `/finds/${genre}/?_page=${pageIndex}&_limit=${Constants.LIMIT}`,
    });
    yield put(
      actions.getGenreAdminSuccess({
        response,
        pageIndex: pageIndex,
      }),
    );
  } catch (error) {
    yield put(actions.getGenreAdminFailure(error));
  }
}

function* addFilm(action) {
  try {
    const formData = new FormData();
    const filmData = new Blob([JSON.stringify(action.payload.filmData)], {
      type: 'application/json',
    });
    formData.append('cover_image', action.payload.cover);
    formData.append('review_image', action.payload.review);
    formData.append('poster_image', action.payload.poster);
    action.payload.film.map((filmImg) => {
      formData.append('film_image', filmImg);
    });
    formData.append('filmData', filmData);
    yield postAPIFormData({
      method: Constants.POST,
      path: `/films`,
      data: formData,
    });
    yield put(actions.addFilmSuccess());
    yield put(actions.getAllFilmAction());
  } catch (error) {
    yield put(actions.addFilmFailure(error));
  }
}

function* searchFilmAdmin(action) {
  try {
    const { pageIndex, genre, textSearch } = action.payload;
    const response = yield getAPI({
      method: Constants.GET,
      path: `/finds/${genre}?q=${textSearch}&_page=${pageIndex}&_limit=${Constants.LIMIT}`,
    });
    yield put({
      type: Constants.SEARCH_FILM_ADMIN_SUCCESS,
      payload: {
        response,
        pageIndex: pageIndex,
        genre: genre,
        textSearch: textSearch,
      },
    });
  } catch (error) {
    yield put({
      type: Constants.SEARCH_FILM_ADMIN_FAILURE,
      payload: error,
    });
  }
}

function* searchAllFilmAdmin(action) {
  try {
    const { pageIndex, textSearch } = action.payload;
    const response = yield getAPI({
      method: Constants.GET,
      path: `/films/search?q=${textSearch}&_page=${pageIndex}&_limit=${Constants.LIMIT}`,
    });
    yield put({
      type: Constants.SEARCH_ALL_FILM_ADMIN_SUCCESS,
      payload: {
        response,
        pageIndex: pageIndex,
        textSearch: textSearch,
      },
    });
  } catch (error) {}
}

function* addCinemaCluster(action) {
  try {
    const formData = new FormData();
    const cinemaClusterData = new Blob(
      [JSON.stringify(action.payload.cinemaClusterData)],
      { type: 'application/json' },
    );
    formData.append('cinema_image', action.payload.cinemaImg);
    formData.append('fare_image', action.payload.fareImg);
    formData.append('cinemaClusterData', cinemaClusterData);
    yield postAPIFormData({
      method: Constants.POST,
      path: `/cinemas_cluster`,
      data: formData,
    });
    yield put(actions.addCinemaClusterSuccess());
    yield put(actions.getCinemaAdminRequest({ pageIndex: 1 }));
  } catch (error) {
    yield put(actions.addCinemaClusterFailure(error));
  }
}

function* getCinema(action) {
  try {
    let pageIndex, path;
    if (action.payload !== undefined) {
      pageIndex = action.payload.pageIndex;
      path = `/cinemas_cluster?_page=${pageIndex}&_limit=${Constants.LIMIT}`;
    } else {
      path = `/cinemas_cluster`;
    }

    const res = yield getAPI({
      method: Constants.GET,
      path: path,
    });
    yield put(
      actions.getCinemaAdminSuccess({
        pageIndex: pageIndex,
        listCinema: res.cinemas,
        totalPage: res.totalPage,
      }),
    );
  } catch (error) {
    yield put(actions.getCinemaAdminFailure(error));
  }
}

function* deleteFilm(action) {
  try {
    const dashBoardReducer = yield select((state) => state.dashBoardReducer);
    const path = `/films/`;
    yield deleteAPI({
      method: Constants.DELETE,
      path: path,
      data: action.payload,
    });
    yield put(actions.deleteFilmAdminSuccess());
    yield put({
      type: Constants.GET_ALL_FILM_ADMIN_REQUEST,
      payload: {
        pageIndex: dashBoardReducer.pageIndex,
        totalPage: dashBoardReducer.totalPage,
      },
    });
  } catch (error) {
    yield put(actions.deleteFilmAdminFailure(error));
  }
}

function* deleteCinema(action) {
  try {
    const dashBoardReducer = yield select((state) => state.dashBoardReducer);
    const path = `/cinemas_cluster/`;
    yield deleteAPI({
      method: Constants.DELETE,
      path: path,
      data: action.payload,
    });
    yield put(actions.deleteCinemaSuccess());
    yield put({
      type: Constants.GET_CINEMA_ADMIN_REQUEST,
      payload: {
        pageIndex: dashBoardReducer.pageIndex,
        totalPage: dashBoardReducer.totalPage,
      },
    });
  } catch (error) {
    yield put(actions.deleteCinemaFailure(error));
  }
}

function* deleteActor(action) {
  try {
    const dashBoardReducer = yield select((state) => state.dashBoardReducer);
    const path = `/actors/`;
    yield deleteAPI({
      method: Constants.DELETE,
      path: path,
      data: action.payload,
    });
    yield put(actions.deleteActorSuccess());
    yield put({
      type: Constants.GET_ACTOR_REQUEST,
      payload: {
        pageIndex: dashBoardReducer.activePage,
        totalPage: dashBoardReducer.totalPage,
      },
    });
  } catch (error) {
    yield put(actions.deleteActorFailure(error));
  }
}

export const DashboardSaga = [
  takeEvery(Constants.GET_ALL_FILM_ADMIN_REQUEST, getAllFilm),
  takeEvery(Constants.ADD_FILM_REQUEST, addFilm),
  takeEvery(Constants.SEARCH_FILM_ADMIN_REQUEST, searchFilmAdmin),
  takeEvery(Constants.SEARCH_ALL_FILM_ADMIN_REQUEST, searchAllFilmAdmin),
  takeEvery(Constants.GET_CINEMA_ADMIN_REQUEST, getCinema),
  takeEvery(Constants.GET_GENRE_FILM_ADMIN_REQUEST, getGenreFilm),
  takeEvery(Constants.ADD_CINEMA_CLUSTER_REQUEST, addCinemaCluster),
  takeEvery(Constants.DELETE_FILM_ADMIN_REQUEST, deleteFilm),
  takeEvery(Constants.DELETE_CINEMA_REQUEST, deleteCinema),
  takeEvery(Constants.DELETE_ACTOR_REQUEST, deleteActor),
];
