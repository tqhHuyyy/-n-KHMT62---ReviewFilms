import React, {useState} from 'react';
import {Modal, TextField, Divider, Button} from '@material-ui/core';
import '../../styles/css/AdCinemaAgency.css';

function AdPopupCinemaAgencyComponent(props) {
  const openModal = props.showModal;
  const closeModal = props.onCancel;
  const [CinemaName, setCinemaName] = useState('');
  const [Address, setAddress] = useState('');
  const onChangeField = (event) => {
    const {name, value} = event.target;
    if (name === 'CinemaName') {
      setCinemaName(value);
    }
    if (name === 'Address') {
      setAddress(value);
    }
  };
  const handleSubmit = () => {
    props.addCinema({
      CinemaName,
      Address,
    });
    handleCloseModal();
  };

  const handleCloseModal = () => {
    if (closeModal) closeModal();
  };
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <div className={'agency-modal'}>
        <h4>Thêm chi nhánh rạp</h4>
        <Divider />
        <div className="flex-element">
          <p>Tên rạp :</p>
          <TextField
            className="wrap-element"
            variant="outlined"
            id="outlined-basic"
            name="CinemaName"
            fullWidth
            onChange={onChangeField}
            value={CinemaName}
          />
        </div>
        <div className="flex-element">
          <p>Địa chỉ :</p>
          <TextField
            className="wrap-element"
            variant="outlined"
            id="outlined-basic"
            fullWidth
            name="Address"
            onChange={onChangeField}
            value={Address}
          />
        </div>
        <div className="wrap-footer-section">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Lưu
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseModal}
          >
            Hủy
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AdPopupCinemaAgencyComponent;
