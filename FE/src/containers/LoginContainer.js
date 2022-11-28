import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginComponent from '../components/Login/LoginComponent';
import * as actions from '../actions/Actions';
export class LoginContainer extends Component {
  render() {
    return (
      <div>
        <LoginComponent
          loginFail={this.props.loginFail}
          checked={this.props.checked}
          isLoggedIn={this.props.isLoggedIn}
          isFetching={this.props.isFetching}
          loginRequest={(data) => {
            this.props.loginRequest(data);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLogin,
    isFetching: state.loginReducer.isFetching,
    checked: state.loginReducer.checked,
    loginFail: state.loginReducer.loginFail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (data) => {
      dispatch(actions.loginRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
