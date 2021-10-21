import React, { Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBadge } from "mdbreact";
import { ButtonGroup } from "../../../../../../components/uielements/button";
import Popover from "../../../../../../components/uielements/popover";
import { faExclamation, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tanong, baguhin } from "../../../../../../talaan";
import * as Swal from "sweetalert2";
import View from "../../view";
import Denied from "../../denied";
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
    tanong("tracking/head", {
      rolename: this.auth.rolename,
      status: "checked",
      batch: this.auth.batch_id,
    }).then((data) => {
      this.setState({ models: data });
    });
  }
  onDelete = async (index, id, deny) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deny it!",
    }).then(async (result) => {
      if (result.value) {
        const { value: reason } = await Swal.fire({
          input: "textarea",
          inputLabel: "Reason",
          inputPlaceholder: "Type your message here...",
          inputAttributes: {
            "aria-label": "Type your message here",
          },
          showCancelButton: true,
        });

        if (reason) {
          let params, new_deny;

          new_deny = {
            by: this.auth.id,
            reason: reason,
            at: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
          };

          if (deny) {
            deny.push(new_deny);
          } else {
            deny = [new_deny];
          }

          params = {
            denied: deny,
            status: "denied",
          };

          baguhin("tracking/master", id, params).then(() => {
            let { models } = this.state;
            models.splice(index, 1);
            this.setState({ models });
          });
        }
      }
    });
  };
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
          approved_by: this.auth.id,
          approved_at: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
          status: "approved",
        };
        baguhin("tracking/head", id, params).then(() => {
          let { models } = this.state;
          models.splice(index, 1);
          this.setState({ models });
        });
      }
    });
  };
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
    const { models } = this.state;
    const writer =
      models.length > 0 ? (
        models.map((model, index) => {
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
            denied,
            departmentname,
            created_at,
            submission,
            downloads,
          } = model;
          return (
            <tr key={`head-${id}`}>
              <td>{index + 1}</td>
              <td>{title}</td>
              <td className="text-uppercase">{this.getStatus(category)}</td>
              <td>{code}</td>
              <td>{fullname}</td>
              <td>
                {this.getStatus(status)}&nbsp;
                {denied && <Denied models={denied} />}&nbsp;
                {this.getStatus(submission, submitted_at)}
              </td>
              <td>
                <ButtonGroup>
                  <Popover content="Approve" placement="left">
                    <button
                      className="btn btn-outline-success btn-sm mr-0 ml-0"
                      onClick={() => {
                        this.onUpdate(index, id);
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </Popover>
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
                  <Popover content="Issue" placement="right">
                    <button
                      className="btn btn-outline-danger btn-sm ml-0 mr-0"
                      onClick={() => {
                        this.onDelete(index, id, denied);
                      }}
                    >
                      <FontAwesomeIcon icon={faExclamation} />
                    </button>
                  </Popover>
                </ButtonGroup>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan="7" className="text-center">
            <strong className="h4">
              You've finished all your work, well done!
            </strong>
          </td>
        </tr>
      );
    return (
      <MDBTable striped hover responsive>
        <MDBTableHead color="indigo accent-4" textWhite>
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>Category</th>
            <th>Learning Competency Code</th>
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
