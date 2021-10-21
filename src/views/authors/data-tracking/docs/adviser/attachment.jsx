import React, { Component } from 'react';
import axios from 'axios';
import { MDBIframe } from 'mdbreact';
import { Modal } from 'antd';

export default class extends Component {
    handleClose = () => {
        this.props.file_name = ''
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
                {this.props.filetype === 'pdf' ?
                    <MDBIframe src={`${axios.defaults.baseURL}storage/Users/${this.props.email}/dll/${this.props.file_name}`} />
                    :
                    <MDBIframe src={`${this.props.file_name}`} />
                }
            </Modal>
        );
    }
}
