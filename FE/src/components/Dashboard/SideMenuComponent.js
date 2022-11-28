import React, {Component} from 'react';
import '../../styles/scss/SideMenu.scss';
import logo from '../../images/logo.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {withRouter, Link} from 'react-router-dom';

export class SideMenuComponent extends Component {
  state = {
    isMenu: false,
    isLoggedIn: true,
  };

  render() {
    return (
      <>
        <div className="nav-bar">
          <Link to="/">
            <img className="nav-img" src={logo} alt="" />
          </Link>
          <div
            className="nav-out"
            onClick={() => {
              localStorage.setItem('isLoggedIn', 'false');
              this.props.history.push('/login');
            }}
          >
            <ExitToAppIcon className="icon-out" />
            Đăng xuất
          </div>
        </div>
        <div>
          <Link
            to="/dashboard"
            className={
              'nav-btn-sz ' +
              (window.location.pathname === '/dashboard'
                ? 'selected'
                : ' nav-all-btn ')
            }
          >
            Tất cả các phim{' '}
          </Link>
          <div
            className="item nav-all-btn"
            onClick={() => {
              this.setState({isMenu: !this.state.isMenu});
            }}
          >
            Danh mục phim
            <div className="icon-item">
              <div
                className="icon-up"
                style={{display: this.state.isMenu ? 'block' : 'none'}}
              >
                <svg style={{width: 24, height: 24}} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
                  />
                </svg>
              </div>
              <div
                className="icon-down"
                style={{display: this.state.isMenu ? 'none' : 'block'}}
              >
                <svg style={{width: 24, height: 24}} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <ul style={{display: this.state.isMenu ? 'block' : 'none'}}>
            <li className="item-detail">
              <svg style={{width: 24, height: 24}} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z"
                />
              </svg>
              <Link
                to="/dashboard/hot"
                className={
                  'nav-btn ' +
                  (window.location.pathname === '/dashboard/hot'
                    ? 'selected'
                    : ' nav-all-btn ')
                }
              >
                Phim Hot
              </Link>
            </li>
            <li className="item-detail">
              <svg style={{width: 24, height: 24}} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z"
                />
              </svg>
              <Link
                to="/dashboard/new"
                className={
                  'nav-btn ' +
                  (window.location.pathname === '/dashboard/new'
                    ? 'selected'
                    : ' nav-all-btn ')
                }
              >
                Phim Mới
              </Link>
            </li>
            <li className="item-detail">
              <svg style={{width: 24, height: 24}} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z"
                />
              </svg>
              <Link
                to="/dashboard/commingSoon"
                className={
                  'nav-btn ' +
                  (window.location.pathname === '/dashboard/commingSoon'
                    ? 'selected'
                    : ' nav-all-btn ')
                }
              >
                Phim Sắp chiếu
              </Link>
            </li>
            <li className="item-detail">
              <svg style={{width: 24, height: 24}} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z"
                />
              </svg>
              <Link
                to="/dashboard/live"
                className={
                  'nav-btn ' +
                  (window.location.pathname === '/dashboard/live'
                    ? 'selected'
                    : ' nav-all-btn ')
                }
              >
                Phim đang chiếu
              </Link>
            </li>
          </ul>
          <div>
            <Link
              to="/dashboard/cinema"
              className={
                'nav-btn-ss ' +
                (window.location.pathname === '/dashboard/cinema'
                  ? 'selected'
                  : ' nav-all-btn ')
              }
            >
              Danh mục rạp
            </Link>
          </div>
          <div>
            {}
            <Link
              to="/dashboard/actors"
              className={
                'nav-btn-ss ' +
                (window.location.pathname === '/dashboard/actors'
                  ? 'selected'
                  : ' nav-all-btn ')
              }
            >
              Diễn Viên
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SideMenuComponent);
