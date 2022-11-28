/**
 * Tao 1 bien chua danh sach phim tu prop
 * Map danh sach thanh cac phan tu theo kich thuoc 4 hang
 * Phan trang
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle, BsCollectionPlay } from 'react-icons/bs';
import ModalIframeComponent from '../commonComponents/ModalIframeComponent';
import '../../styles/css/ListFilm.css';
export class ListFilmComponent extends Component {
  state = {
    overlay: false,
    urlTrailer: '',
  };
  handleOverlay(url) {
    this.setState({
      overlay: true,
      urlTrailer: url,
    });
  }
  render() {
    // console.log(this.state.TrailerUrl, this.props.listData)
    let content = this.props.content;
    if (this.props.path === '/find/search') {
      content = content + this.props.textSearch;
    }
    return (
      <div className="background">
        <div className="wrapper1">
          <div className="Text">
            <h1>{content}</h1>
          </div>
          <div className="listFilm">
            {this.props.listData ? (
              this.props.listData.map((item, key) => {
                const defaultUrl = 'https://www.youtube.com/embed/3VZFpwlXKpg';
                const url = item.TrailerUrl
                  ? item.TrailerUrl === ''
                    ? defaultUrl
                    : item.TrailerUrl
                  : defaultUrl;
                const nameFilm = item.FilmName.replace(/\s/g, '-');
                // console.log(url)
                return (
                  <div className="film-item" key={key}>
                    <div class="poster">
                      <Link
                        to={`/film/${item._id}`}
                        onClick={() => this.props.getFilmDetail(item._id)}
                        className="infor"
                      >
                        <img
                          src={item?.PosterImage?.Url}
                          alt=""
                          style={{ width: '110%' }}
                        />
                      </Link>
                    </div>
                    <div>
                      <h3>{item.FilmName}</h3>
                    </div>
                    <div className={'running-time'}>
                      Thời lượng: {item.RunningTime} phút
                    </div>{' '}
                    <br />
                    <div
                      className="film-option"
                      onClick={() => this.handleOverlay(url)}
                    >
                      <BsCollectionPlay className="icon" />
                      <h5>Trailler</h5>
                      <Link
                        to={`/film/${item._id}`}
                        onClick={() => this.props.getFilmDetail(item._id)}
                        className="infor"
                      >
                        <BsInfoCircle
                          className="icon"
                          style={{ color: 'white' }}
                        />
                        <h5>Chi tiết</h5>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
        <ModalIframeComponent
          show={this.state.overlay}
          onHide={() => this.setState({ overlay: false })}
          url={this.state.urlTrailer}
        />
      </div>
    );
  }
}

export default ListFilmComponent;
