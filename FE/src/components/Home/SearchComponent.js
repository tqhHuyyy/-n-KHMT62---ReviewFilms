/* eslint-disable no-useless-constructor */
import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

export class SearchComponent extends Component {
  state = {
    textSearch: '',
    colorChange: '#696969',
  };

  handleSearch() {
    this.props.getListSearchFilm({
      textSearch: this.state.textSearch,
      pageIndex: 1,
      content: 'Tìm kiếm với từ khoá :  ',
    });
  }

  render() {
    const path = window.location.pathname;
    const handleFocusInput = () => {
      this.setState({colorChange: '#000'});
    };
    const handleBlurInput = () => {
      this.setState({colorChange: '#696969'});
    };
    return (
      <div className="navBar-content-search">
        <input
          type="text"
          // id="input-search"
          onKeyDown={(e) => {
            if (e.key === 'Enter') this.handleSearch();
          }}
          placeholder="Tìm kiếm tên film"
          onChange={(e) => this.setState({textSearch: e.target.value})}
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
        />
        <Link to="/find/search" onClick={() => this.handleSearch()}>
          <div className="btn" style={{color: this.state.colorChange}}>
            <svg style={{width: 24, height: 24}} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              />
            </svg>
          </div>
        </Link>
        {this.props.status === true && <Redirect to="/find/search" />}
      </div>
    );
  }
}

export default SearchComponent;
