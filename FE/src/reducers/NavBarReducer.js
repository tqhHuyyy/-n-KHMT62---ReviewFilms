import * as Constants from '../constants';

const DEFAULT_STATE = {
    isFetching: null,

}

const NavBarReducer = (state = DEFAULT_STATE, action = {}) => {
    switch (action.type) {
        case Constants.GET_NEW_FILM_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case Constants.GET_NEW_FILM_SUCCESS:
            return {
                ...state,
                isFetching: false,
            }
        case Constants.GET_NEW_FILM_FAILURE:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state
    }

}

export default NavBarReducer