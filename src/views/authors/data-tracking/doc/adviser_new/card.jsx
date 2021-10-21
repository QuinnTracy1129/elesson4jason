import React, { Component } from "react";
import { MDBIcon, MDBInput, MDBCol, MDBRow } from "mdbreact";
import Button from "../../../../../components/uielements/button";
import Modals from "../../../../../components/modal";
import ModalStyle from "../../../../../components/modal/modal.style";
import WithDirection from "../../../../../config/withDirection";
import { itala, tanong } from "../../../../../talaan";
import axios from "axios";
import * as swal from "sweetalert2";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

class Card extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.classroom = JSON.parse(localStorage.getItem("classroom"));
    this.state = {
      modal: false,
      data: undefined,
      submit: false,
      department_acronym: undefined,
      form: {
        department_id: this.auth.department_id,
        title: undefined,
        category: "dll",
        filetype: "pdf",
        url: undefined,
        code: undefined,
        status: "pending",
        batch_id: this.auth.batch_id,
        user_id: this.auth.id,
        subject_id: this.classroom ? this.classroom.id : undefined,
      },
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  validate = () => {
    const { form } = this.state;
    let count = 0;
    if (!form.title) {
      count++;
    }
    if (!form.code) {
      count++;
    }
    if (!form.url) {
      count++;
    }
    if (count > 0) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check your data!",
      });
    } else {
      this.onSubmit();
    }
  };

  initialQuery = () => {
    tanong("tracking/documents", {
      rolename: this.auth.rolename,
      status: ["pending", "denied", "submitted"],
      batch: this.auth.batch_id,
      user: this.auth.id,
    }).then((data) => {
      // this.setState({ models: data });
      console.log(data);
      if (data) {
        this.setState({ department_acronym: data[0].departmentname });
      }
    });
  };

  componentDidMount() {
    this.initialQuery();
  }

  onSubmit = () => {
    itala("tracking/documents", this.state.form).then(() => {
      this.toggle();
      if (this.state.form.filetype === "pdf") {
        const { data } = this.state;
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = () => {
          let today = new Date();
          let day = today.getDate();
          let week = today.toLocaleString("default", { weekday: "short" });
          let month = today.toLocaleString("default", { month: "short" });
          let year = today.getFullYear();
          let file = {
            file_base64: reader.result,
            name: data.name,
            url: `files/${this.state.department_acronym}/${this.auth.email}/${month}-${year}/${week}-${day}`,
          };
          axios.post("api/auth/upload", file);
        };
      }
      this.props.onSubmit();
    });
  };

  onCategory = (choice) => {
    let { form } = this.state;
    form.category = choice;
    this.setState({ form });
  };

  onFileType = (choice) => {
    let { form } = this.state;
    form.filetype = choice;
    this.setState({ form });
  };

  render() {
    const { category, filetype } = this.state.form;
    return (
      <span>
        <button
          onClick={this.toggle}
          className="btn btn-outline-secondary rounded"
        >
          <MDBIcon icon="link" />
        </button>
        <Modal
          visible={this.state.modal}
          title="PDF or Google Drive Link"
          onCancel={this.toggle}
          footer={
            <Button
              key="submit"
              type="primary"
              size="large"
              onClick={this.validate}
            >
              Submit
            </Button>
          }
        >
          <MDBRow>
            <MDBCol>
              <button
                onClick={() => this.onCategory("dll")}
                className={
                  category === "dll"
                    ? "btn btn-primary w-100"
                    : "btn btn-outline-primary w-100"
                }
              >
                DLL
              </button>
            </MDBCol>
            <MDBCol>
              <button
                onClick={() => this.onCategory("module")}
                className={
                  category === "module"
                    ? "btn btn-secondary w-100"
                    : "btn btn-outline-secondary w-100"
                }
              >
                MODULE
              </button>
            </MDBCol>
          </MDBRow>
          <MDBInput
            label="Subject"
            onChange={(e) => {
              let { form } = this.state;
              form.title = e.target.value;
              this.setState({ form });
            }}
          />
          <MDBInput
            label="Learning Competency Code"
            onChange={(e) => {
              let { form } = this.state;
              form.code = e.target.value;
              this.setState({ form });
            }}
          />
          <MDBRow>
            <MDBCol>
              <button
                onClick={() => this.onFileType("pdf")}
                className={
                  filetype === "pdf"
                    ? "btn btn-danger w-100"
                    : "btn btn-outline-danger w-100"
                }
              >
                PDF
              </button>
            </MDBCol>
            <MDBCol>
              <button
                onClick={() => this.onFileType("drive")}
                className={
                  filetype === "drive"
                    ? "btn btn-info w-100"
                    : "btn btn-outline-info w-100"
                }
              >
                Google Drive
              </button>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol className={filetype === "drive" ? "d-block" : "d-none"}>
              <MDBInput
                label="Google Drive Link"
                onChange={(e) => {
                  let { form } = this.state;
                  form.url = e.target.value;
                  this.setState({ form });
                }}
              />
            </MDBCol>
            <MDBCol className={filetype === "pdf" ? "d-block mt-2" : "d-none"}>
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={(e) => {
                      let { form, data } = this.state;
                      form.url = e.target.files[0].name;
                      data = e.target.files[0];
                      document.getElementById("pdf-name").innerHTML =
                        e.target.files[0].name;
                      this.setState({ form, data });
                    }}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    <span id="pdf-name">Choose file</span>
                  </label>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </Modal>
      </span>
    );
  }
}

export default Card;
