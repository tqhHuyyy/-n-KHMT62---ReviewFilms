/**
 * Goi den component poster de hien thi
 */

import React, { Component } from 'react';
import PosterComponent from './PosterComponent';

export default class FilmInforComponent extends Component {
    render() {
        return (
            <PosterComponent {...this.props} />
        )
    }
}
