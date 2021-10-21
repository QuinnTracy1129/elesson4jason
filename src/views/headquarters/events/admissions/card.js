import { Col } from "antd";
import React, { Component } from "react";
import Modals from "../../../../components/modal";
import ModalStyle from "../../../../components/modal/modal.style";
import Button from "../../../../components/uielements/button";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup } from "../../../../components/uielements/input";
import Select, { SelectOption } from "../../../../components/uielements/select";
import WithDirection from "../../../../config/withDirection";
import { listahan } from "../../../../talaan";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.state = {
      model: {
        level: "",
        questionaire: "",
        user_id: this.auth.id,
      },
      levels: "",
      question: "",
      loading: false,
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleEnter);
    listahan("levels").then((data) => {
      this.setState({ list: data });
      let list = data.map((model) => {
        return <SelectOption value={model.id}>{model.name}</SelectOption>;
      });
      this.setState({ levels: list });
    });
    listahan("questionares").then((question) => {
      this.setState({ question: question });
      let questions = question.map((model) => {
        return <SelectOption value={model.id}>{model.name}</SelectOption>;
      });
      this.setState({ question: questions });
    });
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
      // this.state.model = this.props.model;
      this.setState({ model: this.props.model });
    }

    return (
      <Modal
        visible={this.props.exhibit}
        title={this.props.newModel ? "Add a Admission" : "Update Admission"}
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
            {this.props.newModel ? "Submit" : "Update"}
          </Button>,
        ]}
      >
        <InputGroup size="large" style={{ marginBottom: "15px" }}>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Name"
                disabled={true}
              />
              <Input
                style={{ width: "80%" }}
                placeholder="Name"
                value={this.state.model.name || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.name = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>

            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Grade Level"
                disabled={true}
              />
              <Select
                style={{ width: "80%" }}
                value={this.state.model.level_id || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.level_id = e;
                  this.setState({ model });
                }}
              >
                {this.state.levels}
              </Select>
            </InputGroup>
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Question"
                disabled={true}
              />
              <Select
                style={{ width: "80%" }}
                value={this.state.model.questionaire_id || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.questionaire_id = e;
                  this.setState({ model });
                }}
              >
                {this.state.question}
              </Select>
            </InputGroup>
          </Col>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "25%" }}
                defaultValue="Exam Start"
                disabled={true}
              />
              <Input
                type="date"
                style={{ width: "75%" }}
                placeholder="Exam Start"
                value={this.state.model.start_at || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.start_at = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "25%" }}
                defaultValue="Exam End"
                disabled={true}
              />
              <Input
                type="date"
                style={{ width: "75%" }}
                placeholder="Exam End"
                value={this.state.model.end_at || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.end_at = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "25%" }}
                defaultValue="Items"
                disabled={true}
              />
              <Input
                type="number"
                style={{ width: "75%" }}
                placeholder="Items"
                value={this.state.model.items || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.items = e.target.value;
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
