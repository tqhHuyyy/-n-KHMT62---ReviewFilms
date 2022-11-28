import * as Constants from "../constants"

const DEFAULT_STATE = {
    isFetching: null,
    listCinemas: null,
    dataCinemaCluster: null
}

const CinemaReducer = (state = DEFAULT_STATE, action = {}) => {
    switch (action.type) {
        case Constants.GET_CINEMAS_CLUSTER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case Constants.GET_CINEMAS_CLUSTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listCinemas: action.payload,
                dataCinemaCluster: action.payload
            }
        case Constants.GET_CINEMAS_CLUSTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload.errorMessage
            }
        default:
            return state
    }

}

export default CinemaReducer