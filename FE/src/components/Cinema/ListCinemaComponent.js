import React, { Component } from 'react';
import '../../styles/scss/ListCinema.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export class ListCinemaComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadMore: false,
    };
  }
  render() {
    let dataCinema = this.props.dataCinemaDetail?.Cinemas
      ? this.props.dataCinemaDetail?.Cinemas
      : [];
    let dataDisplay = [];
    let dataHiden = [];
    if (dataCinema.length > 9) {
      for (let i = 0; i < 9; i++) {
        dataDisplay.push(dataCinema[i]);
      }
      for (let i = 9; i < dataCinema.length; i++) {
        dataHiden.push(dataCinema[i]);
      }
    } else {
      for (let i = 0; i < dataCinema.length; i++) {
        dataDisplay.push(dataCinema[i]);
      }
    }
    return (
      <div className="listCinema">
        <h1 className="content-main">Danh sách các rạp chiếu</h1>
        <div className="detail-color">
          <p className="item-detail">Hà Nội:</p>
          <div className="container">
            <div className="row block-home">
              {dataDisplay.map((item, index) => {
                return (
                  <div className="col-4" key={index}>
                    <p className="detail-item">{item.CinemaName}</p>
                    <p className="address">Địa chỉ: {item.Address}</p>
                  </div>
                );
              })}

              <div
                style={{
                  display:
                    !this.state.isLoadMore && dataHiden ? 'flex' : 'none',
                }}
                className="show-item"
              >
                <span onClick={() => this.setState({ isLoadMore: true })}>
                  Xem Thêm
                </span>
                <ExpandMoreIcon className="icon" />
              </div>
              <div
                style={{ display: this.state.isLoadMore ? 'block' : 'none' }}
              >
                <div className="container">
                  <div className="row show">
                    {dataHiden.map((item, index) => {
                      return (
                        <div className="col-4 " key={index}>
                          <p className="detail-item">{item.CinemaName}</p>
                          <p className="address">Địa chỉ: {item.Address}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span
            className="show-down"
            style={{ display: !this.state.isLoadMore ? 'none' : 'flex' }}
            onClick={() => this.setState({ isLoadMore: false })}
          >
            Thu Gọn
            <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
              />
            </svg>
          </span>
        </div>
      </div>
    );
  }
}

export default ListCinemaComponent;
