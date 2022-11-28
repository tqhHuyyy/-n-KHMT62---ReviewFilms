/**
 * Gọi sang các component con của nav bar là
 * logo, navlink,thanh search
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FooterComponent from '../../components/FooterComponent';
import * as actions from '../../actions/Actions';

class NavContainer extends Component {
  componentDidMount() {
    this.props.getCinemas();
  }
  render() {
    return <FooterComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    dataCinemas: state.cinemaReducer.listCinemas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCinemas: () => {
      dispatch(actions.getListCinemas());
    },
    getDetailCinema: (id) => {
      dispatch(actions.getCinemaCluster(id));
    },
    getComingSoonFilm: (data) => {
      dispatch(actions.getComingSoonFilm(data));
    },
    getInTheaterFilm: (data) => {
      dispatch(actions.getInTheaterRequest(data));
    },
    getGenreFilm: (data) => {
      dispatch(actions.getGenreFilmRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
