import React, {Component} from 'react';
import defaultImage from '../../asset/images/default-image.jpg';
export default class ActorComponent extends Component {
  render() {
    const fillData = this.props.filmDetail ? this.props.filmDetail.Actors : [];
    let showData =
      fillData &&
      fillData.map((item, key) => {
        const actorAvatar = item.Image?.Url ? item.Image.Url : defaultImage;
        return (
          <div className="actor" key={key}>
            <div className="actor-detail">
              <p>Tên diễn viên: {item.ActorName}</p>
              <p>Tuổi: {item.Age}</p>
            </div>
            <div className="actor-img">
              <div
                style={{
                  backgroundImage: `url(${actorAvatar})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
          </div>
        );
      });
    return (
      <div className="film-actor" id="style-scroll-bar">
        {showData}
      </div>
    );
  }
}
