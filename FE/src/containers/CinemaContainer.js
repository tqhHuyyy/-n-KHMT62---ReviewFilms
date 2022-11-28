/**
 * Đây là body của trang rạp bao gồm các component
 * Ảnh giá vé, thông tin rạp, danh sách rạp
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import CinemaComponent from '../components/Cinema/CinemaComponent'
import FareComponent from '../components/Cinema/FareComponent'
import ListCinemaComponent from '../components/Cinema/ListCinemaComponent'
import * as actions from '../actions/Actions'
import '../styles/scss/ListCinema.scss'

export class CinemaContainer extends Component {
  componentDidMount() {
    this.props.getDetailCinema()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  render() {
    const imageCinema = this.props.dataCinemaDetail?.CinemaImage?.Url
    const styles = { height: '100vh', overflow: 'hidden' }
    return (
      <div>
        <div style={styles}>
          <img className="img-home" src={imageCinema} alt="" />
        </div>
        <div>
          <FareComponent dataCinemaDetail={this.props.dataCinemaDetail} />
        </div>
        <div>
          <CinemaComponent dataCinemaDetail={this.props.dataCinemaDetail} />
        </div>
        <div>
          <ListCinemaComponent {...this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataCinema: state.listCinemaReducer.dataCinemaDetail,
    dataCinemaDetail: state.cinemaClusterReducer.dataCinemaDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailCinema: () => {
      dispatch(actions.getDetailCinemaRequest())
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CinemaContainer);
