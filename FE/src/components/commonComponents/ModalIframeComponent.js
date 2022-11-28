/* eslint-disable jsx-a11y/iframe-has-title */
import Modal from 'react-bootstrap/Modal';
import React from "react";
import '../../styles/scss/CarouselStyles.scss'
export default class ModalIframeComponent extends React.Component {
    render() {
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" 
            centered
            dialogClassName="video-wrapper">
                    <iframe src={this.props.url}  allowFullScreen="" frameBorder="0">
                    </iframe>
            </Modal>
        )
    }
}