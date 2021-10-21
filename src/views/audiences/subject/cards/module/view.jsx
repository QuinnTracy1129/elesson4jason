import React, { Component } from "react";
import ModalStyle from "../../../../../containers/Feedback/Modal/modal.style";
import Modals from "../../../../../components/feedback/modal";
import Popover from "../../../../../components/uielements/popover";
import WithDirection from "../../../../../config/withDirection";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { MDBIframe, MDBCol, MDBRow } from "mdbreact";
const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class extends Component {
  state = { visible: false };

  toggle = () => this.setState({ visible: !this.state.visible });

  render() {
    let url;
    switch (this.props.filetype) {
      case "drive":
        url = <MDBIframe src={this.props.url} />;
        break;

      case "pdf":
        let date = new Date(this.props.created_at);
        let day = date.getDate();
        let week = date.toLocaleString("default", { weekday: "short" });
        let month = date.toLocaleString("default", { month: "short" });
        let year = date.getFullYear();
        url = (
          <MDBIframe
            src={`${axios.defaults.baseURL}storage/files/${this.props.departmentname}/${this.props.email}/${month}-${year}/${week}-${day}/${this.props.url}`}
          />
        );
        break;

      default:
        let body = this.props.url.map((data, index) => {
          switch (data.action) {
            case "header":
              return (
                <MDBCol
                  key={`module-${index}`}
                  size="12"
                  className="mx-auto mb-2 h4 text-left text-uppercase"
                >
                  {data.value}
                </MDBCol>
              );

            case "multiplechoice":
              return (
                <MDBCol
                  key={`module-${index}`}
                  size="12"
                  className="mx-auto mb-2 h5 text-justify lead"
                >
                  <div className="container">
                    <span className="ml-3">{data.value[0]}</span>
                    <div className="row">
                      {data.value[1].map((data, index) => {
                        let option;
                        switch (index) {
                          case 0:
                            option = "A";
                            break;
                          case 1:
                            option = "B";
                            break;
                          case 2:
                            option = "C";
                            break;
                          case 3:
                            option = "D";
                            break;

                          default:
                            option = "ERROR";
                            break;
                        }
                        return (
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-2 text-right">
                                <strong>{option}</strong>
                              </div>
                              <div className="col-md-10">{data}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </MDBCol>
              );

            case "paragraph":
              let paragraph;
              if (this.props.interactiveWord) {
                const iWords = Object.keys(this.props.interactiveWord);
                paragraph = data.value.split(" ").map((word) => {
                  if (iWords.includes(word.toLowerCase())) {
                    let meaning =
                      this.props.interactiveWord[word.toLowerCase()];
                    if (meaning.slice(0, 6) === "Users/") {
                      meaning = (
                        <img
                          src={`${axios.defaults.baseURL}storage/${meaning}`}
                          height="500px"
                          width="auto"
                          alt="meaning of word"
                        />
                      );
                    }
                    return (
                      <Popover key={`pop-${index}`} content={meaning}>
                        <strong style={{ cursor: "pointer" }}>
                          {word}&nbsp;
                        </strong>
                      </Popover>
                    );
                  }
                  return `${word} `;
                });
              } else {
                paragraph = data.value;
              }

              return (
                <MDBCol
                  key={`module-${index}`}
                  size="12"
                  style={{ textIndent: 50, fontSize: 25 }}
                  className="mx-auto mb-3 text-justify lead"
                >
                  {paragraph}
                </MDBCol>
              );

            case "image":
              return (
                <MDBCol
                  key={`module-${index}`}
                  size="12"
                  className="mx-auto mb-2 mx-auto text-center"
                >
                  <img
                    src={`${axios.defaults.baseURL}storage/${data.value}`}
                    width="auto"
                    height="200"
                    onMouseOver={(e) => {
                      e.target.height = "500";
                    }}
                    onMouseOut={(e) => {
                      e.target.height = "200";
                    }}
                    alt="module-sample"
                    style={{ transition: "height 1s" }}
                  />
                </MDBCol>
              );

            case "trueorfalse":
              return (
                <MDBCol
                  key={`module-${index}`}
                  size="11"
                  style={{ textIndent: 50 }}
                  className="mx-auto mb-2 h5 text-justify lead"
                >
                  __________:&nbsp;{data.value}
                </MDBCol>
              );

            case "footer":
              return (
                <MDBCol
                  key={`module-${index}`}
                  size="12"
                  className="mx-auto mb-2 h5 text-center font-italic"
                >
                  {data.value}
                </MDBCol>
              );

            default:
              return (
                <MDBCol
                  key={`module-${index}`}
                  size="12"
                  className="mx-auto mb-2 h5 text-justify lead"
                >
                  {data.value}
                </MDBCol>
              );
          }
        });
        url = <MDBRow className="mr-5 ml-5">{body}</MDBRow>;
        break;
    }
    return (
      <Popover content="View" placement="top">
        <button
          className="btn btn-outline-info btn-sm ml-0 mr-0"
          onClick={this.toggle}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
        <Modal
          width="80%"
          visible={this.state.visible}
          title={this.props.title}
          onCancel={this.toggle}
          footer={null}
        >
          {url}
        </Modal>
      </Popover>
    );
  }
}
