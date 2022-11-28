import React, { Component } from 'react';
import NavBarContainer from '../containers/commonContainers/NavBarContainer';
import FooterContainer from '../containers/commonContainers/FooterContainer';
import DetailFilmContainer from '../containers/DetailFilmContainer';

export class DetailFilm extends Component {
    render() {
        return (
            <div>
                <div>
                    <NavBarContainer />
                </div>
                <div>
                    <DetailFilmContainer />
                </div>
                <div>
                    <FooterContainer />
                </div>
            </div>
        )
    }
}

export default DetailFilm
