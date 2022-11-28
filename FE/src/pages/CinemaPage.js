import React, { Component } from 'react';
import FooterContainer from '../containers/commonContainers/FooterContainer';
import CinemaContainer from '../containers/CinemaContainer';
import NavBarContainer from '../containers/commonContainers/NavBarContainer';
export class CinemaPage extends Component {
    render() {
        return (
            <div>
                    <NavBarContainer />
                    <CinemaContainer />
                    <FooterContainer />
            </div>
        )
    }
}

export default CinemaPage
