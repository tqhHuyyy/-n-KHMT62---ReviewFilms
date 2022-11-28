import React, { Component } from 'react';
import FooterContainer from '../containers/commonContainers/FooterContainer';
import NavBarContainer from '../containers/commonContainers/NavBarContainer';
import HomePageContainer from '../containers/HomePageContainer';
export class HomePage extends Component {
    render() {
        return (
            <div>

                <NavBarContainer />
                <HomePageContainer />
                <FooterContainer />

            </div>
        )
    }
}

export default HomePage
