import React, { Component } from 'react';
import { MDBCol, MDBRow } from 'mdbreact';
import ModalStyle from '../../../../containers/Feedback/Modal/modal.style';
import WithDirection from '../../../../config/withDirection';
import Modals from '../../../../components/feedback/modal';
// import { SteppedLineTo } from 'react-lineto';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap'
}

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
        const user = this.props.info;
        return (
            <MDBCol>
                <img
                    width='100'
                    height='100'
                    src='https://mdbootstrap.com/img/Photos/Avatars/img%20%281%29.jpg'
                    alt='avatar'
                    className={`${user.id}-fruit rounded-circle img-responsive`}
                    title={user.fullname}
                    onClick={this.showModal}
                // style={{ zIndex: 2 }}
                />
                <Modal
                    visible={this.state.visible}
                    title={user.fullname}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <MDBRow style={rowStyle}>
                        <MDBCol span={12}>
                            <h5>E-mail address :</h5><br />
                            <h5>Gender :</h5>
                        </MDBCol>
                        <MDBCol span={12} className="text-left">
                            <h5>{user.email}</h5><br />
                            <h5>{user.gender}</h5>
                        </MDBCol>
                    </MDBRow>
                </Modal>
                {/* <SteppedLineTo from={`${user.id}-fruit`} to={this.props.position} orientation="v" delay={0} zIndex={1} /> */}
            </MDBCol>
        );
    }
}
