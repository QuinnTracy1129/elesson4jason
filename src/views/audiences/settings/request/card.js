import React, { Component } from "react";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, {
  InputGroup,
  Textarea,
} from "../../../../components/uielements/input";
import Modals from "../../../../components/modal";
import ModalStyle from "../../../../components/modal/modal.style";
import WithDirection from "../../../../config/withDirection";
import Button from "./../../../../components/uielements/button";
import { Col } from "antd";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: { stage: "", name: "", description: "" },
      loading: false,
      schools: "",
      adviser: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClose = () => this.props.onClose();
  onSubmit = (e) => {
    e.preventDefault();
    let model = this.state.model;
    this.props.onSubmit(model);
  };
  render() {
    // eslint-disable-next-line
    if (this.props.exhibit) {
      this.setState({ model: this.props.model });
    }

    return (
      <Modal
        visible={this.props.exhibit}
        title={this.props.newModel ? "Add a Level" : "Create Issue"}
        onOk={this.handleOk}
        onCancel={this.handleClose}
        footer={[
          <Button
            key="back"
            size="large"
            type="danger"
            onClick={this.handleClose}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={this.state.loading}
            onClick={this.onSubmit}
          >
            {this.props.newModel ? "Submit" : "Issue"}
          </Button>,
        ]}
      >
        <InputGroup size="large" style={{ marginBottom: "15px" }}>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Title"
                disabled={true}
              />
              <Input
                style={{ width: "80%" }}
                placeholder="Title"
                value={this.state.model.title || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.title = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
          </Col>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Issue"
                disabled={true}
              />
              <Textarea
                rows={6}
                style={{ width: "80%" }}
                placeholder="Issue"
                value={this.state.model.issue || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.issue = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
          </Col>
        </InputGroup>
      </Modal>
    );
  }
}
