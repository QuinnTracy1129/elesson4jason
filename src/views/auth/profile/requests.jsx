import React, { Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBadge } from "mdbreact";
import { hanapin } from "../../../talaan";
import * as swal from "sweetalert2";

export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.state = {
      models: [],
    };
  }

  componentDidMount() {
    hanapin("registries", this.auth.id).then((data) => {
      this.setState({ models: [...data] });
    });
  }

  writer = () => {
    let { models } = this.state;

    return models.map((model, index) => {
      let badge;
      switch (model.status) {
        case "denied":
          badge = "danger";
          break;

        case "approved":
          badge = "success";
          break;

        default:
          badge = "primary";
          break;
      }
      return (
        <tr key={`request-${index}`}>
          <td>{index + 1}</td>
          <td>{model.grade_n_section}</td>
          <td>{model.created_at}</td>
          <td>
            <MDBBadge color={badge} className="mb-3 text-uppercase">
              {model.status}
            </MDBBadge>
            {model.issue ? (
              <MDBBadge
                color="info"
                className="ml-2"
                onClick={() => {
                  swal.fire(model.issue);
                }}
              >
                ISSUE
              </MDBBadge>
            ) : null}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <MDBTable striped responsive hover>
        <MDBTableHead color="primary-color" textWhite>
          <tr>
            <th>#</th>
            <th>Year level and Section</th>
            <th>Date requested</th>
            <th>Status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>{this.writer()}</MDBTableBody>
      </MDBTable>
    );
  }
}
