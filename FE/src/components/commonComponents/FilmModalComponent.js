import React, { Component } from 'react';
import {
  Button,
  Divider,
  Modal,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { Editor } from '@tinymce/tinymce-react';
import { FiUpload } from 'react-icons/fi';
import default_image from '../../asset/images/default-image.jpg';
import '../../styles/scss/FilmModal.scss';

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
});

const DEFAULT_STATE = {
  _id: '',
  Actors: [],
  Cinemas: [],
  Genres: [],
  Images: [],
  Score: [
    {
      IMDB: '',
      RottenTomato: '',
    },
  ],
  FilmName: '',
  Director: '',
  Writer: '',
  Production: '',
  RunningTime: '',
  ReleaseDate: '',
  ReviewContent: '',
  Rated: '',
  National: '',
  TrailerUrl: '',
  ReviewImage: {},
  PosterImage: {},
  CoverImage: {},
  filmSrc: [default_image],
  actorSrc: [default_image],
  coverSrc: default_image,
  reviewSrc: default_image,
  posterSrc: default_image,
};

class FilmModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      Actors: [],
      Cinemas: [],
      Genres: [],
      Images: [],
      Score: [
        {
          IMDB: '',
          RottenTomato: '',
        },
      ],
      FilmName: '',
      Director: '',
      Writer: '',
      Production: '',
      RunningTime: '',
      ReleaseDate: '',
      ReviewContent: '',
      Rated: '',
      National: '',
      TrailerUrl: '',
      ReviewImage: {},
      PosterImage: {},
      CoverImage: {},
      filmSrc: [default_image],
      actorSrc: [default_image],
      coverSrc: default_image,
      reviewSrc: default_image,
      posterSrc: default_image,
      openActor: false,
      openCinema: false,
      options: [],
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
  }

  handleCloseModal = () => {
    if (this.props.onCancel) this.props.onCancel();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { film } = this.props;
    if (film && film._id !== this.state._id) {
      const filmSrc = [];
      film.Images.map((img) => {
        filmSrc.push(img.Url);
      });
      const actorSrc = [];
      film.Actors.map((actor) => {
        if (actor.Image !== null) {
          actorSrc.push({
            actorName: actor.ActorName,
            actorImg: actor.Image.Url,
          });
        } else {
          actorSrc.push({
            actorName: actor.ActorName,
            actorImg: default_image,
          });
        }
      });
      if (film.ReleaseDate === null) {
        film.ReleaseDate = '';
      }
      this.setState({
        ...film,
        coverSrc: film.CoverImage?.Url,
        reviewSrc: film.ReviewImage?.Url,
        posterSrc: film.PosterImage?.Url,
        filmSrc,
        actorSrc,
      });
    }
    if (!film && this.state._id) {
      this.setState({ ...DEFAULT_STATE });
    }
  }

  onChangeField = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEditorChange = (event) => {
    this.setState({ ...this.state, ReviewContent: event });
  };

  getLocalUrl = (files, stateFile, stateImg) => {
    if (!files[0]) {
      const file = this.state[stateFile];
      // console.log("No file");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({ ...this.state, imgSrc: [reader.result] });
      };
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        this.setState({ ...this.state, [stateImg]: [reader.result] });
      };
      this.setState({ ...this.state, [stateFile]: files[0] });
    }
  };

  handleInputChange = (event) => {
    const { name, files } = event.target;
    switch (name) {
      case 'films':
        Array.from(files).forEach((img) => {
          if (!img) {
            const file = this.state.Images;
            // console.log('No file');
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              this.setState({ ...this.state, filmSrc: [reader.result] });
            };
          } else {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onloadend = () => {
              let newState = { ...this.state };
              newState.filmSrc.push(reader.result);
              this.setState({ newState });
            };
          }
        });
        this.setState({ ...this.state, Images: Array.from(files) });
        break;
      case 'actors':
        Array.from(files).forEach((img) => {
          if (!img) {
            const file = this.state.Images;
            // console.log('No file');
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              this.setState({ ...this.state, filmSrc: [reader.result] });
            };
          } else {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onloadend = () => {
              let newState = { ...this.state };
              newState.filmSrc.push(reader.result);
              this.setState({ newState });
            };
          }
        });
        this.setState({ ...this.state, Images: Array.from(files) });
        break;
      case 'covers':
        this.getLocalUrl(files, 'CoverImage', 'coverSrc');
        this.setState({ ...this.state, CoverImage: files[0] });
        break;
      case 'posters':
        this.getLocalUrl(files, 'PosterImage', 'posterSrc');
        this.setState({ ...this.state, PosterImage: files[0] });
        break;
      case 'reviews':
        this.getLocalUrl(files, 'ReviewImage', 'reviewSrc');
        this.setState({ ...this.state, ReviewImage: files[0] });
        break;
      default:
        break;
    }
  };

  handleSubmit = () => {
    if (this.state._id === '') {
      this.props.addFilm({
        filmData: {
          Actors: this.state.Actors,
          Cinemas: this.state.Cinemas,
          Genres: this.state.Genres,
          Score: this.state.Score,
          FilmName: this.state.FilmName,
          Director: this.state.Director,
          Writer: this.state.Writer,
          Production: this.state.Production,
          RunningTime: this.state.RunningTime,
          ReleaseDate: this.state.ReleaseDate,
          ReviewContent: this.state.ReviewContent,
          Rated: this.state.Rated,
          National: this.state.National,
          TrailerUrl: this.state.TrailerUrl,
        },
        cover: this.state.CoverImage,
        review: this.state.ReviewImage,
        poster: this.state.PosterImage,
        film: this.state.Images,
      });
    } else {
      this.props.updateFilm({
        _id: this.state._id,
        filmData: {
          Actors: this.state.Actors,
          Cinemas: this.state.Cinemas,
          Genres: this.state.Genres,
          Score: this.state.Score,
          FilmName: this.state.FilmName,
          Director: this.state.Director,
          Writer: this.state.Writer,
          Production: this.state.Production,
          RunningTime: this.state.RunningTime,
          ReleaseDate: this.state.ReleaseDate,
          ReviewContent: this.state.ReviewContent,
          Rated: this.state.Rated,
          National: this.state.National,
          TrailerUrl: this.state.TrailerUrl,
        },
        cover: this.state.CoverImage,
        review: this.state.ReviewImage,
        poster: this.state.PosterImage,
        film: this.state.Images,
        path: window.location.pathname,
      });
    }
    this.handleCloseModal();
  };
  onChangeComboBoxHandle = (event) => {
    const { name } = event.target;
    if (this.props.listActor.length === 0 && name === 'Actor') {
      this.props.getActor();
    }
    if (this.props.listCinema.length === 0 && name === 'Cinema') {
      this.props.getCinema();
    }
  };

  render() {
    console.log(this.state);
    //Lọc diễn viên
    const { listActor } = this.props;
    const selectedId = new Set(this.state.Actors.map(({ _id }) => _id));
    const filterActor = listActor.filter(({ _id }) => !selectedId.has(_id));
    //---
    const loadingActor =
      this.state.openActor && this.props.listActor.length === 0;
    const loadingCinema =
      this.state.openCinema && this.props.listCinema.length === 0;
    const { classes } = this.props;
    return (
      <Modal open={this.props.showModal} onClose={this.handleCloseModal}>
        <div className="custom-modal">
          <h6 className="title">Thông tin:</h6>
          <div className="flex-element">
            <p>Tên phim :</p>
            <TextField
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              value={this.state.FilmName}
              name="FilmName"
              fullWidth
              onChange={this.onChangeField}
            />
          </div>
          <div className="flex-element">
            <p>Đạo diễn :</p>
            <TextField
              name="Director"
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              onChange={this.onChangeField}
              value={this.state.Director}
            />
          </div>
          <div className="flex-element">
            <p>Công chiếu :</p>
            <TextField
              name="ReleaseDate"
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              type="date"
              fullWidth
              onChange={this.onChangeField}
              defaultValue={'2021-01-01'}
              value={this.state?.ReleaseDate.toString().split('T')[0]}
            />
          </div>
          <div className="flex-element">
            <p>Trailer :</p>
            <TextField
              name="TrailerUrl"
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              onChange={this.onChangeField}
              value={this.state.TrailerUrl}
            />
          </div>
          <div className="flex-element">
            <p>Nhà sản xuất :</p>
            <TextField
              name="Production"
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              onChange={this.onChangeField}
              value={this.state.Production}
            />
          </div>
          <div className="flex-element">
            <p>Biên kịch :</p>
            <TextField
              name="Writer"
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              onChange={this.onChangeField}
              value={this.state.Writer}
            />
          </div>
          <div className="flex-element">
            <p>Thời lượng :</p>
            <TextField
              name="RunningTime"
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              type="number"
              fullWidth
              onChange={this.onChangeField}
              value={this.state.RunningTime}
            />
          </div>
          <div className="flex-element">
            <p>Quốc gia :</p>
            <TextField
              name="National"
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              onChange={this.onChangeField}
              value={this.state.National}
            />
          </div>
          <div className="flex-element">
            <p>Độ Tuổi :</p>
            <TextField
              name="Rated"
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              onChange={this.onChangeField}
              value={this.state.Rated}
            />
          </div>
          <div className="flex-element">
            <p>Thể loại :</p>
            <Autocomplete
              className="wrap-element"
              multiple
              id="tags-outlined"
              options={[
                'Hành Động',
                'Phiêu Lưu',
                'Hài Hước',
                'Tội Phạm',
                'Chính Kịch',
                'Lịch Sử',
                'Kinh Dị',
                'Hoạt Hình',
              ]}
              getOptionLabel={(option) => option}
              onChange={(e, value) => {
                this.setState({ Genres: value });
              }}
              style={{ width: '100%' }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
              value={this.state.Genres}
            />
          </div>
          <div className="flex-element">
            <p>Rap đang chiếu :</p>
            <Autocomplete
              className="wrap-element"
              multiple
              id="tags-outlined"
              onOpen={() => {
                this.setState({ openCinema: true });
              }}
              onClose={() => {
                this.setState({ openCinema: false });
              }}
              options={this.props.listCinema}
              loading={loadingCinema}
              getOptionLabel={(option) => option.CinemaClusterName}
              onChange={(e, value) => {
                const listId = value.map((cinema) => {
                  return {
                    _id: cinema._id,
                    CinemaClusterName: cinema.CinemaClusterName,
                  };
                });
                this.setState({ ...this.state, Cinemas: listId });
              }}
              style={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  name="Cinema"
                  label={'Nhập tên rạp'}
                  onClick={this.onChangeComboBoxHandle}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loadingCinema ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              value={this.state.Cinemas}
            />
          </div>
          <h6>Đánh giá</h6>
          <div className="flex-element">
            <p>IMDB :</p>
            <TextField
              name={'IMDB'}
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              onChange={(event) => {
                let ScoreChange = this.state.Score;
                ScoreChange[0].IMDB = event.target.value;
                this.setState({ ...this.state, Score: ScoreChange });
              }}
              value={this.state.Score[0].IMDB}
            />
          </div>
          <div className="flex-element">
            <p>Rotten Tomato :</p>
            <TextField
              name={'Rotten Tomato'}
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              onChange={(event) => {
                let ScoreChange = this.state.Score;
                ScoreChange[0].RottenTomato = event.target.value;
                this.setState({ ...this.state, Score: ScoreChange });
              }}
              value={this.state.Score[0].RottenTomato}
            />
          </div>
          <h6>Diễn viên</h6>
          <Autocomplete
            id="tags-outlined"
            open={this.state.open}
            onOpen={() => {
              this.setState({ openActor: true });
            }}
            onClose={() => {
              this.setState({ openActor: false });
            }}
            options={filterActor}
            loading={loadingActor}
            className="wrap-element"
            getOptionLabel={(option) => option.ActorName}
            onChange={(e, value) => {
              const listImg = [];
              value.forEach((actor) => {
                if (actor?.Image !== null) {
                  listImg.push({
                    actorName: actor.ActorName,
                    actorImg: actor.Image.Url,
                  });
                } else {
                  listImg.push({
                    actorName: actor.ActorName,
                    actorImg: default_image,
                  });
                }
              });
              // console.log('list', listImg);
              this.setState({
                ...this.state,
                Actors: value,
                actorSrc: listImg,
              });
            }}
            style={{ width: '100%' }}
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                name="Actor"
                label="Nhập tên diễn viên"
                variant="outlined"
                onClick={this.onChangeComboBoxHandle}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingActor ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            value={this.state.Actors}
          />
          <div className="horizontal-list-container wrap-element">
            {this.state.actorSrc.map((actor, key) => (
              <div key={`actor-${key}`} className="wrap-item relative-parent">
                <img className="square-img" src={actor.actorImg} alt="avatar" />
                <div className="actor-name">{actor.actorName}</div>
                <button
                  className="delete-img-btn"
                  onClick={() => {
                    const newState = { ...this.state };
                    newState.Actors.splice(key, 1);
                    newState.actorSrc.splice(key, 1);
                    this.setState({ newState });
                  }}
                >
                  <CancelRoundedIcon />
                </button>
              </div>
            ))}
            <div className="faked-item">&nbsp;</div>
          </div>
          <Divider />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file-actor"
            multiple
            type="file"
            name={'films'}
            onChange={this.handleInputChange}
          />
          <div className={'wrap-input'}>
            <h6>Ảnh phim : </h6>
            <label
              htmlFor="contained-button-file-actor"
              className="wrap-footer-section wrap-input-label"
            >
              <Button
                className="wrap-element"
                variant="outlined"
                color="primary"
                component="span"
              >
                <FiUpload style={{ margin: 5 }} />
                Tải lên
              </Button>
            </label>
          </div>
          <div className="horizontal-list-container wrap-element">
            {this.state.filmSrc.map((film, key) => {
              return (
                <div key={`actor-${key}`} className="wrap-item relative-parent">
                  <img className="rectangle-img" src={film} alt="avatar" />
                  <button
                    className="delete-img-btn"
                    onClick={() => {
                      const newState = { ...this.state };
                      newState.Images.splice(key, 1);
                      newState.filmSrc.splice(key, 1);
                      this.setState({ newState });
                    }}
                  >
                    <CancelRoundedIcon />
                  </button>
                </div>
              );
            })}
            <div className="faked-item">&nbsp;</div>
          </div>

          <Divider />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file-cover"
            type="file"
            onChange={this.handleInputChange}
            name={'covers'}
          />
          <div className={'wrap-input'}>
            <h6>Ảnh cover</h6>
            <label
              htmlFor="contained-button-file-cover"
              className="wrap-footer-section"
            >
              <Button
                className="wrap-element"
                variant="outlined"
                color="primary"
                component="span"
              >
                <FiUpload style={{ margin: 5 }} />
                Tải lên
              </Button>
            </label>
          </div>
          <div className="relative-parent">
            <img
              className="negate-overflow-img wrap-element"
              src={this.state.coverSrc}
              alt="avatar"
            />
            <button
              className="delete-img-btn"
              onClick={() => {
                this.setState({
                  ...this.state,
                  coverSrc: default_image,
                  CoverImage: {},
                });
              }}
            >
              <CancelRoundedIcon />
            </button>
          </div>
          <Divider />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file-poster"
            type="file"
            onChange={this.handleInputChange}
            name={'posters'}
          />
          <div className={'wrap-input'}>
            <h6>Ảnh Poster</h6>
            <label
              htmlFor="contained-button-file-poster"
              className="wrap-footer-section"
            >
              <Button
                className="wrap-element"
                variant="outlined"
                color="primary"
                component="span"
              >
                <FiUpload style={{ margin: 5 }} />
                Tải lên
              </Button>
            </label>
          </div>
          <div className="relative-parent">
            <img
              className="negate-overflow-img wrap-element"
              src={this.state.posterSrc}
              alt="avatar"
            />
            <button
              className="delete-img-btn"
              onClick={() => {
                this.setState({
                  ...this.state,
                  posterSrc: default_image,
                  PosterImage: {},
                });
              }}
            >
              <CancelRoundedIcon />
            </button>
          </div>
          <Divider />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file-review"
            type="file"
            onChange={this.handleInputChange}
            name={'reviews'}
          />
          <div className={'wrap-input'}>
            <h6>Ảnh review</h6>
            <label
              htmlFor="contained-button-file-review"
              className="wrap-footer-section"
            >
              <Button
                className="wrap-element"
                variant="outlined"
                color="primary"
                component="span"
              >
                <FiUpload style={{ margin: 5 }} />
                Tải lên
              </Button>
            </label>
          </div>

          <div className="relative-parent">
            <img
              className="negate-overflow-img wrap-element"
              src={this.state.reviewSrc}
              alt="avatar"
            />
            <button
              className="delete-img-btn"
              onClick={() => {
                this.setState({
                  ...this.state,
                  reviewSrc: default_image,
                  ReviewImage: {},
                });
              }}
            >
              <CancelRoundedIcon />
            </button>
          </div>
          <Divider />
          <h6>Bài review</h6>
          <Editor
            textareaName={'ReviewContent'}
            value={this.state.ReviewContent}
            apiKey={'685y88qo816uxspgitkx9i6a4nmhs1qabzu0brhu0p6oyw4s'}
            init={{
              selector: 'textarea',
              height: 465,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
                'image',
              ],
              images_upload_handler: function (blobInfo, success, failure) {
                let xhr, formData;
                xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', 'http://localhost:3010/image');
                xhr.onload = function () {
                  let json;
                  if (xhr.status !== 200) {
                    failure('HTTP Error: ' + xhr.status);
                    return;
                  }
                  json = JSON.parse(xhr.responseText);
                  if (!json || typeof json.Url != 'string') {
                    failure('Invalid JSON: ' + xhr.responseText);
                    return;
                  }
                  success(json.Url);
                };
                formData = new FormData();
                formData.append('upload', blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
              },
              toolbar: [
                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify |bullist numlist outdent indent | removeformat|image | help',
              ],
            }}
            onEditorChange={this.handleEditorChange}
            outputFormat={'html'}
          />
          <div className="wrap-footer-section">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Lưu
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleCloseModal}
            >
              Hủy
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
export default withStyles(styles)(FilmModalComponent);
