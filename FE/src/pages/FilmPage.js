import React, { Component } from 'react';
import NavBarContainer from '../containers/commonContainers/NavBarContainer';
import FooterContainer from '../containers/commonContainers/FooterContainer';
import ListFilmContainer from '../containers/ListFilmContainer'

export class FilmPage extends Component {
    render() {
        const path = window.location.pathname;
        return (
            <div>
                <div>
                    <NavBarContainer 
                    {...this.props}
                    />
                    
                </div>
                <div>
                    <ListFilmContainer path={path}
                    
                    />
                </div>
                <div>
                    <FooterContainer />
                </div>
            </div>
        )
    }
}

export default FilmPage
