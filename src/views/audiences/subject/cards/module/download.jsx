import React, { Component } from "react";
import Popover from "../../../../../components/uielements/popover";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { baguhin } from "../../../../../talaan";

export default class extends Component {
  addDownload = () => {
    baguhin("tracking/documents", this.props.document_id, {
      downloads: this.props.downloads + 1,
    });
  };
  render() {
    let date = new Date(this.props.created_at);
    let day = date.getDate();
    let week = date.toLocaleString("default", { weekday: "short" });
    let month = date.toLocaleString("default", { month: "short" });
    let year = date.getFullYear();
    return (
      <Popover content="Download" placement="top">
        <a
          onClick={this.addDownload}
          href={`${axios.defaults.baseURL}api/auth/download?url=files/${this.props.departmentname}/${this.props.email}/${month}-${year}/${week}-${day}&filename=${this.props.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-secondary btn-sm ml-0 mr-0"
        >
          <FontAwesomeIcon icon={faDownload} />
        </a>
      </Popover>
    );
  }
}
