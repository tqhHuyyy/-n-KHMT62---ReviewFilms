import React, { Component } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import 'swiper/swiper.scss';
import '../styles/css/AboutUs.css'
import '../styles/css/CarouselStyles.css'
import logo from '../asset/images/rap.jpg'
import logo1 from '../asset/images/rap2.jpg'
import logo2 from '../asset/images/logo2.png'

export class AboutUsComponent extends Component {

    render() {

        SwiperCore.use([Navigation]);
        return (
            <div className='wrapper'>
                <div className="hero">
                    <Swiper
                        // navigation={true}
                        spaceBetween={0}
                        slidesPerView={1}

                    >
                        <SwiperSlide className="slide-img" >
                            <img src= {logo2}/>
                        </SwiperSlide>
                        {/* <SwiperSlide className="slide-img">
                            <img src='https://ecoparker.s3.ap-southeast-1.amazonaws.com/s3fs-public/choi/cgv-ecopark-hung-yen-01.jpg' alt="" /></SwiperSlide>
                        <SwiperSlide className="slide-img">
                            <img src='https://ecoparker.s3.ap-southeast-1.amazonaws.com/s3fs-public/choi/cgv-ecopark-hung-yen-01.jpg' alt="" /></SwiperSlide>
                        <SwiperSlide className="slide-img">
                            <img src='https://kenhhomestay.com/wp-content/uploads/2019/12/rap-chieu-phim-cgv-go-vap-2.jpg' alt="" />
                        </SwiperSlide> */}
                    </Swiper>
                </div>

                <div className='story'>
                    <div><h2>Câu chuyện</h2></div>
                    <div className='story-item'>
                        <div className="story-image" >
                            <img src= {logo1}/>
                        </div>
                        <div className="story-text" >
                            <p>
                                Hiện nay, có rất nhiều những cụm rạp chiếu phim được xây dựng từ những thương hiệu khác nhau với mức giá cũng như dịch vụ khác nhau.
                                Với nhu cầu xem phim ngày tăng, việc lựa chọn rạp chiếu phù hợp với túi tiền cũng như thuật lợi cho việc đi lại hay nắm bắt được thông tin,
                                dịch vụ của rạp chiếu phim là vấn đề vô cùng quan trọng đối với khan giả xem phim.
                            <br />
                                Vì vậy, trang web MMovies giúp giải quyết những vấn đề được đặt ra. Đồng thời, trang web sẽ giới thiệu về những bộ phim được chiếu,
                                cũng như sắp chiếu của mỗi rạp để khan giả có thể cập nhật và lựa chọn theo nhu cầu.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='story contact'>
                    <div  ><h2>Liên hệ</h2></div>
                    <div className='story-item reverse'>
                        <div className="story-image" >
                            <img src= {logo}/>
                        </div>
                        <div className="story-text" >
                            <p>
                                Địa chỉ : 207 Giải Phóng<br />
                                Số điện thoại liên hệ : 0329758682 <br/>
                                Liên Hệ: tranhuy21122002@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUsComponent