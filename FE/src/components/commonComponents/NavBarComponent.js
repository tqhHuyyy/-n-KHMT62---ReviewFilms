import React from 'react';
import '../../styles/scss/NavBarStyles.scss';
import LogoComponent from '../Home/LogoComponent';
import NavLinkComponent from '../Home/NavLinkComponent';
import SearchComponent from '../Home/SearchComponent';

export default class NavBarComponent extends React.Component {
    state = {
        height: null
    }
    componentDidMount() {
        window.addEventListener("scroll", () => {
            let heightWindow = window.pageYOffset;
            this.setState({ height: heightWindow })
        })
    }

    render() {

        return (
            <div className={`navBar ${this.state.height > 0 ? 'scroll' :''}`}>
                <LogoComponent />
                <div className="navBar-content" >
                    <NavLinkComponent
                        dataCinemas={this.props.dataCinemas}
                        getDetailCinema={this.props.getDetailCinema}
                        getComingSoonFilm={(data) => { this.props.getComingSoonFilm(data) }}
                        getInTheaterFilm={(data) => { this.props.getInTheaterFilm(data) }}
                        getGenreFilm={(data) => { this.props.getGenreFilm(data) }}
                        content={this.props.content}
                        genre={this.props.genre}
                        textSearch={this.props.textSearch}
                    />
                    <SearchComponent
                        height={this.state.height}
                        getListSearchFilm={(data) => { this.props.getListSearchFilm(data) }}
                        content={this.props.content}
                        genre={this.props.genre}
                        textSearch={this.props.textSearch}
                        status={this.props.status}
                    />
                </div>
            </div>
        )
    }
}




