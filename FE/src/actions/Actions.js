import * as Constants from '../constants';
import { createAction } from 'redux-actions';

export const GetNewFilm = createAction(Constants.GET_NEW_FILM_REQUEST);
export const getComingSoonFilm = createAction(
  Constants.GET_COMING_SOON_FILM_REQUEST,
);

export const getListFilmSuccess = createAction(
  Constants.GET_COMING_SOON_FILM_SUCCESS,
);

export const getListFilmFailure = createAction(
  Constants.GET_COMING_SOON_FILM_FAILURE,
);

export const getInTheaterRequest = createAction(
  Constants.GET_IN_THEATER_FILM_REQUEST,
);

export const getFilmDetailRequest = createAction(
  Constants.GET_FILM_DETAIL_REQUEST,
);

export const getFilmDetailSuccess = createAction(
  Constants.GET_FILM_DETAIL_SUCCESS,
);

export const getFilmDetailFailure = createAction(
  Constants.GET_FILM_DETAIL_FAILURE,
);

export const getGenreFilmRequest = createAction(
  Constants.GET_GENRE_FILM_REQUEST,
);

export const getListSearchFilm = createAction(
  Constants.GET_SEARCH_FILM_REQUEST,
);

export const getFilmPagination = createAction(
  Constants.GET_FILM_PAGINATION_REQUEST,
);

export const getListCinemas = createAction(
  Constants.GET_CINEMAS_CLUSTER_REQUEST,
);

export const getListHotFilm = createAction(Constants.GET_HOT_FILM_REQUEST);

export const getListNewFilm = createAction(Constants.GET_NEW_FILM_REQUEST);

export const getDetailCinemaRequest = createAction(
  Constants.GET_CINEMA_DETAIL_REQUEST,
);
export const getCinemaCluster = createAction(
  Constants.GET_DETAIL_CINEMA_CLUSTER_REQUEST,
);

export const getAllFilmAction = createAction(
  Constants.GET_ALL_FILM_ADMIN_REQUEST,
);
export const getHotFilmAction = createAction(
  Constants.GET_HOT_FILM_ADMIN_REQUEST,
);

export const getNotHotFilmRequest = createAction(
  Constants.GET_NOT_HOT_FILM_REQUEST,
);
export const getNotHotFilmSuccess = createAction(
  Constants.GET_NOT_HOT_FILM_SUCCESS,
);
export const getNotHotFilmFailure = createAction(
  Constants.GET_NOT_HOT_FILM_FAILURE,
);

export const getNotNewFilmRequest = createAction(
  Constants.GET_NOT_NEW_FILM_REQUEST,
);
export const getNotNewFilmSuccess = createAction(
  Constants.GET_NOT_NEW_FILM_SUCCESS,
);
export const getNotNewFilmFailure = createAction(
  Constants.GET_NOT_NEW_FILM_FAILURE,
);

export const addFilmRequest = createAction(Constants.ADD_FILM_REQUEST);
export const addFilmSuccess = createAction(Constants.ADD_FILM_SUCCESS);
export const addFilmFailure = createAction(Constants.ADD_FILM_FAILURE);

export const searchAllFilmAdmin = createAction(
  Constants.SEARCH_ALL_FILM_ADMIN_REQUEST,
);
export const searchFilmAdmin = createAction(
  Constants.SEARCH_FILM_ADMIN_REQUEST,
);

export const addActorRequest = createAction(Constants.ADD_ACTOR_REQUEST);
export const addActorSuccess = createAction(Constants.ADD_ACTOR_SUCCESS);
export const addActorFailure = createAction(Constants.ADD_ACTOR_FAILURE);

export const addCinemaClusterRequest = createAction(
  Constants.ADD_CINEMA_CLUSTER_REQUEST,
);
export const addCinemaClusterSuccess = createAction(
  Constants.ADD_CINEMA_CLUSTER_SUCCESS,
);
export const addCinemaClusterFailure = createAction(
  Constants.ADD_CINEMA_CLUSTER_FAILURE,
);

export const addCinemaRequest = createAction(Constants.ADD_CINEMA_REQUEST);
export const addCinemaSuccess = createAction(Constants.ADD_CINEMA_SUCCESS);
export const addCinemaFailure = createAction(Constants.ADD_CINEMA_FAILURE);

export const getActorRequest = createAction(Constants.GET_ACTOR_REQUEST);
export const getActorSuccess = createAction(Constants.GET_ACTOR_SUCCESS);
export const getActorFailure = createAction(Constants.GET_ACTOR_FAILURE);

export const getCinemaAdminRequest = createAction(
  Constants.GET_CINEMA_ADMIN_REQUEST,
);
export const getCinemaAdminSuccess = createAction(
  Constants.GET_CINEMA_ADMIN_SUCCESS,
);
export const getCinemaAdminFailure = createAction(
  Constants.GET_CINEMA_ADMIN_FAILURE,
);

export const searchActorRequest = createAction(Constants.SEARCH_ACTOR_REQUEST);
export const searchActorSuccess = createAction(Constants.SEARCH_ACTOR_SUCCESS);
export const searchActorFailure = createAction(Constants.SEARCH_ACTOR_FAILURE);

export const getGenreAdminRequest = createAction(
  Constants.GET_GENRE_FILM_ADMIN_REQUEST,
);
export const getGenreAdminSuccess = createAction(
  Constants.GET_GENRE_FILM_ADMIN_SUCCESS,
);
export const getGenreAdminFailure = createAction(
  Constants.GET_GENRE_FILM_ADMIN_FAILURE,
);

export const updateFilmRequest = createAction(Constants.UPDATE_FILM_REQUEST);
export const updateFilmSuccess = createAction(Constants.UPDATE_FILM_SUCCESS);
export const updateFilmFailure = createAction(Constants.UPDATE_FILM_FAILURE);

export const updateHotFilmRequest = createAction(
  Constants.UPDATE_HOT_FILM_REQUEST,
);
export const updateHotFilmSuccess = createAction(
  Constants.UPDATE_HOT_FILM_SUCCESS,
);
export const updateHotFilmFailure = createAction(
  Constants.UPDATE_HOT_FILM_FAILURE,
);

export const updateNewFilmRequest = createAction(
  Constants.UPDATE_NEW_FILM_REQUEST,
);
export const updateNewFilmSuccess = createAction(
  Constants.UPDATE_NEW_FILM_SUCCESS,
);
export const updateNewFilmFailure = createAction(
  Constants.UPDATE_NEW_FILM_FAILURE,
);

export const deleteFilmAdminRequest = createAction(
  Constants.DELETE_FILM_ADMIN_REQUEST,
);
export const deleteFilmAdminSuccess = createAction(
  Constants.DELETE_FILM_ADMIN_SUCCESS,
);
export const deleteFilmAdminFailure = createAction(
  Constants.DELETE_FILM_ADMIN_FAILURE,
);

export const deleteCinemaRequest = createAction(
  Constants.DELETE_CINEMA_REQUEST,
);
export const deleteCinemaSuccess = createAction(
  Constants.DELETE_CINEMA_SUCCESS,
);
export const deleteCinemaFailure = createAction(
  Constants.DELETE_CINEMA_FAILURE,
);

export const updateActorRequest = createAction(Constants.UPDATE_ACTOR_REQUEST);
export const updateActorSuccess = createAction(Constants.UPDATE_ACTOR_SUCCESS);
export const updateActorFailure = createAction(Constants.UPDATE_ACTOR_FAILURE);

export const deleteActorRequest = createAction(Constants.DELETE_ACTOR_REQUEST);
export const deleteActorSuccess = createAction(Constants.DELETE_ACTOR_SUCCESS);
export const deleteActorFailure = createAction(Constants.DELETE_ACTOR_FAILURE);

export const updateCinemaClusterRequest = createAction(
  Constants.UPDATE_CINEMA_CLUSTER_REQUEST,
);
export const updateCinemaClusterSuccess = createAction(
  Constants.UPDATE_CINEMA_CLUSTER_SUCCESS,
);
export const updateCinemaClusterFailure = createAction(
  Constants.UPDATE_CINEMA_CLUSTER_FAILURE,
);

export const getCinemaRequest = createAction(Constants.GET_CINEMA_REQUEST);
export const getCinemaSuccess = createAction(Constants.GET_CINEMA_SUCCESS);
export const getCinemaFailure = createAction(Constants.GET_CINEMA_FAILURE);

export const deleteLiveFilmRequest = createAction(
  Constants.DELETE_LIVE_FILM_REQUEST,
);
export const deleteLiveFilmSuccess = createAction(
  Constants.DELETE_LIVE_FILM_SUCCESS,
);
export const deleteLiveFilmFailure = createAction(
  Constants.DELETE_LIVE_FILM_FAILURE,
);

export const deleteHotFilmRequest = createAction(
  Constants.DELETE_HOT_FILM_REQUEST,
);
export const deleteHotFilmSuccess = createAction(
  Constants.DELETE_HOT_FILM_SUCCESS,
);
export const deleteHotFilmFailure = createAction(
  Constants.DELETE_HOT_FILM_FAILURE,
);

export const deleteNewFilmRequest = createAction(
  Constants.DELETE_NEW_FILM_REQUEST,
);
export const deleteNewFilmSuccess = createAction(
  Constants.DELETE_NEW_FILM_SUCCESS,
);
export const deleteNewFilmFailure = createAction(
  Constants.DELETE_NEW_FILM_FAILURE,
);

export const clearTempCinema = createAction(Constants.CLEAR_TEMP_CINEMA);

export const loginRequest = createAction(Constants.LOGIN_REQUEST);
export const loginSuccess = createAction(Constants.LOGIN_SUCCESS);
export const loginFailure = createAction(Constants.LOGIN_FAILURE);
