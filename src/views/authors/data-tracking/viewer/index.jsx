import React, { Component } from "react";
import LayoutContentWrapper from "../../../../components/utility/layoutWrapper";
import LayoutContent from "../../../../components/utility/layoutContent";
import { MDBContainer, MDBIframe, MDBBtnGroup, MDBIcon } from "mdbreact";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      accept: undefined,
      show: "",
    };
  }

  handleCLick = (type) => {
    let { accept } = this.state;
    switch (type) {
      case "pdf":
        accept = ".pdf";
        break;

      case "excel":
        accept = ".xlsx,.xls";
        break;

      case "pp":
        accept = ".ppt, .pptx";
        break;

      case "word":
        accept = ".doc, .docx";
        break;

      default:
        accept = ".txt";
        break;
    }
    this.setState({ accept });
  };

  handleFiles = (file) => {
    if (file) {
      let { show } = this.state;
      show = URL.createObjectURL(file);
      this.setState({ show });
    }
  };

  render() {
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          {/* <button onClick={() => console.log(this.state)}>Log state</button> */}
          <h1>File Viewer</h1>
          <div style={{ display: this.state.show !== "" ? "none" : "block" }}>
            Please choose a file type :
            <MDBBtnGroup>
              <label
                onClick={() => this.handleCLick("pdf")}
                htmlFor="file"
                className="btn btn-danger"
              >
                <MDBIcon icon="file-pdf" /> PDF
              </label>
              <label
                onClick={() => this.handleCLick("word")}
                htmlFor="file"
                className="btn btn-primary"
              >
                <MDBIcon icon="file-word" /> MS WORD
              </label>
              <label
                onClick={() => this.handleCLick("excel")}
                htmlFor="file"
                className="btn btn-success"
              >
                <MDBIcon icon="file-excel" /> MS EXCEL
              </label>
              <label
                onClick={() => this.handleCLick("pp")}
                htmlFor="file"
                className="btn btn-warning"
              >
                <MDBIcon icon="file-powerpoint" /> MS POWERPOINT
              </label>
              <label
                onClick={this.handleCLick}
                htmlFor="file"
                className="btn btn-dark"
              >
                <MDBIcon icon="file-alt" /> TEXT
              </label>
            </MDBBtnGroup>
            <input
              className="d-none"
              id="file"
              type="file"
              accept={this.state.accept}
              onChange={(e) => this.handleFiles(e.target.files[0])}
            />
          </div>
          <div
            className="text-right"
            style={{ display: this.state.show === "" ? "none" : "block" }}
          >
            <button
              className="btn btn-default"
              onClick={() => {
                this.setState({ show: "" });
                document.getElementById("file").value = null;
              }}
            >
              Clear
            </button>
          </div>
          <MDBContainer className="text-center">
            <MDBIframe src={this.state.show} />
          </MDBContainer>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
