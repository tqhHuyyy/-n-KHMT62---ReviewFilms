import React, {Component} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import '../../styles/css/ListFilm.css';

export class DashboardPagination extends Component {
  handlePageClick(page) {
    const path = window.location.pathname;
    const {pageIndex, textSearch} = page;
    const {
      genre,
      getAllFilm,
      getCinema,
      getActor,
      getHotFilm,
      getNewFilm,
      getLiveFilm,
    } = this.props;
    let obj = {};
    if (textSearch !== '') {
      obj = {pageIndex, textSearch, genre};
    } else {
      obj = {pageIndex, genre};
    }
    switch (genre) {
      case '':
        return getAllFilm(page);
      case 'hot':
        return getHotFilm(obj);
      case 'new':
        return getNewFilm(obj);
      case 'in_theater':
        return getLiveFilm(obj);
      case 'coming_soon':
        return getLiveFilm(obj);
      default:
        if (path === '/dashboard/actors') {
          textSearch === '' || textSearch === undefined
            ? getActor(obj)
            : getActor(page);
        }
        if (path === '/dashboard/cinema') {
          return getCinema(page);
        }
        break;
    }
  }

  render() {
    let pageIndex = this.props.pageIndex;
    let totalPage = this.props.totalPage;
    return (
      <div className="page-admin">
        <Pagination
          style={{display: this.props.totalPage ? 'block' : 'none'}}
          count={totalPage}
          page={pageIndex}
          boundaryCount={2}
          defaultPage={6}
          color="secondary"
          onChange={(e, val) =>
            pageIndex !== val &&
            this.handlePageClick({
              pageIndex: val,
              textSearch: this.props.textSearch,
            })
          }
          className="buttons"
        />
      </div>
    );
  }
}

export default DashboardPagination;
