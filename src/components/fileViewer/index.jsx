import React from 'react';
import Modals from '../feedback/modal';
import ModalStyle from './modal.style';
import WithDirection from '../../config/withDirection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Button from '../uielements/button';
import { MDBContainer, MDBIframe } from "mdbreact";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

class FileViewer extends React.Component {
    state = {
        visible: false
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        });
    };

    render() {
        return (
            <Button className={this.props.button} onClick={this.toggle}>
                <FontAwesomeIcon icon={faEye} />
                <Modal
                    width="60%"
                    visible={this.state.visible}
                    title="File Viewer"
                    onCancel={this.toggle}
                    footer={null}
                >
                    <MDBContainer className="text-center">
                        <MDBIframe src={this.props.drive || 'https://docs.google.com/document/d/'} />
                    </MDBContainer>
                </Modal>
            </Button>
        );
    }
}

export default FileViewer;
