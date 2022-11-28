import React, {Component} from 'react';
import {Modal, TextField, Button} from '@material-ui/core';
import default_image from '../../asset/images/default-image.jpg';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import '../../styles/css/AdPopupFilm.css';

class AddActorModal extends Component {
  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.state = {
      _id: '',
      ActorName: '',
      Age: '',
      Image: '',
      imageSrc: default_image,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {actor} = this.props;
    if (actor && actor._id !== this.state._id) {
      this.setState({
        ...actor,
        imageSrc: actor?.Image?.Url,
      });
    }
    if (!actor && this.state._id) {
      this.setState({
        _id: '',
        ActorName: '',
        Age: '',
        Image: '',
      });
    }
  }

  handleCloseModal = () => {
    if (this.props.onCancel) this.props.onCancel();
  };
  onChangeField = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  getLocalUrl = (files, stateFile, stateImg) => {
    if (!files[0]) {
      const file = this.state[stateFile];
      // console.log("No file");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({...this.state, imgSrc: [reader.result]});
      };
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        this.setState({...this.state, [stateImg]: [reader.result]});
        // console.log('image', reader.result)
      };
      this.setState({...this.state, [stateFile]: files[0]});
    }
  };

  handleInputChange = (event) => {
    const {name, files} = event.target;
    switch (name) {
      case 'actor':
        this.getLocalUrl(files, 'Image', 'imageSrc');
        break;

      default:
        break;
    }
  };

  handleSubmit = () => {
    if (this.state._id === '') {
      this.props.addActor({
        actorData: {
          ActorName: this.state.ActorName,
          Age: this.state.Age,
        },
        actorImg: this.state.Image,
      });
    } else {
      this.props.updateActor({
        _id: this.state._id,
        actorData: {
          ActorName: this.state.ActorName,
          Age: this.state.Age,
        },
        actorImg: this.state.Image,
      });
    }
    this.handleCloseModal();
  };

  render() {
    return (
      <Modal open={this.props.showModal} onClose={this.handleCloseModal}>
        <div className="custom-modal">
          <div className="flex-element">
            <p>Tên diễn viên :</p>
            <TextField
              name="ActorName"
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              fullWidth
              onChange={this.onChangeField}
              value={this.state.ActorName}
            />
          </div>
          <div className="flex-element">
            <p>Tuổi :</p>
            <TextField
              name="Age"
              className="wrap-element"
              variant="outlined"
              id="outlined-basic"
              type="number"
              fullWidth
              onChange={this.onChangeField}
              value={this.state.Age}
            />
          </div>
          <div className="flex-element-ver2">
            <p>Ảnh diễn viên :</p>
            <div className={'relative-parent'}>
              <img
                className="negate-overflow-img wrap-element"
                src={this.state.imageSrc}
                alt={'anh dien vien'}
              />
              <button
                className="delete-img-btn"
                onClick={() => {
                  this.setState({
                    ...this.state,
                    imageSrc: default_image,
                    Image: {},
                  });
                }}
              >
                <CancelRoundedIcon className="icon-delete" />
              </button>
            </div>
            <input
              accept="image/*"
              style={{visibility: 'hidden'}}
              id="contained-button-file-actor"
              type="file"
              onChange={this.handleInputChange}
              name={'actor'}
            />
            <label
              htmlFor="contained-button-file-actor"
              className="wrap-footer-section"
            >
              <Button
                className="wrap-element"
                variant="contained"
                component="span"
              >
                Tải lên
              </Button>
            </label>
          </div>
          <div className="wrap-footer-section">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Lưu
            </Button>
            <Button variant="contained" onClick={this.handleCloseModal}>
              Hủy
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddActorModal;
