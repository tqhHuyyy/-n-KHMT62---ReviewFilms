import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/scss/NavBarStyles.scss';
export default class NavLinkComponent extends React.Component {
  render() {
    let listCinema = this.props.dataCinemas;
    return (
      <nav className="navBar-content-nav">
        <ul className="menu">
          <li className="menu-item">
            Rạp chiếu
            <div className="menu-item-sub">
              <ul>
                {listCinema &&
                  listCinema.cinemas.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link
                          to="/cinemas"
                          style={{textDecoration: 'none'}}
                          onClick={() => this.props.getDetailCinema(item._id)}
                        >
                          <span className="item-span">
                            {item.CinemaClusterName}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </li>
          <li className="menu-item">
            Phim
            <div className="menu-item-sub">
              <ul>
                <li>
                  <Link
                    to="/find/in_theater"
                    onClick={() => {
                      this.props.getInTheaterFilm({
                        pageIndex: 1,
                        content: 'Phim Đang Chiếu',
                      });
                    }}
                  >
                    Phim Đang Chiếu
                  </Link>
                </li>

                <li>
                  <Link
                    to="/find/coming_soon"
                    onClick={() => {
                      this.props.getComingSoonFilm({
                        pageIndex: 1,
                        content: 'Phim Sắp Chiếu',
                      });
                    }}
                  >
                    Phim Sắp Chiếu
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="menu-item">
            Thể Loại
            <div className="menu-item-sub">
              <ul>
                <li>
                  <Link
                    to="/find/Action"
                    onClick={() => {
                      this.props.getGenreFilm({
                        pageIndex: 1,
                        content: 'Hành Động',
                        genre: 'Hành Động',
                      });
                    }}
                  >
                    Hành Động
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find/Adventure"
                    onClick={() => {
                      this.props.getGenreFilm({
                        pageIndex: 1,
                        content: 'Phiêu Lưu',
                        genre: 'Phiêu Lưu',
                      });
                    }}
                  >
                    Phiêu lưu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find/comedy"
                    onClick={() => {
                      this.props.getGenreFilm({
                        pageIndex: 1,
                        content: 'Hài Hước',
                        genre: 'Hài Hước',
                      });
                    }}
                  >
                    Hài hước
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find/crime"
                    onClick={() => {
                      this.props.getGenreFilm({
                        pageIndex: 1,
                        content: 'Tội Phạm',
                        genre: 'Tội Phạm',
                      });
                    }}
                  >
                    Tội phạm
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find/drama"
                    onClick={() => {
                      this.props.getGenreFilm({
                        pageIndex: 1,
                        content: 'Chính Kịch',
                        genre: 'Chính Kịch',
                      });
                    }}
                  >
                    Chính Kịch
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find/history"
                    onClick={() => {
                      this.props.getGenreFilm({
                        pageIndex: 1,
                        content: 'Lịch Sử',
                        genre: 'Lịch Sử',
                      });
                    }}
                  >
                    Lịch Sử
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find/horror"
                    onClick={() => {
                      this.props.getGenreFilm({
                        pageIndex: 1,
                        content: 'Kinh Dị',
                        genre: 'Kinh Dị',
                      });
                    }}
                  >
                    Kinh Dị
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find/animation"
                    onClick={() => {
                      this.props.getGenreFilm({
                        pageIndex: 1,
                        content: 'Hoạt hình',
                        genre: 'Hoạt hình',
                      });
                    }}
                  >
                    Hoạt hình
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="menu-item">
            <Link to="/contact/">Liên Hệ</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
