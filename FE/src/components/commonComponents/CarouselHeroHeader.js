import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Autoplay} from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import '../../styles/scss/common.scss';

export default class CarouselHeroHeader extends React.Component {
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
    SwiperCore.use([Autoplay, Navigation]);
    const carouselImage = this.props.caroselImages;
    return (
      <div className="hero">
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          navigation={true}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
        >
          {carouselImage &&
            this.props.caroselImages.map((item, key) => (
              <div key={key} className="hero-item-first">
                <SwiperSlide key={key} className="slide-img">
                  <img src={item?.Url} alt={item?.ImageName} />
                  <div className="overlay"></div>
                </SwiperSlide>
              </div>
            ))}
        </Swiper>
      </div>
    );
  }
}
