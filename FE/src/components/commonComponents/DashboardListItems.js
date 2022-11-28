import React, { Component } from 'react';
import '../../styles/scss/AdPopupFilm.scss';
import defaultImg from '../../asset/images/default-image.jpg';
import Skeleton from 'react-loading-skeleton';

export default class DashboardListItems extends Component {
  state = {
    isDelete: false,
  };

  render() {
    const listFilm = this.props.films;
    const listActor = this.props.listActor;
    const listCinema = this.props.listCinema;
    const listData = listFilm ? listFilm : listActor ? listActor : listCinema;
    const { onSelected, onFilmClicked } = this.props;
    const loading = this.props.loading;
    return (
      <div className="container-fluid">
        <div className="row list-tools">
          {listData.map((item, key) => {
            const id = item._id;
            const url = listFilm
              ? item?.PosterImage?.Url //Nếu là danh sách phim thì lấy item.url
              : listActor && item.Image
              ? item.Image?.Url //Nếu là danh sách diễn viên thì lấy ảnh Image
              : item.Image === null
              ? item.Image
              : item.CinemaImage?.Url; //Nếu không lấy ảnh của Cinema
            const name = listFilm
              ? item.FilmName
              : item.ActorName
              ? item.ActorName
              : item.CinemaClusterName;
            const path =
              window.location.pathname === '/dashboard/cinema' ||
              window.location.pathname === '/dashboard/actors';
            const renderItem = loading ? (
              <Skeleton count={8} />
            ) : (
              <div className="col-2 list" key={`film-${key}`}>
                {this.props.isDelete && (
                  <input
                    className="empty"
                    type="checkbox"
                    onChange={(e) => onSelected(e.target.checked, id)}
                  />
                )}
                <div className="list-home" key={`film-${key}`}>
                  <img
                    className="img-item"
                    style={path ? { height: 230 } : { height: 250 }}
                    src={url ? url : defaultImg}
                    alt="#"
                    onClick={() => {
                      if (onFilmClicked) {
                        onFilmClicked(item);
                      }
                    }}
                  />
                  <p
                    className="content-item"
                    style={
                      path ? { textAlign: 'center' } : { textAlign: 'left' }
                    }
                  >
                    {name}
                  </p>
                </div>
              </div>
            );
            return renderItem;
          })}
        </div>
      </div>
    );
  }
}
