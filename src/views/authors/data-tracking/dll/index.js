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
const getBadge = (status) => {
  switch (status) {
    case "denied":
      return "bg-danger text-white rounded";
    case "pending":
      return "bg-warning text-dark rounded";
    case "approve":
      return "bg-success text-white rounded";
    default:
      return "bg-light text-dark rounded";
  }
};
export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.state = {
      entity: "tracking/dlls",
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
    this.onSearch();
    this.key.addEventListener("keydown", (e) => {
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
      user: this.auth.id,
    }).then((data) => {
      this.setState({ models: [...data] }, () => console.log("starts here"));
    });
  };
  onExhibit = (i) => {
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
  newExhibit = () => {
    this.setState({
      model: {
        department_id: this.auth.department_id,
        user_id: this.auth.id,
        batch_id: this.auth.batch_id,
        status: "pending",
        title: undefined,
        discription: undefined,
        file_type: "drive",
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

  fileUploadHandler = async (file, name) => {
    const files = file;
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      let { form } = this.state;
      form.file_base64 = reader.result;
      form.name = `${name}.${file.name.split(".").pop()}`;
      form.url = `Users/${this.auth.email}/dll`;
      this.setState({ form });
      axios.post("api/auth/upload", this.state.form, {
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

  onSave = () => {
    if (this.state.model.file) {
      this.fileUploadHandler(this.state.model.file, this.state.model.title);
    }
    itala(this.state.entity, this.state.model).then((data) => {
      let { models } = this.state;
      models.push(data);
      this.setState({ models: models });
    });
  };

  onUpdate = () => {
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
  handleSearchReset(key) {
    this.onSearch(key);
  }

  // Callback function
  closeModal = () => {
    this.switchExhibitStatus();
  };
  handleSubmit = (model) => {
    this.setState({ model });
    this.state.newModel ? this.onSave() : this.onUpdate();
    this.switchExhibitStatus();
  };

  onAttchment = (attachment) => {
    this.setState({
      file_name: attachment,
      exhibitAttachment: !this.state.exhibitAttachment,
    });
  };

  onClose = () => {
    this.setState({ exhibitAttachment: !this.state.exhibitAttachment });
  };
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const writer = this.state.models.map((model, index) => {
      const { id, title, description, status, created_at, file_name } = model;
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td className="text-capitalize">{title}</td>
          <td className="text-capitalize">{description}</td>
          <td className="text-capitalize">
            <b className={getBadge(status)}>{status}</b>
          </td>
          <td>{created_at}</td>
          <td>
            <ButtonGroup>
              <Popover content="View" placement="left">
                <Button
                  className="btn btn-outline-success"
                  onClick={this.onAttchment.bind(this, file_name)}
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
                <th>Description</th>
                <th>Status</th>
                <th>Posted at</th>
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
