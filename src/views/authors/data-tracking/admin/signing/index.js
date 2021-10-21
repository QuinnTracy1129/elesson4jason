import "@fortawesome/fontawesome-free/css/all.min.css";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import "bootstrap-css-only/css/bootstrap.min.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import React, { Component } from "react";
import Button, {
  ButtonGroup,
} from "../../../../../components/uielements/button";
import Popover from "../../../../../components/uielements/popover";
import LayoutContent from "../../../../../components/utility/layoutContent";
import LayoutContentWrapper from "../../../../../components/utility/layoutWrapper";
import basicStyle from "../../../../../config/basicStyle";
import { baguhin, itago, itala, tanong } from "../../../../../talaan";
import Card from "./card";

export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    console.log(this.auth);
    this.state = {
      entity: "tracking/documents",
      models: [],
      model: { name: "", display_name: "" },
      exhibit: false,
      activeIndex: 0,
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
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    let writer = this.state.models.map((model, index) => {
      // let q = model.code.split('-')
      return (
        <tr key={model.id}>
          <td>{index + 1}</td>
          <td>{model.code}</td>
          {/* <td>{q[1].slice(0, -1)}</td> */}
          <td>{model.status}</td>
          <td>{model.status}</td>
          <td>
            <ButtonGroup>
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
              <h1>For Singing</h1>
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
                <th>Code</th>
                <th>Quarter</th>
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
