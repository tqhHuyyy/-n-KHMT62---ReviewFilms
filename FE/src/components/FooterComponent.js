import React, { Component } from 'react';
import '../styles/css/FooterStyles.css';
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaTelegram } from 'react-icons/fa';
import { CgMail } from 'react-icons/cg';
export class FooterComponent extends Component {
  render() {
    let dataCinemas = this.props.dataCinemas?.cinemas;
    return (
      <footer>
        <div className="container-fluid footer-content">
          <div className="row">
            <div className="col-3 footer-content-logo">
              <div className="logo">
                <img src={Logo} alt="" />
              </div>
              <p>Trang web giới thiệu phim mới của rạp chiếu phim</p>
            </div>
            <div className="col-3 footer-content-cinema">
              <div className="title">Danh sách rạp</div>
              {dataCinemas?.map((item, index) => {
                if (index < 5) {
                  const nameCinema = item?.CinemaClusterName.replace(
                    /\s/g,
                    '-',
                  );
                  return (
                    <Link
                      key={index}
                      to={`/cinemas/${nameCinema}`}
                      onClick={() => {
                        this.props.getDetailCinema(item._id);
                      }}
                      style={{ textDecoration: 'none' }}
                    >
                      <p className="cluster">{item.CinemaClusterName}</p>
                    </Link>
                  );
                }
              })}
            </div>
            <div className="col-3 footer-content-film">
              <div className="title">Danh sách phim</div>
              <div>
                <ul className="link-film">
                  <li>
                    <Link
                      to="/find/hot"
                      onClick={() => {
                        this.props.getGenreFilm({
                          pageIndex: 1,
                          content: ' Phim Hot',
                          genre: 'hot',
                        });
                      }}
                    >
                      Phim Hot
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/find/new"
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
                  </li>
                  <li>
                    <Link
                      to="/find/coming_soon"
                      onClick={() => {
                        this.props.getGenreFilm({
                          pageIndex: 1,
                          content: 'Phim Sắp Chiếu',
                          genre: 'coming_soon',
                        });
                      }}
                    >
                      Phim Sắp Chiếu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/find/in_theater"
                      onClick={() => {
                        this.props.getGenreFilm({
                          pageIndex: 1,
                          content: 'Phim Đang Chiếu',
                          genre: 'in_theater',
                        });
                      }}
                    >
                      Phim Đang Chiếu
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-3 footer-content-contact">
              <div className="title">Liên hệ</div>
              <Link to="/contact">Về Chúng Tôi</Link>
              <Link to="/">
                <span>Liên Hệ Quảng Cáo</span>
              </Link>
              <div className="icon">
                <a href='https://www.facebook.com/profile.php?id=100014331281162'><FaFacebookSquare /></a>
                <a href='#'><FaTelegram /></a>
                <a href='#'><CgMail /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterComponent;
