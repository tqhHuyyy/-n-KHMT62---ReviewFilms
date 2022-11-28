// import * as Constants from '../constants';

// const DEFAULT_STATE = {
//     isFetching: null,
//     navList: [],
// }

// const SideMenuReducer = (state = DEFAULT_STATE, action ) => {
//     switch (action.type) {
//         case Constants.GET_ALL_FILM_REQUEST:
//         case Constants.GET_NAV_FILM_REQUEST:
//         case Constants.GET_NAV_FILM_HOT_REQUEST:
//         case Constants.GET_NAV_FILM_NEW_REQUEST:
//         case Constants.GET_NAV_FILM_COMMING_SOON_REQUEST:
//         case Constants.GET_NAV_FILM_PLAYING_REQUEST:
//         case Constants.GET_ALL_CATEGORY_REQUEST:
//         case Constants.GET_ALL_ACTOR_REQUEST:
//             return {
//                 ...state,
//                 isFetching: true,
//             }
//         case Constants.GET_ALL_FILM_SUCCESS:
//         case Constants.GET_NAV_FILM_SUCCESS:
//         case Constants.GET_NAV_FILM_HOT_SUCCESS:
//         case Constants.GET_NAV_FILM_NEW_SUCCESS:
//         case Constants.GET_NAV_FILM_COMMING_SOON_SUCCESS:
//         case Constants.GET_NAV_FILM_PLAYING_SUCCESS:
//         case Constants.GET_ALL_CATEGORY_SUCCESS:
//         case Constants.GET_ALL_ACTOR_SUCCESS:
//             return {
//                 ...state,
//                 isFetching: false,
//                 navList: action.payload.navList
//             }
//         case Constants.GET_ALL_FILM_FAILURE:
//         case Constants.GET_NAV_FILM_FAILURE:
//         case Constants.GET_NAV_FILM_HOT_FAILURE:
//         case Constants.GET_NAV_FILM_NEW_FAILURE:
//         case Constants.GET_NAV_FILM_COMMING_SOON_FAILURE:
//         case Constants.GET_NAV_FILM_PLAYING_FAILURE:
//         case Constants.GET_ALL_CATEGORY_FAILURE:
//         case Constants.GET_ALL_ACTOR_FAILURE:
//             return {
//                 ...state,
//                 isFetching: false,
//             }
//         default:
//             return state
//     }

// }

// export default SideMenuReducer