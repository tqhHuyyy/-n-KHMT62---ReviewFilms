/**
 * Gọi sang các component con của nav bar là
 * logo, navlink,thanh search
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavBarComponent from '../../components/commonComponents/NavBarComponent';
import * as actions from '../../actions/Actions';

class NavContainer extends Component {
  componentDidMount() {
    this.props.getCinemas();
  }
  render() {
    return (
      <NavBarComponent
        getCinemas={(data) => this.props.getCinemas(data)}
        getComingSoonFilm={(data) => this.props.getComingSoonFilm(data)}
        getInTheaterFilm={(data) => this.props.getInTheaterFilm(data)}
        getListSearchFilm={(data) => this.props.getListSearchFilm(data)}
        getGenreFilm={(data) => this.props.getGenreFilm(data)}
        getDetailCinema={(data) => this.props.getDetailCinema(data)}
        content={this.props.content}
        genre={this.props.content}
        textSearch={this.props.textSearch}
        status={this.props.status}
        dataCinemas={this.props.dataCinemas}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.listFilmReducer.content,
    dataCinemas: state.cinemaReducer.listCinemas,
    dateSearchFilm: state?.searchFilm?.listDataSearch,
    genre: state.listFilmReducer.genre,
    textSearch: state.listFilmReducer.textSearch,
    status: state.listFilmReducer.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getComingSoonFilm: (data) => {
      dispatch(actions.getComingSoonFilm(data));
    },
    getInTheaterFilm: (data) => {
      dispatch(actions.getInTheaterRequest(data));
    },
    getCinemas: () => {
      dispatch(actions.getListCinemas());
    },
    getDetailCinema: (id) => {
      dispatch(actions.getCinemaCluster(id));
    },
    getListSearchFilm: (data) => {
      dispatch(actions.getListSearchFilm(data));
    },
    getGenreFilm: (data) => {
      dispatch(actions.getGenreFilmRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
