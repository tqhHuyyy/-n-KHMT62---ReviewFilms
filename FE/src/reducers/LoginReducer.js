import * as Constants from '../constants';

const DEFAULT_STATE = {
    isFetching: null,
    isLogin: false,
    loginFail: 0,
    checked: false,
    LoginError: null,
    errMsg: '',
}

const LoginReducer = (state = DEFAULT_STATE, action = {}) => {
    switch (action.type) {
        case Constants.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case Constants.LOGIN_SUCCESS:
            localStorage.setItem("isLoggedIn", 'true')
            // sessionStorage.setItem("isLoggedIn", 'true')
            if (action.payload.checked) {
                localStorage.setItem("rememberMe", 'true')
            } else {
                localStorage.setItem("rememberMe", 'false')
            }
            return {
                ...state,
                isFetching: false,
                isLogin: true,
                loginFail: 0
            }
        case Constants.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                loginFail: state.loginFail + 1,
                LoginError: true,
                errMsg: action.payload
            }
        default:
            return state
    }

}

export default LoginReducer