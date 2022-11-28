import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../styles/css/ListFilm.css';

export default class InTheaterComponent extends Component {
  render() {
    const filmData = this.props.filmDetail ? this.props.filmDetail.Cinemas : [];
    return (
      <div className="in-theater">
        <h2>Rạp Chiếu</h2>
        <div className="theater">
          {filmData &&
            filmData.map((item, key) => (
              <div key={key}> {item.CinemaClusterName}</div>
            ))}
        </div>
      </div>
    );
  }
}
