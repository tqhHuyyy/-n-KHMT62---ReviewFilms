import React, {Component} from 'react';
import DashboardHeader from '../components/commonComponents/DashboardHeader';
import DashboardListItems from '../components/commonComponents/DashboardListItems';
import DashboardPagination from '../components/commonComponents/DashboardPagination';
import AddActorModal from '../components/commonComponents/AddActorModal';
import * as actions from '../actions/Actions';
import {connect} from 'react-redux';

const DEFAULT_CHECKED_LIST = [];

class ActorsFilmContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDelete: false,
      checkedActorIds: DEFAULT_CHECKED_LIST,
      selectedActor: null,
      showActorModal: false,
    };
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
    this.onToggleDelete = this.onToggleDelete.bind(this);
    this.clearCheckedList = this.clearCheckedList.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onActorClicked = this.onActorClicked.bind(this);
    this.onCloseActorModal = this.onCloseActorModal.bind(this);
    this.onShowActorModal = this.onShowActorModal.bind(this);
  }

  componentDidMount() {
    this.props.getActor({pageIndex: 1});
  }

  onCheckboxChanged(isChecked, id) {
    this.setState((prevState) => ({
      checkedActorIds: isChecked
        ? [...prevState.checkedActorIds, id]
        : prevState.checkedActorIds.filter((currId) => currId !== id),
    }));
  }

  onToggleDelete(status) {
    this.setState({isDelete: status});
  }

  clearCheckedList() {
    this.setState({checkedActorIds: DEFAULT_CHECKED_LIST});
  }

  onDelete() {
    this.props.deleteActor(this.state.checkedActorIds);
    this.clearCheckedList();
  }

  onActorClicked(actor) {
    this.setState({selectedActor: actor, showActorModal: true});
  }

  onCloseActorModal() {
    this.setState({showActorModal: false, selectedActor: null});
  }

  onShowActorModal() {
    this.setState({showActorModal: true});
  }

  render() {
    return (
      <>
        <DashboardHeader
          showSearch
          showAddButton
          showDeleteButton
          onSearch={(text) => this.props.searchActor(text)}
          onGet={(page) => this.props.getActor(page)}
          onAddClicked={this.onShowActorModal}
          onToggleDelete={this.onToggleDelete}
          onDelete={this.onDelete}
          onCancel={this.clearCheckedList}
        />
        <DashboardListItems
          listActor={this.props.listActor}
          loading={this.state.isFetching}
          isDelete={this.state.isDelete}
          onSelected={this.onCheckboxChanged}
          onFilmClicked={this.onActorClicked}
        />
        <DashboardPagination
          pageIndex={this.props.activePage}
          totalPage={this.props.totalPage}
          getActor={(data) =>
            this.props.textSearch === ''
              ? this.props.getActor(data)
              : this.props.searchActor(data)
          }
          textSearch={this.props.textSearch}
        />
        <AddActorModal
          actor={this.state.selectedActor}
          showModal={this.state.showActorModal}
          onCancel={this.onCloseActorModal}
          addActor={(data) => {
            this.props.addActor(data);
          }}
          updateActor={(data) => {
            this.props.updateActor(data);
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
    addActor: (data) => {
      dispatch(actions.addActorRequest(data));
    },
    updateActor: (data) => {
      dispatch(actions.updateActorRequest(data));
    },
    getActor: (data) => dispatch(actions.getActorRequest(data)),
    searchActor: (data) => dispatch(actions.searchActorRequest(data)),
    deleteActor: (data) => dispatch(actions.deleteActorRequest(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActorsFilmContainer);

