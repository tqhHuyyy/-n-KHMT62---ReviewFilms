import React, { Component } from 'react'
import DashboardHeader from '../components/commonComponents/DashboardHeader'
import DashboardListItems from '../components/commonComponents/DashboardListItems'
import FilmModalComponent from '../components/commonComponents/FilmModalComponent'
import * as actions from '../actions/Actions'
import { connect } from 'react-redux'
import DashboardPagination from '../components/commonComponents/DashboardPagination'

const DEFAULT_CHECKED_LIST = []

class AllFilmContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDelete: false,
      checkedFilmIds: DEFAULT_CHECKED_LIST,
      selectedFilm: null,
      showFilmModal: false,
    }
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
    this.onToggleDelete = this.onToggleDelete.bind(this);
    this.clearCheckedList = this.clearCheckedList.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onFilmClicked = this.onFilmClicked.bind(this);
    this.onCloseFilmModal = this.onCloseFilmModal.bind(this);
    this.onShowFilmModal = this.onShowFilmModal.bind(this);
  }

  componentDidMount() {
    this.props.getAllFilm({pageIndex: 1});
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
          showAddButton
          showDeleteButton
          textSearch={this.props.textSearch}
          onSearch={(data) => this.props.searchAllFilmAdmin(data)}
          onGet={(data) => this.props.getAllFilm(data)}
          onAddClicked={this.onShowFilmModal}
          onToggleDelete={this.onToggleDelete}
          onDelete={this.onDelete}
          onCancel={this.clearCheckedList}
          genre={null}
        />
        <DashboardListItems
          isDelete={this.state.isDelete}
          loading={this.state.isFetching}
          films={this.props.listAllFilm}
          onSelected={this.onCheckboxChanged}
          onFilmClicked={this.onFilmClicked}
        />
        <DashboardPagination
          pageIndex={this.props.pageIndex}
          totalPage={this.props.totalPage}
          getAllFilm={(data) =>
            this.props.textSearch === ''
              ? this.props.getAllFilm(data)
              : this.props.searchAllFilmAdmin(data)
          }
          genre=""
          textSearch={this.props.textSearch}
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
    addFilm: (data) => dispatch(actions.addFilmRequest(data)),
    searchAllFilmAdmin: (data) => dispatch(actions.searchAllFilmAdmin(data)),
    updateFilm: (data) => dispatch(actions.updateFilmRequest(data)),
    getActor: () => dispatch(actions.getActorRequest()),
    getCinema: () => dispatch(actions.getCinemaAdminRequest()),
    deleteFilm: (id) => dispatch(actions.deleteFilmAdminRequest(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllFilmContainer);
