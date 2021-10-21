import React, { Component } from 'react';
import axios from 'axios';
import { MDBIframe } from 'mdbreact';
import { Modal } from 'antd';

export default class extends Component {
    handleClose = () => {
        this.props.onClose()
    }
    render() {
        return (
            <Modal
                width="60%"
                visible={this.props.exhibit}
                title="Attachment"
                onCancel={this.handleClose}
                footer={false}
            >
                <MDBIframe src={`${axios.defaults.baseURL}storage/Users/${this.props.user}/${this.props.attachment}`} />
            </Modal>
        );
    }
}
