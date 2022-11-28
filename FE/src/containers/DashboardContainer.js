/**
 * Trang admin bao gồm 2 component
 * thanh công cụ thêm sửa xoá, danh sách các mục
 */

import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/Actions';
import SideMenuComponent from '../components/Dashboard/SideMenuComponent';
import AllFilmContainer from './AllFilmContainer';
import HotFilmContainer from './HotFilmContainer';
import NewFilmContainer from './NewFilmContainer';
import CinemaFilmContainer from './CinemaFilmContainer';
import CommingSoonFilmContainer from './CommingSoonFilmContainer';
import LiveFilmContainer from './LiveFilmContainer';
import ActorsFilmContainer from './ActorsFilmContainer';

export class DashboardContainer extends Component {
  componentDidMount() {
    if (localStorage.rememberMe === 'false') {
      window.addEventListener('beforeunload', function () {
        localStorage.clear();
      });
    }
  }
  render() {
    const {match} = this.props;
    return (
      <div className="container-xl">
        <div className="row">
          <div className="col-2 block">
            <SideMenuComponent {...this.props} />
          </div>
          <div className="col-10 home">
            <Switch>
              <Route exact path={`${match.path}`}>
                <AllFilmContainer />
              </Route>
              <Route exact path={`${match.path}hot`}>
                <HotFilmContainer />
              </Route>
              <Route exact path={`${match.path}new`}>
                <NewFilmContainer />
              </Route>
              <Route exact path={`${match.path}commingSoon`}>
                <CommingSoonFilmContainer />
              </Route>
              <Route exact path={`${match.path}live`}>
                <LiveFilmContainer />
              </Route>
              <Route exact path={`${match.path}cinema`}>
                <CinemaFilmContainer />
              </Route>
              <Route exact path={`${match.path}actors`}>
                <ActorsFilmContainer />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // navList: state.sideMenuReducer.navList,
    ...state.dashBoardReducer,
    checked: state.loginReducer.checked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFilm: (data) => dispatch(actions.getAllFilmAction(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(DashboardContainer));
