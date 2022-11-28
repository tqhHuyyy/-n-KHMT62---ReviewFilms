import React, {useState} from 'react';
import {
  Modal,
  TextField,
  Divider,
  Button,
  CircularProgress,
} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import default_image from '../../asset/images/default-image.jpg';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import '../../styles/css/AdPopupAddFilmByGenre.css';

function AdPopupAddFilmByGenre(props) {
  const {showModal, onCancel} = props;
  const [openFilm, setOpenFilm] = useState(false);
  const [films, setFilms] = useState([]);
  const [filmSrc, setFilmSrc] = useState([default_image]);
  const title =
    window.location.pathname === '/dashboard/hot'
      ? 'Thêm phim hot'
      : 'Thêm phim mới';
  const loadingFilm = props.films.length === 0 && openFilm;

  const handleSubmit = () => {
    const path = window.location.pathname;
    if (path === '/dashboard/hot') {
      props.updateHotFilm(films);
    }
    if (path === '/dashboard/new') {
      props.updateNewFilm(films);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    if (onCancel) onCancel();
  };

  const onChangeComboBoxHandle = () => {
    const path = window.location.pathname;
    if (path === '/dashboard/hot' && props.listNotHot.length === 0) {
      props.getNotHotFilm();
    }
    if (path === '/dashboard/new' && props.listNotNew.length === 0) {
      props.getNotNewFilm();
    }
  };

  const onChangeAutocomplete = (event, value) => {
    const listImg = [];
    value.forEach((film) => {
      if (film?.CoverImage !== null) {
        listImg.push({
          FilmName: film.FilmName,
          CoverImage: film.CoverImage.Url,
        });
      } else {
        listImg.push({
          FilmName: film.FilmName,
          CoverImage: default_image,
        });
      }
    });
    setFilms(value);
    setFilmSrc(listImg);
  };

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <div className={'hot-film-modal'}>
        <h4>{title}</h4>
        <Divider />
        <Autocomplete
          id="tags-outlined"
          onOpen={() => {
            setOpenFilm(true);
          }}
          onClose={() => {
            setOpenFilm(false);
          }}
          options={
            window.location.pathname === '/dashboard/hot'
              ? props.listNotHot
              : props.listNotNew
          }
          loading={loadingFilm}
          className="wrap-element"
          getOptionLabel={(option) => option.FilmName}
          onChange={onChangeAutocomplete}
          style={{width: '100%'}}
          multiple
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              name="Films"
              label="Nhập tên phim"
              variant="outlined"
              onClick={onChangeComboBoxHandle}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loadingFilm ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
          value={films}
        />
        <div className="horizontal-list-container wrap-element">
          {filmSrc.map((film, key) => {
            return (
              <div
                key={`film-${key}`}
                className="wrap-item-film relative-parent"
              >
                <img
                  className="film-img"
                  src={film.CoverImage ? film.CoverImage : film}
                  alt="avatar"
                />
                <div className="film-name">{film.FilmName}</div>
                <button
                  className="delete-img-btn"
                  onClick={() => {
                    let listFilm = [...films],
                      listSrc = [...filmSrc];
                    listFilm.splice(key, 1);
                    listSrc.splice(key, 1);
                    setFilms(listFilm);
                    setFilmSrc(listSrc);
                  }}
                >
                  <CancelRoundedIcon />
                </button>
              </div>
            );
          })}
          <div className="faked-item">&nbsp;</div>
        </div>
        <div className="wrap-footer-section">
          <Button variant="contained" onClick={handleSubmit}>
            Lưu
          </Button>
          <Button variant="contained" onClick={handleCloseModal}>
            Hủy
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AdPopupAddFilmByGenre;
