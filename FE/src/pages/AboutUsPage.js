import React, { Component } from 'react';
import AboutUsComponent from '../components/AboutUsComponent';
import NavBarContainer from '../containers/commonContainers/NavBarContainer';
import FooterContainer from '../containers/commonContainers/FooterContainer';


export class AboutUsPage extends Component {
    render() {
        return (
            <div>
                <div>
                    <NavBarContainer />
                </div>
                <div>
                    <AboutUsComponent />
                </div>
                <div>
                    <FooterContainer />
                </div>
            </div>
        )
    }
}

export default AboutUsPage
