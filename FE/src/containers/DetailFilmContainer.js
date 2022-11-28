import React, {Component} from 'react';
import {connect} from 'react-redux';
import CarouselHeroHeader from '../components/commonComponents/CarouselHeroHeader';
import ActorComponent from '../components/DetailFilm/ActorComponent';
import FilmInforComponent from '../components/DetailFilm/FilmInforComponent';
import InTheaterComponent from '../components/DetailFilm/InTheaterComponent';
import ReviewFilmComponent from '../components/DetailFilm/ReviewFilmComponent';
import '../styles/scss/DetailFilmStyles.scss';
import * as actions from '../actions/Actions';

export class DetailFilmContainer extends Component {
  componentDidMount() {
    if (!this.props.filmDetail) {
      const arr = window.location.pathname.split('/');
      const _id = arr[arr.length - 1];
      this.props.getFilmDetail(_id);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  render() {
    return (
      <div className="film-detail">
        <div>
          <CarouselHeroHeader caroselImages={this.props.filmDetail?.Images} />
        </div>
        <div className="film-info-container">
          <FilmInforComponent {...this.props} />
        </div>
        <div>
          <div className="actor-title">
            <h2>Diễn Viên</h2>
          </div>
          <div className="film-content">
            <ReviewFilmComponent {...this.props} />
            <ActorComponent {...this.props} />
          </div>
        </div>
        <div>
          <InTheaterComponent {...this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.detailFilmReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFilmDetail: (id) => {
      dispatch(actions.getFilmDetailRequest(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailFilmContainer);
