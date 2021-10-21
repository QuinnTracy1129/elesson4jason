import React, { Component } from "react";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, {
  InputGroup,
  Textarea,
} from "../../../../components/uielements/input";
import Modals from "../../../../components/modal";
import ModalStyle from "../../../../components/modal/modal.style";
import WithDirection from "../../../../config/withDirection";
import Button from "../../../../components/uielements/button";
import { Col } from "antd";
import Select, { SelectOption } from "../../../../components/uielements/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {},
      model: {
        issue: {
          title: "",
        },
      },
      loading: false,
    };
  }
  onChange = (e, target) => {
    let { model, issue } = this.state;
    if (target) {
      issue[target] = e.target.value;
      this.setState({ issue });
    } else {
      e.target
        ? (model[e.target.name] = e.target.value)
        : (model.file_type = e);
      this.setState({ model });
    }
  };
  handleClose = () => this.props.onClose();
  onSubmit = (e) => {
    e.preventDefault();
    let model = this.state.model;
    model.issue = this.state.issue;
    model.file_name = `${model.title}.${model.name.split(".").pop()}`;
    this.props.onSubmit(model);
  };
  render() {
    // eslint-disable-next-line
    if (this.props.exhibit) {
      this.setState({ model: this.props.model });
    }
    let { title, description, file_type } = this.state.model;

    return (
      <Modal
        visible={this.props.exhibit}
        title={this.props.newModel ? "Add a Lesson plan" : "Issue"}
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
        {!this.props.newModel ? (
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
                  placeholder="Enter Title"
                  value={
                    this.state.model.issue ? this.state.model.issue.title : ""
                  }
                  onChange={(e) => this.onChange(e, "title")}
                />
              </InputGroup>
            </Col>
            <Col span="24">
              <InputGroup compact style={{ marginBottom: "15px" }}>
                <Input
                  style={{ width: "20%" }}
                  defaultValue="Description"
                  disabled={true}
                />
                <Textarea
                  row={6}
                  style={{ width: "80%" }}
                  placeholder="Enter Description"
                  value={
                    this.state.model.issue
                      ? this.state.model.issue.description
                      : ""
                  }
                  onChange={(e) => this.onChange(e, "description")}
                />
              </InputGroup>
            </Col>
          </InputGroup>
        ) : (
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
                  placeholder="Enter Title"
                  name="title"
                  value={title || ""}
                  onChange={(e) => this.onChange(e)}
                />
              </InputGroup>
            </Col>
            <Col span="24">
              <InputGroup compact style={{ marginBottom: "15px" }}>
                <Input
                  style={{ width: "20%" }}
                  defaultValue="Description"
                  disabled={true}
                />
                <Input
                  style={{ width: "80%" }}
                  placeholder="Enter Description"
                  name="description"
                  value={description || ""}
                  onChange={(e) => this.onChange(e)}
                />
              </InputGroup>
            </Col>
            <Col span="24">
              <InputGroup compact style={{ marginBottom: "15px" }}>
                <Input
                  style={{ width: "20%" }}
                  defaultValue="File type"
                  disabled={true}
                />
                <Select
                  style={{ width: "80%" }}
                  placeholder="Enter File type"
                  value={file_type || ""}
                  name="file_type"
                  onChange={(e) => {
                    this.onChange(e);
                  }}
                >
                  <SelectOption value="drive">Google drive</SelectOption>
                  <SelectOption value="pdf">PDF</SelectOption>
                </Select>
              </InputGroup>
            </Col>
            {file_type === "pdf" ? (
              <Col span="24">
                <label className="btn btn-info mr-3" htmlFor="pdf">
                  <FontAwesomeIcon icon={faUpload} />
                </label>
                <Input
                  className="text-center"
                  placeholder="PDF file"
                  style={{ width: "90%" }}
                  disabled={true}
                  value={this.state.model.name || ""}
                />
                <input
                  accept="application/pdf,application"
                  onChange={(e) => {
                    let { model } = this.state;
                    model.file = e.target.files[0];
                    model.name = e.target.files[0].name;
                    this.setState({ model });
                  }}
                  className="d-none"
                  type="file"
                  id="pdf"
                />
              </Col>
            ) : (
              <Col span="24">
                <InputGroup compact style={{ marginBottom: "15px" }}>
                  <Input
                    style={{ width: "20%" }}
                    defaultValue="Link"
                    disabled={true}
                  />
                  <Input
                    style={{ width: "80%" }}
                    placeholder="Enter Link"
                    name="link"
                    value={this.state.model["link"] || ""}
                    onChange={(e) => {
                      let model = this.state.model;
                      model["link"] = e.target.value;
                      this.setState({ model });
                    }}
                  />
                </InputGroup>
              </Col>
            )}
          </InputGroup>
        )}
      </Modal>
    );
  }
}
