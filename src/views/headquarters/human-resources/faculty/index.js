import "@fortawesome/fontawesome-free/css/all.min.css";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
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
import Card from "./card";

export default class extends Component {
  constructor() {
    super();
    // const auth = JSON.parse(localStorage.getItem('auth'));
    this.state = {
      url: `Users/faculty`,
      entity: "users",
      models: [],
      model: undefined,
      exhibit: false,
      activeIndex: 0,
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
    tanong(this.state.url, this.key.value).then((data) => {
      this.setState({ models: [...data] }, () => console.log("starts here"));
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
        id: undefined,
        name: undefined,
        display_name: undefined,
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
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const writer = this.state.models.map((model, index) => {
      const { id, empNum, fullname, position, status } = model;
      return (
        <tr key={id}>
          <td className="text-capitalize">{index + 1}</td>
          <td className="text-capitalize">{empNum}</td>
          <td className="text-capitalize">{fullname}</td>
          <td className="text-capitalize">{position}</td>
          <td className="text-capitalize">{status}</td>
          <td>
            <ButtonGroup>
              <Popover content="View" placement="left">
                <Button
                  className="btn btn-outline-success"
                  onClick={this.onExhibit.bind(this, index)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </Popover>
              <Popover content="Delete" placement="right">
                <Button
                  className="btn btn-outline-danger"
                  onClick={this.onDelete.bind(this, index, id)}
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
              <h1>Faculty Members</h1>
            </Col>
          </Row>
          <MDBTable striped hover responsive>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>Emp. Num.</th>
                <th>Name</th>
                <th>Position</th>
                <th>Status</th>
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
      </LayoutContentWrapper>
    );
  }
}
