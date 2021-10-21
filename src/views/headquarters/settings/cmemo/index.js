import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  faEdit,
  faEye,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import axios from "axios";
import "bootstrap-css-only/css/bootstrap.min.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import React, { Component } from "react";
import Button, { ButtonGroup } from "../../../../components/uielements/button";
import Popover from "../../../../components/uielements/popover";
import LayoutContent from "../../../../components/utility/layoutContent";
import LayoutContentWrapper from "../../../../components/utility/layoutWrapper";
import basicStyle from "../../../../config/basicStyle";
import { baguhin, itago, itala, tanong } from "../../../../talaan";
import Attachment from "./attachment";
import Card from "./card";

export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.url = localStorage.getItem("url");
    this.state = {
      entity: "tracking/memos",
      models: [],
      model: { name: "", display_name: "" },
      exhibit: false,
      activeIndex: 0,
      form: {},
      attachmentExhibit: false,
    };
  }
  componentDidMount() {
    this.onSearch();
  }

  onSearch = (key) => {
    tanong(this.state.entity, {
      key,
      user: this.auth.id,
      batch: this.auth.batch_id,
    }).then((data) => {
      this.setState({ models: [...data] });
    });
  };
  onExhibit = (i) => {
    let model = this.state.models[i];
    this.setState({
      model: model,
      newModel: false,
      activeIndex: i,
    });
    this.switchExhibitStatus();
  };
  newExhibit = () => {
    this.setState({
      model: {
        user_id: this.auth.id,
        batch_id: this.auth.batch_id,
      },
      newModel: true,
    });
    this.switchExhibitStatus();
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, exhibit: false });
    }, 2000);
  };

  onSave = () => {
    itala(this.state.entity, this.state.model).then((data) => {
      let { models } = this.state;
      models.push(data);
      this.setState({ models: models });
    });
  };
  onUpdate = () => {
    console.log(this.state.model);
    baguhin(this.state.entity, this.state.model.id, this.state.model).then(
      (data) => {
        let { models } = this.state;
        models[this.state.activeIndex] = data;
        this.setState({ models: models });
      }
    );
  };
  onDelete = async (i, pk) => {
    let has_removed = await itago(this.state.entity, pk);
    if (has_removed) {
      let models = this.state.models;
      models.splice(i, 1);
      this.setState({ models });
    }
  };
  switchExhibitStatus() {
    this.setState({ exhibit: !this.state.exhibit });
  }
  handleSearchReset = (key) => this.onSearch(key);

  // Callback function
  closeModal = () => this.switchExhibitStatus();
  handleSubmit = (model) => {
    this.setState({ model: model });
    console.log(model);
    this.state.newModel ? this.onSave() : this.onUpdate();
    this.switchExhibitStatus();
  };

  //upload

  fileUploadHandler = async (val) => {
    // console.log(val.target.files[0]);
    const files = val.target.files[0];
    let { model } = this.state;
    model.filetype = files.name.split(".").pop();
    this.setState({ model });
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      let { form } = this.state;
      form.file_base64 = reader.result;
      form.ext = files.name.split(".").pop();
      form.url = `memorandum/${this.url}`;
      form.name = this.state.model.code;
      this.setState({ form });
      axios.post("api/tracking/memos/upload", this.state.form, {
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        },
      });
    };
  };
  //Attachment
  switchAttachmentExhibitStatus = (model, code) => {
    this.setState({
      url: `memorandum/${this.url}/${code}.${model}`,
      attachmentExhibit: !this.state.attachmentExhibit,
    });
  };
  closeAttachmentModal = () => this.switchAttachmentExhibitStatus();
  handleClose = () => this.props.onClose();
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    let writer = this.state.models.map((model, index) => {
      return (
        <tr key={model.id}>
          <td>{index + 1}</td>
          <td>{model.title}</td>
          <td>{model.code}</td>
          <td>{model.posted_by}</td>
          <td>
            <ButtonGroup>
              <Popover content="View" placement="left">
                <Button
                  className="btn btn-outline-success"
                  onClick={this.switchAttachmentExhibitStatus.bind(
                    this,
                    model.filetype,
                    model.code
                  )}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </Popover>
              <Popover content="Edit">
                <Button className="btn btn-outline-info">
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={this.onExhibit.bind(this, index, model.id)}
                  />
                </Button>
              </Popover>
              <Popover content="Delete" placement="right">
                <Button
                  className="btn btn-outline-danger"
                  onClick={this.onDelete.bind(this, index, model.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Popover>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={23} sm={12} xs={24} style={colStyle}>
              <h1>Memorandum</h1>
            </Col>
            <Col md={1} sm={12} xs={24} style={colStyle}>
              <ButtonGroup>
                <Popover content="Add a Info">
                  <Button
                    className="btn btn-outline-primary"
                    onClick={this.newExhibit}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </Popover>
              </ButtonGroup>
            </Col>
          </Row>
          <MDBTable striped hover responsive>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Code</th>
                <th>Posted By</th>
                <th>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>{writer}</MDBTableBody>
          </MDBTable>
        </LayoutContent>
        <Card
          model={this.state.model}
          newModel={this.state.newModel}
          exhibit={this.state.exhibit}
          onClose={this.closeModal}
          onSubmit={this.handleSubmit}
          fileUploadHandler={this.fileUploadHandler}
        />
        <Attachment
          model={this.state.url}
          exhibit={this.state.attachmentExhibit}
          onClose={this.closeAttachmentModal}
          onSubmit={this.handleSubmit}
          activeIndex={this.state.activeIndex}
        />
      </LayoutContentWrapper>
    );
  }
}
