import React, { Component } from "react";
import LayoutContentWrapper from "../../../../components/utility/layoutWrapper";
import LayoutContent from "../../../../components/utility/layoutContent";
import { Row, Col } from "antd";
import basicStyle from "../../../../config/basicStyle";
import Button, { ButtonGroup } from "../../../../components/uielements/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faExclamation,
  faFile,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Popover from "../../../../components/uielements/popover";

import { tanong, itala, baguhin, itago } from "../../../../talaan";
import Card from "./card";
import axios from "axios";
import Attachment from "./attachment";
import moment from "moment";
const getBadge = status => {
  switch (status) {
    case "pending":
      return "bg-warning text-dark rounded";
    case "submitted":
      return "bg-secondary text-white rounded";
    case "checked":
      return "bg-info text-white rounded";
    case "reviewed":
      return "bg-primary text-white rounded";
    case "noted":
      return "bg-success text-white rounded";
    default:
      return "bg-danger text-dark rounded";
  }
};
export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.classroom = JSON.parse(localStorage.getItem("classroom"));
    console.log(this.classroom);
    this.state = {
      entity: "tracking/documents",
      models: [],
      model: undefined,
      exhibit: false,
      activeIndex: 0,
      form: {},
      file_name: undefined,
    };
    this.key = document.getElementById("InputTopbarSearch");
    this.key.style = "display:block";
  }
  componentDidMount() {
    console.log(moment().format("MM/d/Y"));
    this.onSearch();
    this.key.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        this.onSearch();
        this.key.value = "";
      }
    });
  }
  componentWillUnmount() {
    this.key.removeEventListener("keyup", this.onSearch);
  }
  onSearch = () => {
    tanong(this.state.entity, {
      department: this.auth.department_id,
      batch: this.auth.batch_id,
      status: "submited",
    }).then(data => {
      this.setState({ models: [...data] }, () => console.log("starts here"));
    });
  };
  onExhibit = i => {
    let model = this.state.models[i];
    this.setState({
      model: model,
      issue: {
        title: "",
        description: "",
      },
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
    if (this.state.model.file) {
      this.fileUploadHandler(this.state.model.file, this.state.model.title);
    }
    itala(this.state.entity, this.state.model).then(data => {
      let { models } = this.state;
      models.push(data);
      this.setState({ models: models });
    });
  };

  onUpdate = (model, i) => {
    baguhin(
      this.state.entity,
      model.id || this.state.model.id,
      model || this.state.model
    ).then(data => {
      let { models } = this.state;
      models[model ? i : this.state.activeIndex] = data;
      this.setState({ models: models });
    });
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
  handleSearchReset(key) {
    this.onSearch(key);
  }

  // Callback function
  closeModal = () => {
    this.switchExhibitStatus();
  };
  handleSubmit = model => {
    this.setState({ model });
    this.state.newModel ? this.onSave() : this.onUpdate();
    this.switchExhibitStatus();
  };

  onAttchment = attachment => {
    this.setState({
      file_name: attachment,
      exhibitAttachment: !this.state.exhibitAttachment,
    });
  };

  onClose = () => {
    this.setState({ exhibitAttachment: !this.state.exhibitAttachment });
  };
  onSubmitted = i => {
    let model = this.state.models[i];
    model.status = "submitted";
    model.submitted_at = moment().format("MM/d/Y");
    this.onUpdate(model, i);
  };
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const writer = this.state.models.map((model, index) => {
      const { id, title, category, status, submitted_at, url, code } = model;
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td className="text-capitalize">{title}</td>
          <td className="text-capitalize">{category}</td>
          <td className="text-capitalize">{code}</td>
          <td className="text-capitalize">
            <b className={getBadge(status)}>{status}</b>
          </td>
          <td>{submitted_at}</td>
          <td>
            <ButtonGroup>
              <Popover content="View" placement="left">
                <Button
                  className="btn btn-outline-success"
                  onClick={this.onSubmitted.bind(this, index)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              </Popover>
              <Popover content="View" placement="left">
                <Button
                  className="btn btn-outline-info"
                  onClick={this.onAttchment.bind(this, url)}
                >
                  <FontAwesomeIcon icon={faFile} />
                </Button>
              </Popover>
              {/* {status === "denied"} */}
              <Popover content="Issue">
                <Button
                  className="btn btn-outline-danger"
                  onClick={this.onExhibit.bind(this, index)}
                >
                  <FontAwesomeIcon icon={faExclamation} />
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
              <h1>Daily Lesson Log</h1>
            </Col>
            <Col md={1} sm={12} xs={24} style={colStyle}>
              <ButtonGroup>
                <Popover content="Add a Lesson plan">
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
                <th>Category</th>
                <th>Code</th>
                <th>Status</th>
                {this.props.hasPublish ? (
                  <th>Published</th>
                ) : (
                  <th>Processed</th>
                )}
                <th>Processed</th>
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
        />

        <Attachment
          email={this.auth.email}
          exhibit={this.state.exhibitAttachment}
          file_name={this.state.file_name}
          onClose={this.onClose}
        />
      </LayoutContentWrapper>
    );
  }
}
