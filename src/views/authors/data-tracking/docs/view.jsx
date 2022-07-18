import React, { Component } from "react";
import ModalStyle from "../../../containers/Feedback/Modal/modal.style";
import Modals from "../../../components/feedback/modal";
import WithDirection from "../../../config/withDirection";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { MDBIframe } from "mdbreact";
import Button from "../../../components/uielements/button";
import Popover from "../../../components/uielements/popover";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class extends Component {
  state = {
    visible: false,
  };

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    return (
      <Popover content="View">
        <Button onClick={this.toggle} className="btn btn-outline-info">
          <FontAwesomeIcon icon={faEye} />
        </Button>
        <Modal
          visible={this.state.visible}
          title={this.props.title}
          onCancel={this.toggle}
          footer={null}
        >
          <MDBIframe
            src={`${axios.defaults.baseURL}storage/Users/${this.props.email}/dll/${this.props.url}`}
          />
        </Modal>
      </Popover>
    );
  }
}
