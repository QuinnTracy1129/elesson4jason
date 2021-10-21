import React, { Component } from 'react'
import Modals from '../../../../components/modal';
import ModalStyle from '../../../../components/modal/modal.style';
import WithDirection from '../../../../config/withDirection';
import axios from 'axios';
import { MDBIframe } from 'mdbreact';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class Attachment extends Component {
    handleClose = () => this.props.onClose()
    render() {
        return (
            <Modal
                width="70%"
                visible={this.props.exhibit}
                title={"Attachment"}
                onCancel={this.handleClose}
                footer={false}
            >
                <MDBIframe src={`${axios.defaults.baseURL}storage/${this.props.model}`} />
            </Modal >
        )
    }
}