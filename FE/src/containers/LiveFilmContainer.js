import React, {Component} from 'react';
import DashboardHeader from '../components/commonComponents/DashboardHeader';
import DashboardListItems from '../components/commonComponents/DashboardListItems';
import DashboardPagination from '../components/commonComponents/DashboardPagination';
import FilmModalComponent from '../components/commonComponents/FilmModalComponent';
import * as actions from '../actions/Actions';
import {connect} from 'react-redux';

const DEFAULT_CHECKED_LIST = [];

class LiveFilmContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDelete: false,
      checkedFilmIds: DEFAULT_CHECKED_LIST,
      selectedFilm: null,
      showFilmModal: false,
    };
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
    this.onToggleDelete = this.onToggleDelete.bind(this);
    this.clearCheckedList = this.clearCheckedList.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onFilmClicked = this.onFilmClicked.bind(this);
    this.onCloseFilmModal = this.onCloseFilmModal.bind(this);
    this.onShowFilmModal = this.onShowFilmModal.bind(this);
  }

  componentDidMount() {
    this.props.getGenreAdmin({
      pageIndex: 1,
      genre: 'in_theater',
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
    this.props.deleteFilm(this.state.checkedFilmIds);
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

  render() {
    return (
      <>
        <DashboardHeader
          showSearch
          showDeleteButton
          onSearch={(data) => this.props.searchFilmAdmin(data)}
          onGet={(data) => this.props.getGenreAdmin(data)}
          genre="in_theater"
          onAddClicked={this.onShowFilmModal}
          onToggleDelete={this.onToggleDelete}
          onDelete={this.onDelete}
          onCancel={this.clearCheckedList}
        />
        <DashboardListItems
          isDelete={this.state.isDelete}
          films={this.props.films}
          loading={this.state.isFetching}
          onSelected={this.onCheckboxChanged}
          onFilmClicked={this.onFilmClicked}
        />
        <DashboardPagination
          pageIndex={this.props.pageIndex}
          totalPage={this.props.totalPage}
          textSearch={this.props.textSearch}
          getLiveFilm={(data) =>
            this.props.textSearch === ''
              ? this.props.getGenreAdmin(data)
              : this.props.searchFilmAdmin(data)
          }
          getGenreAdmin={this.props.getGenreAdmin}
          genre={this.props.genre}
        />
        <FilmModalComponent
          showModal={this.state.showFilmModal}
          film={this.state.selectedFilm}
          onCancel={this.onCloseFilmModal}
          listActor={this.props.listActor}
          listCinema={this.props.listCinema}
          updateFilm={(data) => {
            this.props.updateFilm(data);
          }}
          getActor={() => {
            this.props.getActor();
          }}
          getCinema={() => {
            this.props.getCinema();
          }}
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
    searchFilmAdmin: (data) => dispatch(actions.searchFilmAdmin(data)),
    getGenreAdmin: (data) => dispatch(actions.getGenreAdminRequest(data)),
    updateFilm: (data) => dispatch(actions.updateFilmRequest(data)),
    getActor: () => dispatch(actions.getActorRequest()),
    getCinema: () => dispatch(actions.getCinemaAdminRequest()),
    deleteFilm: (id) => dispatch(actions.deleteLiveFilmRequest(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveFilmContainer);
