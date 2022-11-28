import React, {Component} from 'react';
import DashboardHeader from '../components/commonComponents/DashboardHeader';
import DashboardListItems from '../components/commonComponents/DashboardListItems';
import DashboardPagination from '../components/commonComponents/DashboardPagination';
import FilmModalComponent from '../components/commonComponents/FilmModalComponent';
import * as actions from '../actions/Actions';
import AdPopupAddFilmByGenre from '../components/Dashboard/AdPopupAddFilmByGenre';
import {connect} from 'react-redux';

const DEFAULT_CHECKED_LIST = [];

class HotFilmContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDelete: false,
      checkedFilmIds: DEFAULT_CHECKED_LIST,
      selectedFilm: null,
      showFilmModal: false,
      showModal: false,
    };
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
    this.onToggleDelete = this.onToggleDelete.bind(this);
    this.clearCheckedList = this.clearCheckedList.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onFilmClicked = this.onFilmClicked.bind(this);
    this.onCloseFilmModal = this.onCloseFilmModal.bind(this);
    this.onShowFilmModal = this.onShowFilmModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
  }

  componentDidMount() {
    this.props.getGenreAdmin({
      pageIndex: 1,
      genre: 'hot',
    });
  }

  onCheckboxChanged(isChecked, id) {
    this.setState((prevState) => ({
      checkedFilmIds: isChecked
        ? [...prevState.checkedFilmIds, id]
        : prevState.checkedFilmIds.filter((currId) => currId !== id),
    }));
  }

  onToggleDelete(status) {
    this.setState({isDelete: status});
  }

  clearCheckedList() {
    this.setState({checkedFilmIds: DEFAULT_CHECKED_LIST});
  }

  onDelete() {
    this.props.deleteHotFilm(this.state.checkedFilmIds);
    this.clearCheckedList();
  }

  onFilmClicked(film) {
    this.setState({selectedFilm: film, showFilmModal: true});
  }

  onCloseFilmModal() {
    this.setState({showFilmModal: false, selectedFilm: null});
  }

  onShowFilmModal() {
    this.setState({showFilmModal: true});
  }

  onCloseModal() {
    this.setState({showModal: false});
  }

  onShowModal() {
    this.setState({showModal: true});
  }

  render() {
    return (
      <>
        <DashboardHeader
          showSearch
          showAddButton
          showDeleteButton
          onSearch={(data) => this.props.searchFilmAdmin(data)}
          onGet={(data) => this.props.getGenreAdmin(data)}
          onAddClicked={this.onShowModal}
          onToggleDelete={this.onToggleDelete}
          onDelete={this.onDelete}
          onCancel={this.clearCheckedList}
          genre="hot"
        />
        <DashboardListItems
          loading={this.state.isFetching}
          isDelete={this.state.isDelete}
          films={this.props.films}
          onSelected={this.onCheckboxChanged}
          onFilmClicked={this.onFilmClicked}
        />
        <DashboardPagination
          pageIndex={this.props.pageIndex}
          totalPage={this.props.totalPage}
          getHotFilm={(data) =>
            this.props.textSearch === ''
              ? this.props.getGenreAdmin(data)
              : this.props.searchFilmAdmin(data)
          }
          textSearch={this.props.textSearch}
          genre="hot"
        />
        <AdPopupAddFilmByGenre
          showModal={this.state.showModal}
          onCancel={this.onCloseModal}
          films={this.props.films}
          listAllFilm={this.props.listAllFilm}
          getAllFilm={(data) => this.props.getAllFilm(data)}
          updateHotFilm={(data) => {
            this.props.updateHotFilm(data);
          }}
          getNotHotFilm={() => {
            this.props.getNotHotFilm();
          }}
          listNotHot={this.props.listNotHot}
          listNotNew={this.props.listNotNew}
        />
        <FilmModalComponent
          showModal={this.state.showFilmModal}
          film={this.state.selectedFilm}
          onCancel={this.onCloseFilmModal}
          addFilm={(data) => {
            this.props.addFilm(data);
          }}
          updateFilm={(data) => {
            this.props.updateFilm(data);
          }}
          getActor={() => {
            this.props.getActor();
          }}
          getCinema={() => {
            this.props.getCinema();
          }}
          listActor={this.props.listActor}
          listCinema={this.props.listCinema}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.dashBoardReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFilm: (data) => dispatch(actions.getAllFilmAction(data)),
    getGenreAdmin: (data) => dispatch(actions.getGenreAdminRequest(data)),
    searchFilmAdmin: (data) => dispatch(actions.searchFilmAdmin(data)),
    addFilm: (data) => dispatch(actions.addFilmRequest(data)),
    updateFilm: (data) => dispatch(actions.updateFilmRequest(data)),
    updateHotFilm: (data) => dispatch(actions.updateHotFilmRequest(data)),
    getActor: () => dispatch(actions.getActorRequest()),
    getCinema: () => dispatch(actions.getCinemaAdminRequest()),
    getNotHotFilm: () => dispatch(actions.getNotHotFilmRequest()),
    deleteHotFilm: (id) => dispatch(actions.deleteHotFilmRequest(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotFilmContainer);
