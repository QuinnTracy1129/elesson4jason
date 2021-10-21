import React, { Component } from "react";
import LayoutContentWrapper from "./../../../../components/utility/layoutWrapper";
import LayoutContent from "./../../../../components/utility/layoutContent";
import { Row, Col } from "antd";
import basicStyle from "./../../../../config/basicStyle";
import Button, {
  ButtonGroup,
} from "./../../../../components/uielements/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Popover from "./../../../../components/uielements/popover";
import * as swal from "sweetalert2";

import { tanong, itala, baguhin, itago } from "./../../../../talaan";
import Card from "./card";

export default class extends Component {
  constructor() {
    super();
    this.classroom = JSON.parse(localStorage.getItem("classroom"));
    this.subjects = JSON.parse(localStorage.getItem("subjects"));
    this.state = {
      url: "registries",
      models: [],
      model: {},
      exhibit: false,
      activeIndex: 0,
      lvl: this.classroom.level_id,
      section: this.classroom.section_id,
      year_level: this.classroom.section.fullname,
    };
    document.getElementById("InputTopbarSearch").style = "display:none";
  }
  componentDidMount() {
    // this.key.addEventListener('keydown', (e) => { if (e.key === 'Enter') { this.onSearch(); this.key.value = ''; } });
    let params = { level: this.state.lvl, section: this.state.section };
    tanong(this.state.url, params).then((data) => {
      this.setState({ models: [...data] });
    });
  }
  // componentWillUnmount() { this.key.removeEventListener('keyup', this.onSearch); }
  onExhibit = (i, id) => {
    swal
      .fire({
        title: "Accept to join.",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      })
      .then((result) => {
        if (result.value) {
          baguhin(this.state.url, id, { status: "approved" });
          let model = this.state.models[i];
          let param = {
            classroom_id: this.classroom.id,
            student_id: model.user_id,
            subjects: this.subjects,
          };
          itala("advisories", param, false).then((data) => {
            let { models } = this.state;
            models[i] = data;
            models.splice(i, 1);
            this.setState({ models });
          });
        }
      });
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, exhibit: false });
    }, 2000);
  };
  decline = (i) => {
    let model = this.state.models[i];
    this.setState({
      model: model,
      newModel: false,
      activeIndex: i,
    });
    this.switchExhibitStatus();
  };
  onUpdate = () => {
    let model = this.state.model;
    baguhin(this.state.url, model.id, model).then((data) => {
      let { models } = this.state;
      models[this.state.activeIndex] = data;
      models.splice(this.state.activeIndex, 1);
      this.setState({ models });
    });
  };
  onDelete = async (i, pk) => {
    let has_removed = await itago(this.state.url, pk);
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
    this.setState({ model });
    this.state.newModel ? this.onSave() : this.onUpdate();
    this.switchExhibitStatus();
  };
  render() {
    let { year_level, section } = this.state;
    const { rowStyle, colStyle, gutter } = basicStyle;
    let writer = this.state.models.map((model, index) => {
      return (
        <tr key={model.id}>
          <td>{index + 1}</td>
          <td>{model.fullname}</td>
          <td>{model.user.age}</td>
          <td>{model.user.gender}</td>
          <td>
            <ButtonGroup>
              <Popover content="Accept">
                <Button
                  className="btn btn-outline-info"
                  onClick={this.onExhibit.bind(this, index, model.id)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              </Popover>
              <Popover content="Decline" placement="right">
                <Button
                  className="btn btn-outline-danger"
                  onClick={this.decline.bind(this, index)}
                >
                  <FontAwesomeIcon icon={faTimes} />
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
              <h1>Request to Join the class</h1>
              <small>
                {year_level} {section}
              </small>
            </Col>
          </Row>
          <MDBTable striped hover responsive>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
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
          user={this.state.user}
        />
      </LayoutContentWrapper>
    );
  }
}
