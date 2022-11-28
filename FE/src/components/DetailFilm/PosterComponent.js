import React, {Component} from 'react';

export default class PosterComponent extends Component {
  componentDidUpdate() {
    const {filmDetail} = this.props;
    if (filmDetail && filmDetail._id !== this.state._id) {
      this.setState({...filmDetail});
    }
  }

  state = {
    _id: '',
    FilmName: '',
    ReleaseDate: '',
    PosterImage: '',
    Score: '',
    Director: '',
    Writer: '',
    Production: '',
    National: '',
    RunningTime: '',
    Rated: '',
    Genres: '',
  };
  render() {
    let firstSting =
      this.state.FilmName &&
      this.state.FilmName.substr(0, this.state.FilmName.indexOf(' '));
    let lastString =
      this.state.FilmName &&
      this.state.FilmName.substr(this.state.FilmName.indexOf(' ') + 1);
    let dateTime = this.state.ReleaseDate && this.state.ReleaseDate.split('T');
    let date = dateTime && dateTime[0].split('-');
    return (
      <div className="poster">
        <div className="poster-left">
          <div className="poster-img">
            <img src={this.state.PosterImage?.Url} alt="poster" width="100%" />
          </div>
          <div className="poster-detail" id="style-scroll-bar">
            <p>Đạo diễn: {this.state.Director}</p>
            <p>Biên kịch: {this.state.Writer}</p>
            <p>Nhà sản xuất: {this.state.Production}</p>
            <p>Quốc gia: {this.state.National}</p>
            <p>Ngày ra rạp: {dateTime && dateTime[0]}</p>
            <p>Thời lượng: {this.state.RunningTime} phút</p>
            <p>Độ tuổi: {this.state.Rated}</p>
            <p>
              Thể loại:{' '}
              {this.state.Genres &&
                this.state.Genres.map((genres, keyGenres) => (
                  <span key={keyGenres} style={{display: 'inline-block'}}>
                    {`${String.fromCharCode(160)}${genres}`},
                  </span>
                ))}
            </p>
            {this.state.Score && (
              <span>
                <span style={{display: 'block'}}>
                  -IMDB: {this.state.Score[0].IMDB}
                </span>
                <span style={{display: 'block'}}>
                  -RottenTomato: {this.state.Score[0].RottenTomato}
                </span>
              </span>
            )}
          </div>
        </div>
        <div className="poster-right">
          <div className="poster-name">
            <h2>
              <p>{firstSting}</p>
              <p>{lastString}</p>
            </h2>
            <div className="film-release">
              <div>
                <div style={{color: 'white', fontSize: '35px', opacity: '0.8'}}>{dateTime && date[2]} - {dateTime && date[1]} - {dateTime && date[0]}</div>
                {/* <div className="film-release-date">Ngày {dateTime && date[2]}</div> */}
              </div>
              {/* <div>
                <div className="film-release-time">{dateTime && date[1]}</div>
                <div className="film-release-date">Tháng</div>
              </div>
              <div>
                <div className="film-release-time">{dateTime && date[0]}</div>
                <div className="film-release-date">Năm</div>
              </div> */}
            </div>
          </div>
          <div className="poster-trailer">
            <h2>Trailer</h2>
            <div>
              <iframe
                width="100%"
                height="100%"
                src={this.props.filmDetail?.TrailerUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
