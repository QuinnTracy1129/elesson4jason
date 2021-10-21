import React, { Component } from "react";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup } from "../../../../components/uielements/input";
import Modals from "../../../../components/modal";
import ModalStyle from "../../../../components/modal/modal.style";
import WithDirection from "../../../../config/withDirection";
import Button from "../../../../components/uielements/button";
import { Col } from "antd";
import Select, { SelectOption } from "../../../../components/uielements/select";
import ContentHolder from "../../../../components/utility/contentHolder";

const isoModal = ModalStyle(Modals);
const Option = SelectOption;
const Modal = WithDirection(isoModal);
const children = [
  <Option value="prep">Preparatory</Option>,
  <Option value="elem">Elementary</Option>,
  <Option value="jhs">Junior High School</Option>,
  <Option value="shs">Senior High School</Option>,
  <Option value="tertiary">College</Option>,
  <Option value="gs">Masteral</Option>, // graduate school
  <Option value="phd">PhD</Option>,
];

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: "",
      loading: false,
    };
  }
  handleChange = (value) => {};

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
      this.state.model = this.props.model;
    }

    return (
      <Modal
        visible={this.props.exhibit}
        title={
          this.props.newModel
            ? "Add a Settings Profile"
            : "Update Settings Profile"
        }
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
                placeholder="Enter Name"
                value={this.state.model.name || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.name = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
          </Col>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "0.5px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Code"
                disabled={true}
              />
              <Input
                type="number"
                style={{ width: "80%" }}
                placeholder="Enter Code"
                value={this.state.model.code || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.code = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
          </Col>
          <Col span="24">
            {/* <InputGroup compact style={{ marginBottom: '15px' }}> */}
            <ContentHolder style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Catering"
                disabled={true}
              />
              <Select
                mode="multiple"
                style={{ width: "80%" }}
                placeholder="Enter Catering"
                defaultValue={this.state.model.catering}
                onChange={(e) => {
                  let { model } = this.state;
                  model.catering = [];
                  this.setState({ model });
                }}
              >
                {children}
              </Select>
            </ContentHolder>
            {/* </InputGroup> */}
          </Col>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="District"
                disabled={true}
              />
              <Input
                style={{ width: "80%" }}
                placeholder="Enter District"
                value={this.state.model.district || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.district = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
          </Col>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Division"
                disabled={true}
              />
              <Input
                style={{ width: "80%" }}
                placeholder="Enter Division"
                value={this.state.model.division || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.division = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
          </Col>

          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Address"
                disabled={true}
              />
              <Input
                style={{ width: "80%" }}
                placeholder="Enter Address"
                value={this.state.model.address || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.address = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
          </Col>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Phone"
                disabled={true}
              />
              <Input
                type="number"
                style={{ width: "80%" }}
                placeholder="Enter Phone"
                value={this.state.model.phone || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.phone = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
          </Col>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Contact Person"
                disabled={true}
              />
              <Input
                style={{ width: "80%" }}
                placeholder="Enter Contact Person"
                value={this.state.model.cp || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.cp = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
          </Col>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Extension Name"
                disabled={true}
              />
              <Input
                style={{ width: "80%" }}
                placeholder="Enter Extension Name"
                value={this.state.model.extname || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.extname = e.target.value;
                  this.setState({ model });
                }}
              />
            </InputGroup>
          </Col>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Credentials"
                disabled={true}
              />
              <Input
                style={{ width: "80%" }}
                placeholder="Enter Credentials"
                value={this.state.model.credentials || ""}
                onChange={(e) => {
                  let { model } = this.state;
                  model.credentials = e.target.value;
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
