import React, {Component} from 'react';
import DashboardHeader from '../components/commonComponents/DashboardHeader';
import DashboardListItems from '../components/commonComponents/DashboardListItems';
import DashboardPagination from '../components/commonComponents/DashboardPagination';
import FilmModalComponent from '../components/commonComponents/FilmModalComponent';
import * as actions from '../actions/Actions';
import AdPopupAddFilmByGenre from '../components/Dashboard/AdPopupAddFilmByGenre';
import {connect} from 'react-redux';

const DEFAULT_CHECKED_LIST = [];

class NewFilmContainer extends Component {
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
      genre: 'new',
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
    this.props.deleteNewFilm(this.state.checkedFilmIds);
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
          genre="new"
          onAddClicked={this.onShowModal}
          onToggleDelete={this.onToggleDelete}
          onDelete={this.onDelete}
          onCancel={this.clearCheckedList}
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
          getNewFilm={(data) =>
            this.props.textSearch === ''
              ? this.props.getGenreAdmin(data)
              : this.props.searchFilmAdmin(data)
          }
          textSearch={this.props.textSearch}
          genre="new"
        />
        <AdPopupAddFilmByGenre
          showModal={this.state.showModal}
          onCancel={this.onCloseModal}
          films={this.props.films}
          listAllFilm={this.props.listAllFilm}
          getAllFilm={(data) => this.props.getAllFilm(data)}
          updateNewFilm={(data) => {
            this.props.updateNewFilm(data);
          }}
          getNotNewFilm={() => {
            this.props.getNotNewFilm();
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
    searchFilmAdmin: (data) => dispatch(actions.searchFilmAdmin(data)),
    getGenreAdmin: (data) => dispatch(actions.getGenreAdminRequest(data)),
    addFilm: (data) => dispatch(actions.addFilmRequest(data)),
    updateNewFilm: (data) => dispatch(actions.updateNewFilmRequest(data)),
    getActor: () => dispatch(actions.getActorRequest()),
    getCinema: () => dispatch(actions.getCinemaAdminRequest()),
    getNotNewFilm: () => dispatch(actions.getNotNewFilmRequest()),
    deleteNewFilm: (id) => dispatch(actions.deleteNewFilmRequest(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFilmContainer);
