import React, {Component} from 'react';
import {FaUserAlt, FaLock} from 'react-icons/fa';
import {withRouter} from 'react-router-dom';
import '../../styles/css/Login.css';
import LogoComponent from '../Home/LogoComponent';
// import loading from '../../../public/Images/loading.gif'

export class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: {
        value: '',
        isInputValid: true,
        errorMessage: '',
      },
      Password: {
        value: '',
        isInputValid: true,
        errorMessage: '',
      },
      checked: true,
      hiddenLoginError: true,
    };
  }

  render() {
    const loading = window.location.origin + '/Images/loading4.gif';
    const {from} = this.props.location.state || {
      from: {pathname: '/dashboard'},
    };

    const handleCheckboxChange = () => {
      this.setState({...this.state, checked: !this.state.checked});
    };

    const handleSubmit = () => {
      this.props.loginRequest({
        objUpdate: {
          Username: this.state.Username.value,
          Password: this.state.Password.value,
        },
        checked: this.state.checked,
      });
    };

    const handleInputChange = (event) => {
      const {name, value} = event.target;
      const newState = {...this.state[name]}; /* dummy object */
      newState.value = value;
      this.setState({[name]: newState});
    };

    const validateInput = (type, checkingText) => {
      if (type === 'Username') {
        if (checkingText) {
          return {
            isInputValid: true,
            errorMessage: '',
          };
        } else {
          return {
            isInputValid: false,
            errorMessage: 'Yêu cầu nhập tài khoản.',
          };
        }
      }
      if (type === 'Password') {
        if (checkingText) {
          return {
            isInputValid: true,
            errorMessage: '',
          };
        } else {
          return {
            isInputValid: false,
            errorMessage: 'Yêu cầu nhập mật khẩu.',
          };
        }
      }
    };

    const handleInputValidation = (event) => {
      const {name} = event.target;
      const {isInputValid, errorMessage} = validateInput(
        name,
        this.state[name].value,
      );
      const newState = {...this.state[name]}; /* dummy object */
      newState.isInputValid = isInputValid;
      newState.errorMessage = errorMessage;
      this.setState({[name]: newState});
    };
    if (localStorage.isLoggedIn === 'true') {
      this.props.history.push(from);
    }
    return (
      <div className="wrapper-login">
        <div className="blur">
          <div className="logo-login">
            <LogoComponent />
          </div>
          <div className="login-body">
            <div className="text-login">
              <h3>ADMIN LOGIN</h3>
            </div>
            <span
              className="login-fail-err"
              hidden={this.props.loginFail !== 0 ? false : true}
            >
              Đăng nhập không đúng !
            </span>
            <div className="user-login">
              <h6>Username</h6>
              <FaUserAlt className="icon-login" />
              <input
                name={'Username'}
                className="input-login"
                value={this.state.Username.value}
                onBlur={handleInputValidation}
                onChange={handleInputChange}
              />
              <span className="err-message" hidden={this.state.isInputValid}>
                <i>{this.state.Username.errorMessage}</i>
              </span>
            </div>
            <div className="user-login pass-login">
              <h6>Password</h6>
              <FaLock className="icon-login" />
              <input
                name={'Password'}
                className="input-login"
                type={'password'}
                value={this.state.Password.value}
                onChange={handleInputChange}
                onBlur={handleInputValidation}
              />
              <span className="err-message" hidden={this.state.isInputValid}>
                <i>{this.state.Password.errorMessage}</i>
              </span>
            </div>
            <div className="checkbox-login">
              <input
                id="remember_me"
                type="checkbox"
                aria-checked="true"
                checked={this.state.checked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="remember_me" className="checkbox-label">
                <span>Remember me</span>
              </label>
            </div>
            <div className="submit" onClick={handleSubmit}>
              {this.props.isFetching ? (
                <div className="loadingLogin">
                  <img src={loading} alt={'loading'} />
                </div>
              ) : (
                'LOGIN'
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginComponent);
