import React, { Component } from 'react';
import '../../styles/scss/AdPopupCinema.scss';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import { Modal, Button } from '@material-ui/core';

export default class DashboardHeader extends Component {
  handleSearch() {
    const { genre } = this.props;
    if (genre) {
      this.state.textSearch === ''
        ? this.props.onGet({
            pageIndex: 1,
            genre: this.props.genre,
          })
        : this.props.onSearch({
            pageIndex: 1,
            textSearch: this.state.textSearch,
            genre: this.props.genre,
          });
    } else {
      this.state.textSearch === ''
        ? this.props.onGet({
            pageIndex: 1,
          })
        : this.props.onSearch({
            pageIndex: 1,
            textSearch: this.state.textSearch,
          });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      isDelete: false,
      showModal: false,
    };
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  onClickAdd = () => {
    this.props.onAddClicked();
  };

  onInputChanged = (e) => {
    this.props.onSearch(e.target.value);
  };

  handleCloseModal = () => {
    if (this.props.onCancel) this.props.onCancel();
    this.setState({ showModal: false });
  };

  onDeleteClick = () => {
    this.setState(
      (prevState) => ({
        isDelete: !prevState.isDelete,
      }),
      () => {
        if (this.props.onToggleDelete) {
          this.props.onToggleDelete(this.state.isDelete);
        }
        if (!this.state.isDelete && this.props.onDelete) {
          this.setState({ showModal: true });
        }
      },
    );
  };

  confirmDelete = () => {
    if (this.props.onDelete) {
      this.props.onDelete();
    }
    this.handleCloseModal();
  };

  render() {
    const path = window.location.pathname;
    const { showSearch, showAddButton, showDeleteButton } = this.props;
    return (
      <div className="search-detail">
        {showSearch && (
          <div className="icon-item">
            <input
              className="txt-search"
              type="text"
              placeholder="Nhập tên phim... "
              onChange={(e) => this.setState({ textSearch: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') this.handleSearch();
              }}
            />
            <SearchIcon
              className="icon"
              path={'./dashboard/search'}
              onClick={() => {
                this.handleSearch();
              }}
            />
          </div>
        )}
        {showAddButton && (
          <button className="btn-add" onClick={this.onClickAdd}>
            <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              />
            </svg>
          </button>
        )}
        {showDeleteButton && (
          <>
            <button className="btn-delete" onClick={this.onDeleteClick}>
              {this.state.isDelete ? <DeleteIcon /> : 'Chọn xóa'}
            </button>
            <Modal
              open={this.state.showModal}
              onClose={this.handleCloseModal}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-title"
            >
              <div className="custom-modal">
                <h2 id="simple-modal-title">
                  Bạn có muốn xóa những mục đã chọn
                </h2>
                <div className="wrap-action-buttons">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.confirmDelete}
                  >
                    OK
                  </Button>
                  <Button variant="contained" onClick={this.handleCloseModal}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
    );
  }
}
