import { takeEvery, put } from 'redux-saga/effects';
import * as Constants from '../constants';
import getAPI from '../fetchAPI/getAPI';
import postAPIFormData from '../fetchAPI/postAPIFormData';
import * as actions from '../actions/Actions';

function* addActor(action) {
  try {
    const formData = new FormData();
    const actorData = new Blob([JSON.stringify(action.payload.actorData)], {
      type: 'application/json',
    });
    formData.append('actor_image', action.payload.actorImg);
    formData.append('actorData', actorData);
    yield postAPIFormData({
      method: Constants.POST,
      path: `/actors`,
      data: formData,
    });
    yield put(actions.addActorSuccess());
    yield put(actions.getActorRequest({ pageIndex: 1 }));
  } catch (error) {
    yield put(actions.addActorFailure(error));
  }
}

function* getActor(action) {
  try {
    let pageIndex, path;
    if (action.payload !== undefined) {
      pageIndex = action.payload.pageIndex;
      path = `/actors?page=${pageIndex}&limit=${Constants.LIMIT}`;
    } else {
      path = `/actors`;
    }
    const res = yield getAPI({
      method: Constants.GET,
      path: path,
    });
    // console.log(res)
    yield put(
      actions.getActorSuccess({
        activePage: pageIndex ? pageIndex : 0,
        listActor: res.actors,
        totalPage: res.totalPage,
      }),
    );
  } catch (error) {
    yield put(actions.getActorFailure(error));
  }
}

function* searchActor(action) {
  try {
    const { pageIndex, textSearch } = action.payload;
    const path = `/actors/search?q=${textSearch}&page=${pageIndex}&limit=${Constants.LIMIT}`;
    const res = yield getAPI({
      method: Constants.GET,
      path: path,
    });
    yield put(
      actions.searchActorSuccess({
        activePage: pageIndex,
        listActor: res.actors,
        totalPage: res.totalPage,
        textSearch: textSearch,
      }),
    );
  } catch (error) {
    yield put(actions.getActorFailure(error));
  }
}

function* updateActor(action) {
  try {
    const formData = new FormData();
    const actorData = new Blob([JSON.stringify(action.payload.actorData)], {
      type: 'application/json',
    });
    if (action.payload.actorImg._id === undefined) {
      formData.append('actor_image', action.payload.actorImg);
    }
    formData.append('actorData', actorData);
    yield postAPIFormData({
      method: Constants.PUT,
      path: `/actors/${action.payload._id}`,
      data: formData,
    });
    yield put(actions.updateActorSuccess());
    yield put(actions.getActorRequest({ pageIndex: 1 }));
  } catch (error) {
    yield put(actions.updateActorFailure(error));
  }
}

export const AdActorSaga = [
  takeEvery(Constants.ADD_ACTOR_REQUEST, addActor),
  takeEvery(Constants.GET_ACTOR_REQUEST, getActor),
  takeEvery(Constants.SEARCH_ACTOR_REQUEST, searchActor),
  takeEvery(Constants.UPDATE_ACTOR_REQUEST, updateActor),
];
