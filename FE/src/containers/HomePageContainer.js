/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/iframe-has-title */
/**
 * Trang chủ gồm 3 slide
 * 1 component slide lớn để ảnh cover phim
 * 2 component chứa danh sách các phim mới và hot
 */
import React, {Component} from 'react';
import * as actions from '../actions/Actions';
import {connect} from 'react-redux';
import CarouselComponent from '../components/commonComponents/CarouselComponent';
import CarouselHeroHeader from '../components/commonComponents/CarouselHeroHeader';
import '../styles/css/CarouselStyles.css';
import ModalIframeComponent from '../components/commonComponents/ModalIframeComponent';
import {Link} from 'react-router-dom';

export class HomePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false,
      urlTrailer: '',
    };
    this.handleOverlay = this.handleOverlay.bind(this);
  }
  handleOverlay(url) {
    this.setState({
      overlay: true,
      urlTrailer: url,
    });
  }
  componentDidMount() {
    this.props.loadHotFilm();
    this.props.loadNewFilm();
  }

  render() {
    let coverImage = [];
    for (let i = 0; i < this.props.dataHotFilm.Films.length; i++) {
      coverImage.push(this.props.dataHotFilm.Films[i].CoverImage);
    }
    return (
      <>
        <div>
          <CarouselHeroHeader caroselImages={coverImage} />
          <div
            className="hot-cinema-carousel"
            style={{
              position: 'relative',
              display:
                this.props.dataHotFilm?.Films?.length == 0 ? 'none' : 'block',
            }}
          >
            <div className="hot-cinema-carousel-title"
             style={{textAlign: 'start', paddingLeft: 30}}
            >
              <Link
                to="find/hot"
                onClick={() => {
                  this.props.getGenreFilm({
                    pageIndex: 1,
                    content: 'Phim Hot',
                    genre: 'hot',
                  });
                }}
              >
                Phim Hot
              </Link>
            </div>
            <hr />
            <CarouselComponent
              handleOverlay={(url) => this.handleOverlay(url)}
              data={this.props.dataHotFilm?.Films}
              getFilmDetail={this.props.getFilmDetail}
            />
          </div>

          <div
            className="new-cinema-carousel"
            style={{
              position: 'relative',
              display:
                this.props.dataNewFilm?.Films?.length == 0 ? 'none' : 'block',
            }}
          >
            <div
              className="new-cinema-carousel-title"
              style={{textAlign: 'start', paddingRight: 30}}
            >
              <Link
                to="find/new"
                onClick={() => {
                  this.props.getGenreFilm({
                    pageIndex: 1,
                    content: 'Phim Mới',
                    genre: 'new',
                  });
                }}
              >
                Phim Mới
              </Link>
            </div>
            <hr />
            <CarouselComponent
              data={this.props.dataNewFilm?.Films}
              handleOverlay={(url) => this.handleOverlay(url)}
              getFilmDetail={this.props.getFilmDetail}
            />
          </div>
        </div>

        <ModalIframeComponent
          show={this.state.overlay}
          onHide={() => this.setState({overlay: false})}
          url={this.state.urlTrailer}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataHotFilm: state.hotFilm.listHotFilm,
    dataNewFilm: state.newFilm.listNewFilm,
    content: state.listFilmReducer.content,
    genre: state.listFilmReducer.genre,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadHotFilm: () => {
      dispatch(actions.getListHotFilm());
    },
    loadNewFilm: () => {
      dispatch(actions.getListNewFilm());
    },
    getFilmDetail: (id) => {
      dispatch(actions.getFilmDetailRequest(id));
    },
    getGenreFilm: (data) => {
      dispatch(actions.getGenreFilmRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
