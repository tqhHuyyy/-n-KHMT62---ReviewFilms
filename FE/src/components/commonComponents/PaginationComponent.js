import React, {Component} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import '../../styles/css/ListFilm.css';

export class PaginationComponent extends Component {
  handlePageClick(page) {
    const path = window.location.pathname;
    const {pageIndex} = page;
    const {
      content,
      genre,
      getComingSoonFilm,
      getInTheaterFilm,
      getGenreFilm
    } = this.props;
    let obj = {};
    if (content !== '') {
      obj = {pageIndex, content, genre};
    } else {
      obj = {pageIndex, genre};
    }

    switch (path) {
      case '/find/coming_soon':
        getComingSoonFilm(obj);
        break;
      case '/find/in_theater':
        getInTheaterFilm(obj);
        break;
      case '/find/Action':
        getGenreFilm(obj);
        break;
      case '/find/new':
        getGenreFilm(obj);
        // console.log(obj);
        break;
      case '/find/hot':
        getGenreFilm(obj);
        break;
      default:
        break;
    }
  }

  render() {
    let pageIndex = this.props.pageIndex;
    let totalPage = this.props.totalPage;

    return (
      <div className="page">
        <Pagination
          style={{display: this.props.totalPage ? 'block' : 'none'}}
          count={totalPage}
          page={pageIndex}
          boundaryCount={2}
          defaultPage={6}
          color="secondary"
          onChange={(e, val) =>
            this.handlePageClick({pageIndex: val, content: this.props.content})
          }
        />
      </div>
    );
  }
}

export default PaginationComponent;
