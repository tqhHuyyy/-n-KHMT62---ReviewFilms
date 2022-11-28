import { takeEvery, put } from 'redux-saga/effects';
import * as types from '../constants';
import getAPI from '../fetchAPI/getAPI';
import * as actions from '../actions/Actions';
import postAPIFormData from '../fetchAPI/postAPIFormData';

function* getDetailCinema(action) {
  try {
    const dataCinema = {
      path: `/cinemas`,
      method: types.GET,
    };
    const cinemaData = yield getAPI(dataCinema);
    yield put({
      type: types.GET_CINEMA_DETAIL_SUCCESS,
      payload: cinemaData,
    });
  } catch (error) {
    yield put({
      type: types.GET_CINEMA_DETAIL_FAILURE,
      payload: {
        errorMessager: error,
      },
    });
  }
}

function* getCinemasCluster() {
  let data = {
    method: types.GET,
    path: '/cinemas_cluster',
  };
  try {
    const res = yield getAPI(data);
    yield put({
      type: types.GET_CINEMAS_CLUSTER_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: types.GET_CINEMAS_CLUSTER_FAILURE,
      payload: {
        errorMessage: error,
      },
    });
  }
}

function* getDetailCinemaCluster(action) {
  try {
    const dataCinema = {
      path: `/cinemas_cluster/${action.payload}`,
      method: types.GET,
    };
    const cinemaCluster = yield getAPI(dataCinema);

    yield put({
      type: types.GET_DETAIL_CINEMA_CLUSTER_SUCCESS,
      payload: cinemaCluster,
    });
  } catch (error) {
    yield put({
      type: types.GET_DETAIL_CINEMA_CLUSTER_FAILURE,
    });
  }
}

function* updateCinemaCluster(action) {
  try {
    const cinemaClusterData = new FormData();
    const blob = new Blob([JSON.stringify(action.payload.cinemaClusterData)], {
      type: 'application/json',
    });
    if (action.payload.cinemaImg._id === undefined) {
      cinemaClusterData.append('cinema_image', action.payload.cinemaImg);
    }

    if (action.payload.fareImg._id === undefined) {
      cinemaClusterData.append('fare_image', action.payload.fareImg);
    }
    cinemaClusterData.append('cinemaClusterData', blob);
    const dataCinema = {
      path: `/cinemas_cluster/${action.payload._id}`,
      method: types.PUT,
      data:  cinemaClusterData    
  ,
    };
    yield postAPIFormData(dataCinema);
    yield put(actions.updateCinemaClusterSuccess());
    yield put(actions.getCinemaAdminRequest({ pageIndex: 1 }));
  } catch (error) {
    yield put(actions.updateCinemaClusterFailure(error));
  }
}

function* getCinema(action) {
  try {
    const dataCinema = {
      path: `/cinemas`,
      method: types.GET,
    };
    const result = yield getAPI(dataCinema);
    yield put(actions.getCinemaSuccess(result.cinemas));
  } catch (error) {
    yield put(actions.getActorFailure(error));
  }
}

export const CinemaSaga = [
  takeEvery(types.GET_CINEMA_DETAIL_REQUEST, getDetailCinema),
  takeEvery(types.GET_CINEMAS_CLUSTER_REQUEST, getCinemasCluster),
  takeEvery(types.GET_DETAIL_CINEMA_CLUSTER_REQUEST, getDetailCinemaCluster),
  takeEvery(types.UPDATE_CINEMA_CLUSTER_REQUEST, updateCinemaCluster),
  takeEvery(types.GET_CINEMA_REQUEST, getCinema),
];
