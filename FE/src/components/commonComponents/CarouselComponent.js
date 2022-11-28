import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, EffectFade } from 'swiper/core';
import Slider from 'react-slick';
import '../../styles/scss/CarouselStyles.scss';
import '../../styles/scss/common.scss';
import { BsInfoCircle, BsCollectionPlay } from 'react-icons/bs';
class CarouselComponent extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next = () => {
    this.refs.slider.slickNext();
  };
  previous = () => {
    this.refs.slider.slickPrev();
  };
  openOverlay = () => {
    this.props.handleOverlay();
  };
  render() {
    SwiperCore.use([EffectFade, Navigation]);
    let data = this.props.data;
    return (
      <div className="carousel">
        <Swiper
          navigation={true}
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
        >
          {data &&
            data.map((item, index) => {
              const defaultUrl = 'https://www.youtube.com/embed/3VZFpwlXKpg';
              const url = item.TrailerUrl ? item.TrailerUrl : defaultUrl;
              //Phía trên điều kiện chọn url cho trailer, nếu trường TrailerUrl tồn tại thì thì lấy, ko thì lấy mặc định
              //Nếu TrailerUrl không có đường dẫn trailer thì sẽ chạy đường dẫn mặc định (defaultUrl)
              return (
                <div className={'carousel-item-first'} key={index}>
                  <SwiperSlide key={index} className={'slide-item'}>
                    <div className={'wrapper-item'}>
                      <div
                        className="carousel-item-img"
                        onClick={() => {
                          this.props.getFilmDetail(item._id);
                          this.props.history.push(`/film/${item._id}`);
                        }}
                      >
                        <img src={item?.PosterImage?.Url} alt="" />
                      </div>
                      <div className="carousel-item-content">
                        <p>{item.FilmName}</p>
                        <p className="time">
                          Thời lượng: <span>{item.RunningTime} phút</span>
                        </p>
                        <ul>
                          <li onClick={() => this.props.handleOverlay(url)}>
                            <BsCollectionPlay />
                            Trailer
                          </li>
                          <li>
                            <Link
                              to={`/film/${item._id}`}
                              onClick={() => this.props.getFilmDetail(item._id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                              }}
                            >
                              <BsInfoCircle style={{ color: 'white' }} />

                              <span style={{ color: '#fff' }}>Chi tiết</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              );
            })}
        </Swiper>
      </div>
    );
  }
}

export default withRouter(CarouselComponent);
