import React, { Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Button, { ButtonGroup } from "../../../../components/uielements/button";
import Popover from "../../../../components/uielements/popover";
import {
  faExclamation,
  faCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tanong, baguhin } from "../../../../talaan";
import * as Swal from "sweetalert2";
import View from "../view";

export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.key = document.getElementById("InputTopbarSearch").style =
      "display:none";
    this.state = {
      models: [],
    };
  }
  componentDidMount() {
    tanong("tracking/documents/submitted", {
      department: this.auth.department_id,
    }).then((data) => {
      this.setState({ models: data });
    });
  }
  onUpdate = (index, id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.value) {
        let params = {
          check_by: this.auth.id,
          check_at: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
        };
        baguhin("tracking/documents", id, params).then((data) => {
          let { models } = this.state;
          models[index] = data;
          this.setState({ models });
        });
      }
    });
  };
  render() {
    const writer = this.state.models.map((model, index) => {
      const { id, title, category, code, fullname, url } = model;
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td>{title}</td>
          <td className="text-uppercase">{category}</td>
          <td>{code}</td>
          <td>{fullname}</td>
          <td>
            <ButtonGroup>
              <Popover content="Approve" placement="left">
                <Button
                  className="btn btn-outline-success"
                  onClick={() => {
                    this.onUpdate(index, id);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              </Popover>
              <View title={title} email={this.auth.email} url={url} />
              <Popover content="Issue" placement="right">
                <Button className="btn btn-outline-danger">
                  <FontAwesomeIcon icon={faExclamation} />
                </Button>
              </Popover>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
    return (
      <MDBTable striped hover responsive>
        <MDBTableHead color="indigo accent-4" textWhite>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Code</th>
            <th>Submitted by</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>{writer}</MDBTableBody>
      </MDBTable>
    );
  }
}
