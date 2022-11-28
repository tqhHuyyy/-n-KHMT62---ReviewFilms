import React, { Component } from 'react';
import {
  Modal,
  TextField,
  Divider,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import '../../styles/scss/AdPopupFilm.scss';
import default_image from '../../asset/images/default-image.jpg';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { Editor } from '@tinymce/tinymce-react';
import { FiUpload } from 'react-icons/fi';
import AdPopupCinemaAgencyComponent from './AdPopupCinemaAgencyComponent';

export default class AdPopupCinemaComponent extends Component {
  state = {
    _id: '',
    CinemaClusterName: '',
    Cinemas: [],
    Content: '',
    Hotline: '',
    Email: '',
    Website: '',
    Address: '',
    CinemaImage: {},
    FareImage: {},
    cinemaSrc: default_image,
    fareSrc: default_image,
    openCinema: false,
    showModal: false,
  };

  containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }

    return false;
  };

  componentDidUpdate() {
    const { cinema } = this.props;
    if (cinema && cinema._id !== this.state._id) {
      this.setState({
        ...cinema,
        cinemaSrc:
          cinema?.CinemaImage?._id === undefined
            ? default_image
            : cinema?.CinemaImage.Url,
        fareSrc:
          cinema?.FareImage?._id === undefined
            ? default_image
            : cinema?.FareImage.Url,
      });
    }

    if (!cinema && this.state._id) {
      this.setState({
        _id: '',
        CinemaClusterName: '',
        Cinemas: [],
        Content: '',
        Hotline: '',
        Email: '',
        Website: '',
        Address: '',
        CinemaImage: {},
        FareImage: {},
        cinemaSrc: default_image,
        fareSrc: default_image,
        openCinema: false,
        showModal: false,
      });
    }
    if (this.props.tempCinema !== '') {
      const newListCinemas = this.state.Cinemas;
      if (!this.containsObject(this.props.tempCinema, this.state.Cinemas)) {
        newListCinemas.push(this.props.tempCinema);
        this.setState({ Cinemas: newListCinemas });
      }
      this.props.clearTempCinema();
    }
  }

  handleCloseModal = () => {
    if (this.props.onCancel) this.props.onCancel();
  };

  getLocalUrl = (files, stateFile, stateImg) => {
    if (!files[0]) {
      const file = this.state[stateFile];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({ ...this.state, stateImg: [reader.result] });
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
      case 'cinema':
        this.getLocalUrl(files, 'CinemaImage', 'cinemaSrc');
        break;
      case 'fare':
        this.getLocalUrl(files, 'FareImage', 'fareSrc');
        break;
      default:
        break;
    }
  };

  onChangeField = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEditorChange = (event) => {
    this.setState({ ...this.state, Content: event });
  };

  onChangeComboBoxHandle = (event) => {
    const { name } = event.target;
    if (this.props.listSmallCinema.length === 0 && name === 'Cinemas') {
      this.props.getCinema();
    }
  };

  handleSubmit = () => {
    if (this.state._id === '') {
      this.props.addCinemaCluster({
        cinemaClusterData: {
          CinemaClusterName: this.state.CinemaClusterName,
          Address: this.state.Address,
          Hotline: this.state.Hotline,
          Website: this.state.Website,
          Email: this.state.Email,
          Content: this.state.Content,
          Cinemas: this.state.Cinemas,
        },
        cinemaImg: this.state.CinemaImage,
        fareImg: this.state.FareImage,
      });
      this.handleCloseModal();
    } else {
      this.props.updateCinemaCluster({
        _id: this.state._id,
        cinemaClusterData: {
          CinemaClusterName: this.state.CinemaClusterName,
          Address: this.state.Address,
          Hotline: this.state.Hotline,
          Website: this.state.Website,
          Email: this.state.Email,
          Cinemas: this.state.Cinemas,
          Content: this.state.Content,
        },
        cinemaImg: this.state.CinemaImage,
        fareImg: this.state.FareImage,
      });
      this.handleCloseModal();
    }
  };

  onShowModalAgency = () => {
    this.setState({ showModal: true });
  };

  onCancel = () => {
    this.setState({ showModal: false });
  };

  render() {
    const loadingCinemas =
      this.state.openCinema && this.props.listSmallCinema.length === 0;
    var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return (
      <>
        <Modal open={this.props.showModal} onClose={this.handleCloseModal}>
          <div className={'custom-modal'}>
            <div className="flex-element">
              <p>Tên rạp :</p>
              <TextField
                className="wrap-element"
                variant="outlined"
                id="outlined-basic"
                name="CinemaClusterName"
                fullWidth
                onChange={this.onChangeField}
                value={this.state.CinemaClusterName}
              />
            </div>
            <div className="flex-element">
              <p>Hotline :</p>
              <TextField
                className="wrap-element"
                variant="outlined"
                id="outlined-basic"
                type="Number"
                fullWidth
                name="Hotline"
                onChange={this.onChangeField}
                value={this.state.Hotline}
              />
            </div>
            <div className="flex-element">
              <p>Email :</p>
              <TextField
                className="wrap-element"
                variant="outlined"
                id="outlined-basic"
                name="Email"
                fullWidth
                type="Email"
                onChange={this.onChangeField}
                value={this.state.Email}
              />
            </div>
            <div className="flex-element">
              <p>Website :</p>
              <TextField
                className="wrap-element"
                variant="outlined"
                id="outlined-basic"
                name="Website"
                fullWidth
                onChange={this.onChangeField}
                value={this.state.Website}
              />
            </div>
            <div className="flex-element">
              <p>Trụ sở chính :</p>
              <TextField
                className="wrap-element"
                variant="outlined"
                id="outlined-basic"
                name="Address"
                fullWidth
                onChange={this.onChangeField}
                value={this.state.Address}
              />
            </div>
            <Divider />
            <input
              accept="image/*"
              style={{ visibility: 'hidden' }}
              id="contained-button-file-cinema"
              type="file"
              onChange={this.handleInputChange}
              name={'cinema'}
            />
            <div className={'wrap-input'}>
              <h5>Ảnh rạp :</h5>
              <label
                htmlFor="contained-button-file-cinema"
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
                src={this.state.cinemaSrc}
                alt="avatar"
              />
              <button
                className="delete-img-btn"
                onClick={() => {
                  this.setState({
                    ...this.state,
                    cinemaSrc: default_image,
                    CinemaImage: {},
                  });
                }}
              >
                <CancelRoundedIcon />
              </button>
            </div>
            <Divider />
            <input
              accept="image/*"
              style={{ visibility: 'hidden' }}
              id="contained-button-file-fare"
              type="file"
              onChange={this.handleInputChange}
              name={'fare'}
            />
            <div className={'wrap-input'}>
              <h5>Ảnh giá :</h5>
              <label
                htmlFor="contained-button-file-fare"
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
                src={this.state.fareSrc}
                alt="avatar"
              />
              <button
                className="delete-img-btn"
                onClick={() => {
                  this.setState({
                    ...this.state,
                    fareSrc: default_image,
                    FareImage: {},
                  });
                }}
              >
                <CancelRoundedIcon />
              </button>
            </div>
            <h6>Cơ sở rạp</h6>
            <div className={'wrap-cinema'}>
              <Autocomplete
                id="tags-outlined"
                open={this.state.open}
                onOpen={() => {
                  this.setState({ openCinema: true });
                }}
                onClose={() => {
                  this.setState({ openCinema: false });
                }}
                options={this.props.listSmallCinema}
                loading={loadingCinemas}
                className="wrap-element"
                getOptionLabel={(option) => option.CinemaName}
                onChange={(e, value) => {
                  this.setState({ ...this.state, Cinemas: value });
                }}
                style={{ width: '70%' }}
                multiple
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="Cinemas"
                    label="Nhập rạp chi nhánh"
                    variant="outlined"
                    onClick={this.onChangeComboBoxHandle}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingCinemas ? (
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
              <Button
                className="wrap-element"
                variant="outlined"
                color="primary"
                component="span"
                onClick={this.onShowModalAgency}
              >
                Thêm cơ sở rạp
              </Button>
            </div>
            <h6>Thông tin chi tiết</h6>
            <Editor
              value={this.state.Content}
              apiKey={'685y88qo816uxspgitkx9i6a4nmhs1qabzu0brhu0p6oyw4s'}
              init={{
                selector: 'textarea#full-featured-non-premium',
                plugins:
                  'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                imagetools_cors_hosts: ['picsum.photos'],
                menubar: 'file edit view insert format tools table help',
                toolbar:
                  'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                toolbar_sticky: true,
                autosave_ask_before_unload: true,
                autosave_interval: '30s',
                autosave_prefix: '{path}{query}-{id}-',
                autosave_restore_when_empty: false,
                autosave_retention: '2m',
                image_advtab: true,
                link_list: [
                  { title: 'My page 1', value: 'https://www.tiny.cloud' },
                  { title: 'My page 2', value: 'http://www.moxiecode.com' },
                ],
                image_list: [
                  { title: 'My page 1', value: 'https://www.tiny.cloud' },
                  { title: 'My page 2', value: 'http://www.moxiecode.com' },
                ],
                image_class_list: [
                  { title: 'None', value: '' },
                  { title: 'Some class', value: 'class-name' },
                ],
                importcss_append: true,
                file_picker_callback: function (callback, value, meta) {
                  /* Provide file and text for the link dialog */
                  if (meta.filetype === 'file') {
                    callback('https://www.google.com/logos/google.jpg', {
                      text: 'My text',
                    });
                  }

                  /* Provide image and alt text for the image dialog */
                  if (meta.filetype === 'image') {
                    callback('https://www.google.com/logos/google.jpg', {
                      alt: 'My alt text',
                    });
                  }

                  /* Provide alternative source and posted for the media dialog */
                  if (meta.filetype === 'media') {
                    callback('movie.mp4', {
                      source2: 'alt.ogg',
                      poster: 'https://www.google.com/logos/google.jpg',
                    });
                  }
                },
                templates: [
                  {
                    title: 'New Table',
                    description: 'creates a new table',
                    content:
                      '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                  },
                  {
                    title: 'Starting my story',
                    description: 'A cure for writers block',
                    content: 'Once upon a time...',
                  },
                  {
                    title: 'New list with dates',
                    description: 'New List with dates',
                    content:
                      '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                  },
                ],
                template_cdate_format:
                  '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                template_mdate_format:
                  '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                height: 600,
                image_caption: true,
                quickbars_selection_toolbar:
                  'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                noneditable_noneditable_class: 'mceNonEditable',
                toolbar_mode: 'sliding',
                contextmenu: 'link image imagetools table',
                skin: useDarkMode ? 'oxide-dark' : 'oxide',
                content_css: useDarkMode ? 'dark' : 'default',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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
                  formData.append(
                    'upload',
                    blobInfo.blob(),
                    blobInfo.filename(),
                  );
                  xhr.send(formData);
                },
              }}
              onEditorChange={this.handleEditorChange}
              outputFormat={'html'}
            />
            <div className="wrap-footer-section">
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleSubmit()}
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
        <AdPopupCinemaAgencyComponent
          showModal={this.state.showModal}
          onCancel={this.onCancel}
          addCinema={(data) => {
            this.props.addCinema(data);
          }}
        />
      </>
    );
  }
}
