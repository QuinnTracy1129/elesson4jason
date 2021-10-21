import React, { Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBadge } from "mdbreact";
import { tanong } from "../../../../../../talaan";
import Popover from "../../../../../../components/uielements/popover";
import View from "../../view";
import { ButtonGroup } from "../../../../../../components/uielements/button";
import Download from "../../download";

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
      rolename: this.auth.rolename,
      batch: this.auth.batch_id,
    }).then((data) => {
      this.setState({ models: data });
    });
  }
  getStatus = (status, submitted_at) => {
    let color;
    switch (status) {
      case "pending":
        color = "warning";
        break;

      case "checked":
        color = "info";
        break;

      case "approved":
        color = "success";
        break;

      case "noted":
        color = "light";
        break;

      case "iModule":
        color = "black";
        break;

      case "dll":
        color = "primary";
        break;

      case "module":
        color = "secondary";
        break;

      case "submitted":
        color = "default";
        break;

      case "early":
        color = "success";
        return (
          <Popover content={`${new Date(submitted_at)}`} placement="right">
            <MDBBadge
              color={color}
              className="text-uppercase"
              style={{ cursor: "pointer" }}
            >
              {status}
            </MDBBadge>
          </Popover>
        );

      case "on-time":
        color = "info";
        return (
          <Popover content={`${new Date(submitted_at)}`} placement="right">
            <MDBBadge
              color={color}
              className="text-uppercase"
              style={{ cursor: "pointer" }}
            >
              {status}
            </MDBBadge>
          </Popover>
        );

      case "late":
        color = "warning";
        return (
          <Popover content={`${new Date(submitted_at)}`} placement="right">
            <MDBBadge
              color={color}
              className="text-uppercase"
              style={{ cursor: "pointer" }}
            >
              {status}
            </MDBBadge>
          </Popover>
        );

      default:
        color = "default";
        break;
    }
    return (
      <MDBBadge
        color={color}
        className="text-uppercase"
        style={{ cursor: "pointer" }}
      >
        {status}
      </MDBBadge>
    );
  };
  render() {
    const writer = this.state.models.map((model, index) => {
      console.log(model);
      const {
        id,
        title,
        category,
        code,
        fullname,
        url,
        filetype,
        interactiveWord,
        status,
        submitted_at,
        email,
        departmentname,
        created_at,
        submission,
        downloads,
      } = model;
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td>{title}</td>
          <td className="text-uppercase">{this.getStatus(category)}</td>
          <td>{code}</td>
          <td>{fullname}</td>
          <td>
            {this.getStatus(status)}&nbsp;
            {this.getStatus(submission, submitted_at)}
          </td>
          <td>
            <ButtonGroup>
              <View
                created_at={created_at}
                departmentname={departmentname}
                title={title}
                email={email}
                url={url}
                filetype={filetype}
                interactiveWord={interactiveWord}
              />
              {filetype === "pdf" && (
                <Download
                  document_id={id}
                  downloads={downloads}
                  departmentname={departmentname}
                  email={email}
                  created_at={created_at}
                  url={url}
                />
              )}
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>{writer}</MDBTableBody>
      </MDBTable>
    );
  }
}
