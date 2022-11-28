import React, { Component } from 'react'
import DashboardHeader from '../components/commonComponents/DashboardHeader'
import DashboardListItems from '../components/commonComponents/DashboardListItems'
import DashboardPagination from '../components/commonComponents/DashboardPagination'
import AdPopupCinemaComponent from '../components/Dashboard/AdPopupCinemaComponent'
import * as actions from '../actions/Actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const DEFAULT_CHECKED_LIST = []

class CinemaFilmContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDelete: false,
      checkedCinemaIds: DEFAULT_CHECKED_LIST,
      selectedCinema: null,
      showCinemaModal: false,
    }
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
    this.onToggleDelete = this.onToggleDelete.bind(this);
    this.clearCheckedList = this.clearCheckedList.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCloseCinemaModal = this.onCloseCinemaModal.bind(this);
    this.onShowCinemaModal = this.onShowCinemaModal.bind(this);
    this.onAddClicked = this.onAddClicked.bind(this);
    this.onCinemaClicked = this.onCinemaClicked.bind(this);
  }

  componentDidMount() {
    this.props.getCinemaAdmin({ pageIndex: 1 })
  }

  onCheckboxChanged(isChecked, id) {
    this.setState((prevState) => ({
      checkedCinemaIds: isChecked
        ? [...prevState.checkedCinemaIds, id]
        : prevState.checkedCinemaIds.filter((currId) => currId !== id)
    }));
  }

  onCinemaClicked(cinema) {
    this.setState({ selectedCinema: cinema, showCinemaModal: true })
  }

  onToggleDelete(status) {
    this.setState({ isDelete: status })
  }

  clearCheckedList() {
    this.setState({ checkedCinemaIds: DEFAULT_CHECKED_LIST })
  }

  onDelete() {
    this.props.deleteCinema(this.state.checkedCinemaIds);
    this.clearCheckedList();
  }

  onCloseCinemaModal() {
    this.setState({ showCinemaModal: false, selectedCinema: null })
  }

  onShowCinemaModal() {
    this.setState({ showCinemaModal: true })
  }

  onAddClicked() {
    this.onShowCinemaModal();
  }

  render() {
    return (
      <>
        <DashboardHeader
          showSearch={false}
          showAddButton
          showDeleteButton
          onAddClicked={this.onAddClicked}
          onToggleDelete={this.onToggleDelete}
          onDelete={this.onDelete}
          onCancel={this.clearCheckedList}
        />
        <DashboardListItems
          loading={this.state.isFetching}
          listCinema={this.props.listCinema}
          isDelete={this.state.isDelete}
          onSelected={this.onCheckboxChanged}
          onFilmClicked={this.onCinemaClicked}
          getCinemaAdmin={this.props.getCinemaAdmin}
        />
        <DashboardPagination
          pageIndex={this.props.pageIndex}
          totalPage={this.props.totalPage}
          getCinema={(data) => this.props.getCinemaAdmin(data)}
        />
        <AdPopupCinemaComponent
          cinema={this.state.selectedCinema}
          showModal={this.state.showCinemaModal}
          onCancel={this.onCloseCinemaModal}
          listSmallCinema={this.props.listSmallCinema}
          tempCinema={this.props.tempCinema}
          addCinemaCluster={(data) => {
            this.props.addCinemaCluster(data);
          }}
          updateCinemaCluster={(data) => {
            this.props.updateCinemaCluster(data);
          }}
          getCinema={(data) => {
            this.props.getCinema(data);
          }}
          addCinema={(data) => {
            this.props.addCinema(data);
          }}
          clearTempCinema={() => {
            this.props.clearTempCinema();
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
    addCinemaCluster: (data) => {
      dispatch(actions.addCinemaClusterRequest(data));
    },
    updateCinemaCluster: (data) => {
      dispatch(actions.updateCinemaClusterRequest(data));
    },
    getCinemaAdmin: (data) => {
      dispatch(actions.getCinemaAdminRequest(data));
    },
    deleteCinema: (data) => {
      dispatch(actions.deleteCinemaRequest(data));
    },
    getCinema: (data) => {
      dispatch(actions.getCinemaRequest(data));
    },
    addCinema: (data) => {
      dispatch(actions.addCinemaRequest(data));
    },
    clearTempCinema: () => dispatch(actions.clearTempCinema()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CinemaFilmContainer));
