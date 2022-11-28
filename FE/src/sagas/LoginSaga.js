import {takeEvery, put} from 'redux-saga/effects';
import * as Constants from '../constants';
import loginAPI from '../fetchAPI/loginAPI';
import * as actions from '../actions/Actions';

function* LoginRequest(action) {
  try {
    const data = {
      method: Constants.POST,
      path: '/login',
      data: action.payload.objUpdate,
    };
    const res = yield loginAPI(data);
    if (res.status === 200) {
      yield put(actions.loginSuccess({checked: action.payload.checked}));
    }
  } catch (error) {
    yield put(actions.loginFailure(error));
  }
}

export const LoginSaga = [takeEvery(Constants.LOGIN_REQUEST, LoginRequest)];
