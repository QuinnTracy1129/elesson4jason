import "@fortawesome/fontawesome-free/css/all.min.css";
import { faTimes, faUserTag } from "@fortawesome/free-solid-svg-icons";
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
import Default from "../../../../image/defaults/default.png";
import { baguhinOitala, itago, tanong, tignan } from "../../../../talaan";
import Card from "./card";

export default class extends Component {
  constructor() {
    super();
    let authStr = localStorage.getItem("auth");
    this.auth = JSON.parse(authStr);
    this.state = {
      entity: "classrooms",
      models: [],
      model: {
        subjects: [],
      },
      exhibit: false,
      activeIndex: 0,
      levels: [],
      sections: [],
      rooms: [],
      newModel: false,
    };
    this.selectedIndex = 0;
    this.key = document.getElementById("InputTopbarSearch");
    this.key.style = "display:block";
  }
  async componentDidMount() {
    this.onSearch();
    // await tanong("rooms/levels").then((data) => {
    //   const levels = data.map((model) => (
    //     <Option value={model.level_id}>{model.level.fullname}</Option>
    //   ));
    //   // console.log(levels);
    //   this.setState({ rooms: [...data], levels: levels });
    // });
    // sections
    await tanong("sections").then((data) =>
      this.setState({ sections: [...data] })
    );
    this.key.addEventListener("keyup", this.onSearch);
  }
  componentWillUnmount() {
    this.key.removeEventListener("keyup", this.onSearch);
  }

  newExhibit = () => {
    this.setState({
      model: {},
      newModel: true,
    });
    this.switchExhibitStatus();
  };

  onSearch = () => {
    let params = {};
    if (this.key.value) {
      let p = this.key.value.split(",");
      if (p.length > 1) {
        console.log(this.key.value);
        params["lname"] = p[0].trim();
        params["key"] = p[1].trim();
      } else {
        params["key"] = this.key.value;
      }
    }
    tanong("faculties/list", params).then((data) => {
      this.setState({ models: [...data] });
    });
    // tanong('users/designation').then(data => {
    //     data.map(user => {
    //         let models = this.state.models
    //         models.push(user)
    //         this.setState({ models: [...models] })

    //     })
    // })
  };
  onExhibit = (i) => {
    this.selectedIndex = i;
    let model = this.state.models[i].appointed;
    if (!model) {
      model = {
        batch_id: this.auth.batch_id,
        faculty_id: this.state.models[i].id,
        user_id: this.auth.id,
        position: undefined,
        level_id: undefined,
        section_id: undefined,
        subjects: [],
        room: undefined,
      };
    }
    this.setState({
      model: model,
      newModel: false,
      activeIndex: i,
    });
    this.switchExhibitStatus();
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, exhibit: false });
    }, 2000);
  };
  baguhinOitala = async () => {
    await tignan("subjects", { level: this.state.model.level_id }).then(
      (data) => {
        let { model } = this.state;
        model.subjects = data;
        this.setState({ model });
      }
    );
    await baguhinOitala(this.state.entity, this.state.model).then(
      (response) => {
        console.log(response);
        let { models } = this.state;
        let model = models[this.selectedIndex];
        model["appointed"] = response.data;
        models[this.selectedIndex] = model;
        this.setState({ models });
        console.log(this.state.models);
      }
    );
  };
  switchExhibitStatus() {
    this.setState({ exhibit: !this.state.exhibit });
  }
  handleSearchReset = (key) => this.onSearch(key);
  // onSave = () => {
  //     itala(this.state.entity, this.state.model)
  //         .then(
  //             data => {
  //                 let { models } = this.state;
  //                 models.push(data);
  //                 this.setState({ models: models });
  //             });
  // }
  handlesUntag = async (i) => {
    let { models } = this.state;
    const pk = models[i].appointed.id;
    let has_removed = await itago(this.state.entity, pk);
    if (has_removed) {
      models[i].appointed = undefined;
      this.setState({ models });
    }
  };
  // Callback function
  closeModal = () => this.switchExhibitStatus();
  handleSubmit = (model) => {
    this.setState({ model });
    this.baguhinOitala();
    // this.state.newModel ? this.onSave() : this.baguhinOitala();
    this.switchExhibitStatus();
  };
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    let writer = this.state.models.map((model, index) => {
      return (
        <tr key={model.id}>
          <td>{index + 1}</td>
          <td>
            <img
              width="50"
              height="auto"
              alt={model.fullname}
              src={`${model.profile}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = Default;
              }}
            />
          </td>
          <td>{model.fullname}</td>
          <td>{model.is_male ? "Male" : "Female"}</td>
          <td>{model.ern}</td>
          <td className="text-capitalize">
            {model.appointed && model.appointed.position}
          </td>
          <td className="text-capitalize">
            {model.appointed && model.appointed.levelname}
          </td>
          <td className="text-capitalize">
            {model.appointed && model.appointed.sectionname}
          </td>
          <td className="text-capitalize">
            {model.appointed && model.appointed.room}
          </td>
          <td>
            <ButtonGroup>
              {model.appointed ? (
                <Popover content="Untag">
                  <Button
                    className="btn btn-outline-danger"
                    onClick={this.handlesUntag.bind(this, index)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </Popover>
              ) : (
                <Popover content="Tag">
                  <Button
                    className="btn btn-outline-info"
                    onClick={this.onExhibit.bind(this, index)}
                  >
                    <FontAwesomeIcon icon={faUserTag} />
                  </Button>
                </Popover>
              )}
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
              <h2>Employee's Ledger</h2>
            </Col>
          </Row>
          <MDBTable striped hover responsive>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Adviser</th>
                <th>Gender</th>
                <th>Employee Registered Number</th>
                <th>Position</th>
                <th>Level</th>
                <th>Section</th>
                <th>Room</th>
                <th>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>{writer}</MDBTableBody>
          </MDBTable>
        </LayoutContent>
        <Card
          model={this.state.model}
          levels={this.state.levels}
          sections={this.state.sections}
          rooms={this.state.rooms}
          newModel={this.state.newModel}
          exhibit={this.state.exhibit}
          onClose={this.closeModal}
          onSubmit={this.handleSubmit}
        />
      </LayoutContentWrapper>
    );
  }
}
