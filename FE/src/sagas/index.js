import {all} from 'redux-saga/effects';
import {CinemaSaga} from './AdCinemaSaga';
import {DashboardSaga} from './DashboardSaga';
import {AdFilmSaga} from './AdFilmSaga';
import {AdActorSaga} from './AdActorSaga';
import {LoginSaga} from './LoginSaga';
import {UserSagas} from './UserSagas';
import {AdOnShowingFilm} from './AdOnShowingFilm';

export default function* rootSaga() {
  yield all([
    ...CinemaSaga,
    ...DashboardSaga,
    ...LoginSaga,
    ...AdFilmSaga,
    ...UserSagas,
    ...AdActorSaga,
    ...AdOnShowingFilm,
  ]);
}
