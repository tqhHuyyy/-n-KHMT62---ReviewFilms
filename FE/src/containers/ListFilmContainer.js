/**
 * Danh sách phim chứa
 * 1 component sanh sách các phim được truyền vào
 * 1 component về phân trang
 */

import React, {Component} from 'react';
import * as actions from '../actions/Actions';
import {connect} from 'react-redux';
import PaginationComponent from '../components/commonComponents/PaginationComponent';
import ListFilmComponent from '../components/commonComponents/ListFilmComponent';

export class ListFilmContainer extends Component {
  componentDidMount() {
    const path = window.location.pathname;
    if (path === '/find/coming_soon') {
      this.props.getComingSoonFilm({
        pageIndex: 1,
        content: 'Phim Sắp Chiếu',
      });
    } else if (path === '/find/in_theater') {
      this.props.getInTheaterFilm({
        pageIndex: 1,
        content: 'Phim Đang Chiếu',
      });
    } else if (path === '/find/Action') {
      this.props.getGenreFilm({
        pageIndex: 1,
        content: 'Hành Động',
        genre: 'Action',
      });
    } else if (path === '/find/Adventure') {
      this.props.getGenreFilm({
        pageIndex: 1,
        content: 'Phiêu Lưu',
        genre: 'Adventure',
      });
    } else if (path === '/find/comedy') {
      this.props.getGenreFilm({
        pageIndex: 1,
        content: 'Hài Hước',
        genre: 'comedy',
      });
    } else if (path === '/find/crime') {
      this.props.getGenreFilm({
        pageIndex: 1,
        content: 'Tội Phạm',
        genre: 'crime',
      });
    } else if (path === '/find/history') {
      this.props.getGenreFilm({
        pageIndex: 1,
        content: 'Lịch Sử',
        genre: 'history',
      });
    } else if (path === '/find/animation') {
      this.props.getGenreFilm({
        pageIndex: 1,
        content: 'Hoạt hình',
        genre: 'animation',
      });
    } else if (path === '/find/hot') {
      this.props.getFilmPage({
        pageIndex: 1,
        content: ' Phim Hot',
        genre: 'hot',
      });
    } else if (path === '/find/new') {
      this.props.getFilmPage({
        pageIndex: 1,
        content: ' Phim Mới',
        genre: 'new',
      });
    }
  }
  render() {
    return (
      <div>
        <div>
          <ListFilmComponent {...this.props} />
        </div>
        <div>
          <PaginationComponent {...this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.listFilmReducer,
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
    getFilmDetail: (id) => {
      dispatch(actions.getFilmDetailRequest(id));
    },
    getGenreFilm: (data) => {
      dispatch(actions.getGenreFilmRequest(data));
    },
    getListSearchFilm: (data) => {
      dispatch(actions.getListSearchFilm(data));
    },
    getFilmPage: (data) => {
      dispatch(actions.getFilmPagination(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFilmContainer);
