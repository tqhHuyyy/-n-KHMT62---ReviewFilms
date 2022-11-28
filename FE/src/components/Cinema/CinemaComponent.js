import React, { Component } from 'react';
import '../../styles/scss/Information.scss';
export class CinemaComponent extends Component {
  render() {
    if (this.props.dataCinemaDetail) {
      var dom = document.createElement('div');
      dom.innerHTML = this.props.dataCinemaDetail?.Content;
    }
    return (
      <div className="information">
        <h1 className="content-item">Thông tin về rạp</h1>
        <div className={'container'}>
          <div
            className={'review-content'}
            dangerouslySetInnerHTML={{ __html: dom?.innerHTML }}
          ></div>
        </div>
      </div>
    );
  }
}

export default CinemaComponent;
