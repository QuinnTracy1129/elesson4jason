import React, { Component } from 'react';
import axios from 'axios';

import Modals from '../../../components/feedback/modal';
import ModalStyle from '../../../containers/Feedback/Modal/modal.style';
import WithDirection from '../../../config/withDirection';

import Default from '../../../image/defaults/default.png'

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class extends Component {
    state = {
        loading: false,
        visible: false,
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    render() {
        const profile = `${axios.defaults.baseURL}storage/Users/${this.props.image}`
        return (
            <div className="border border-light rounded-circle d-flex align-items-center mx-auto bg-light" style={{ width: 200, height: 200, marginTop: -100 }}>
                <img
                    alt="Base"
                    width='100%'
                    height='100%'
                    className='rounded-circle img-responsive mx-auto'
                    src={profile}
                    onError={
                        (e) => {
                            e.target.onerror = null;
                            e.target.src = Default
                        }}
                    onClick={this.showModal}
                />
                <Modal
                    visible={this.state.visible}
                    title="Profile picture"
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <img
                        alt="Zoomed"
                        height="auto"
                        width='100%'
                        src={profile}
                        onError={
                            (e) => {
                                e.target.onerror = null;
                                e.target.src = Default
                            }}
                    />
                </Modal>
            </div>
        );
    }
}
