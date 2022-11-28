import React, { Component } from 'react';
import '../../styles/scss/FareStyle.scss';
export class FareComponent extends Component {
    render() {
        let dataCinemaCluster = this.props.dataCinemaDetail;
        return (
            <div className="fareContainer">
                <h1 className="content">Bảng giá vé</h1>
                <div className="fare-image">
                    <img className="img-container" src={dataCinemaCluster?.FareImage?.Url} alt="#" />
                </div>
            </div>
        )
    }
}

export default FareComponent
