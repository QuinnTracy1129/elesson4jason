import React, { Component } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { tanong, itala } from "../../../../talaan";

import Create from "./create";
import Content from "./content";

export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.state = {
      entity: "newsfeeds",
      url: localStorage.getItem("url"),
      announcements: [],
      batch_id: this.auth.batch_id,
    };
  }

  UNSAFE_componentWillMount = () => {
    tanong(this.state.entity, { batch: this.auth.batch_id }).then((data) => {
      this.setState({ announcements: [...data] });
    });
  };

  handleSubmit = (model) => {
    let { announcements, batch_id } = this.state;
    model["batch_id"] = batch_id;
    announcements.unshift(model);
    this.setState({ announcements });
    itala(this.state.entity, model);
  };

  render() {
    return (
      <MDBRow>
        <MDBCol size="9">
          <MDBRow>
            <MDBCol size="10" className="mx-auto mb-3">
              <Create onSubmit={this.handleSubmit} />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <Content datas={this.state.announcements} />
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol size="3" className="bg-secondary"></MDBCol>
      </MDBRow>
    );
  }
}
