import React, { Component } from 'react';
import marked from 'marked';

export default class ReviewFilm extends Component {
  render() {
    const reviewImage = this.props.filmDetail?.ReviewImage;
    let reviewContent;
    if (this.props.filmDetail) {
      reviewContent = {
        __html: marked(this.props.filmDetail?.ReviewContent),
      };
    }
    return (
      <div
        className="film-review"
        style={{
          backgroundImage: `url(${reviewImage && reviewImage.Url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p>review :</p>
        <div
          className={'film-content'}
          dangerouslySetInnerHTML={reviewContent}
        ></div>
        <span className="overlay"></span>
      </div>
    );
  }
}
