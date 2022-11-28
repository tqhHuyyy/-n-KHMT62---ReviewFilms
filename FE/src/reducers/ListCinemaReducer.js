import * as Constants from '../constants';

const DEFAULT_STATE = {
    isFetching: null,
    dataCinemaDetail: '',
}

const ListCinemaReducer = (state = DEFAULT_STATE, action = {}) => {
    switch (action.type) {
        case Constants.GET_CINEMA_DETAIL_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case Constants.GET_CINEMA_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataCinemaDetail: action.payload,
            }
        case Constants.GET_CINEMA_DETAIL_FAILURE:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state
    }

}

export default ListCinemaReducer