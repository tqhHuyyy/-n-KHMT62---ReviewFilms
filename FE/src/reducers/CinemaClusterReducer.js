import * as Constants from "../constants"

const DEFAULT_STATE = {
    isFetching: null,
    dataCinemaDetail: null,
}

const CinemaClusterReducer = (state = DEFAULT_STATE, action = {}) => {
    switch (action.type) {
        case Constants.GET_DETAIL_CINEMA_CLUSTER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case Constants.GET_DETAIL_CINEMA_CLUSTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataCinemaDetail: action.payload
            }
        case Constants.GET_DETAIL_CINEMA_CLUSTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload.errorMessage
            }
        default:
            return state
    }

}

export default CinemaClusterReducer