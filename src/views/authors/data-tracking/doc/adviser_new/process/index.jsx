import React, { Component } from "react";
import { MDBBadge, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Popover from "../../../../../../components/uielements/popover";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tanong, baguhin, itago } from "../../../../../../talaan";
import * as Swal from "sweetalert2";
import View from "../../view";
import axios from "axios";
import Denied from "../../denied";

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

  initialQuery = () => {
    tanong("tracking/documents", {
      rolename: this.auth.rolename,
      status: ["pending", "denied", "submitted"],
      batch: this.auth.batch_id,
      user: this.auth.id,
    }).then((data) => {
      console.log(data);
      this.setState({ models: data });
    });
  };

  componentDidMount() {
    this.initialQuery();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.didSubmit !== this.props.didSubmit) {
      this.initialQuery();
    }
  }
  onDelete = async (i, pk) => {
    let has_removed = await itago("tracking/documents", pk);
    if (has_removed) {
      let models = this.state.models;
      models.splice(i, 1);
      this.setState({ models });
    }
  };

  handleWordConverter = () => {
    let date = new Date();
    let week = date.toLocaleString("en-us", { weekday: "long" });
    if (week === "Monday") {
      let hours = date
        .toLocaleString("en-us", { hour12: "numberic" })
        .split(" ");
      if (Number(hours[0]) < 7 && hours[1] === "AM") {
        return "early";
      } else if (Number(hours[0]) < 5 && hours[1] === "PM") {
        return "late";
      } else {
        return "on-time";
      }
    } else {
      return "late";
    }
  };

  onUpdate = (index, id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.value) {
        const submission = this.handleWordConverter();
        baguhin("tracking/documents", id, {
          status: "submitted",
          submission: submission,
        }).then(() => {
          let { models } = this.state;
          models[index].status = "submitted";
          this.setState({ models });
          this.initialQuery();
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
  onEdit = async (index, id, filetype, departmentname) => {
    const { value: new_file } = await Swal.fire({
      title: filetype === "drive" ? "Insert new Link" : "Insert new PDF",
      input: filetype === "drive" ? "text" : "file",
    });

    if (new_file) {
      let { models } = this.state;
      if (filetype === "drive") {
        models[index].url = new_file;
        baguhin("tracking/documents", id, { url: new_file });
        this.setState({ models });
      } else {
        if (new_file.type === "application/pdf") {
          models[index].url = new_file.name;
          const reader = new FileReader();
          reader.readAsDataURL(new_file);
          reader.onload = () => {
            let today = new Date();
            let day = today.getDay();
            let week = today.toLocaleString("default", { weekday: "short" });
            let month = today.toLocaleString("default", { month: "short" });
            let year = today.getFullYear();
            let file = {
              file_base64: reader.result,
              name: new_file.name,
              url: `files/${departmentname}/${this.auth.email}/${month}-${year}/${week}-${day}`,
            };
            axios.post("api/auth/upload", file);
            baguhin("tracking/documents", id, { url: new_file.name });
            this.setState({ models });
          };
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please insert a PDF file",
          });
        }
      }
    }
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
            status,
            url,
            filetype,
            interactiveWord,
            submitted_at,
            email,
            denied,
            departmentname,
            created_at,
            submission,
          } = model;
          console.log(model);
          return (
            <tr key={`head-${id}`}>
              <td>{index + 1}</td>
              <td>{title}</td>
              <td className="text-uppercase">{this.getStatus(category)}</td>
              <td>{code}</td>
              <td>
                {status !== "denied" && this.getStatus(status)}&nbsp;
                {denied && <Denied models={denied} />}&nbsp;
                {this.getStatus(submission, submitted_at)}
              </td>
              <td>
                {status === "pending" || status === "denied" ? (
                  <Popover
                    content={status === "denied" ? "Resubmit" : "Submit"}
                    placement="left"
                  >
                    <button
                      className="btn btn-outline-success btn-sm mr-0 ml-0"
                      onClick={() => {
                        this.onUpdate(index, id);
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </Popover>
                ) : null}
                {(status === "pending" || status === "denied") &&
                category !== "iModule" ? (
                  <Popover content="Edit" placement="top">
                    <button
                      className="btn btn-outline-primary btn-sm mr-0 ml-0"
                      onClick={() => {
                        this.onEdit(index, id, filetype, departmentname);
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </Popover>
                ) : null}
                <View
                  created_at={created_at}
                  departmentname={departmentname}
                  title={title}
                  email={email}
                  url={url}
                  filetype={filetype}
                  interactiveWord={interactiveWord}
                />
                <Popover content="Issue" placement="right">
                  <button
                    className="btn btn-outline-danger btn-sm ml-0 mr-0"
                    onClick={() => {
                      this.onDelete(index, id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </Popover>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan="6" className="text-center">
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>{writer}</MDBTableBody>
      </MDBTable>
    );
  }
}
