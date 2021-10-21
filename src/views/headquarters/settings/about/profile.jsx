import { faEye, faUpload } from "@fortawesome/free-solid-svg-icons"; // faGraduationCap,
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Popover, Row } from "antd";
import axios from "axios";
import React, { Component } from "react";
import Box from "../../../../components/utility/box";
import LayoutContentWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import basicStyle from "../../../../config/basicStyle";
import { baguhin, hanapin } from "../../../../talaan"; //  itala, tanong
import "./index.css";
// import logo from '../../../../components/utility/logo';

export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.url = localStorage.getItem("url");
    console.log(this.url);
    this.state = {
      form: {},
      entity: "schools/details",
      model: {},
      font: undefined,
      icon: undefined,
      logo: undefined,
    };
  }

  async componentDidMount() {
    await hanapin(this.state.entity).then((data) => {
      this.setState({ model: data });
    });
  }

  fileUploadHandler = async (val, name) => {
    const files = val.target.files[0];
    let { model } = this.state;
    model[name] = `${name}.${files.name.split(".").pop()}`;
    this.setState({ model });
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      let { form } = this.state;
      form.file_base64 = reader.result;
      form.ext = files.name.split(".").pop();
      form.name = name;
      form.url = this.url;
      this.setState({ form });
      axios.post(
        `api/${this.state.entity}/upload`,
        this.state.form,
        {
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
            );
          },
        }
      );
    };
  };
  onImageChange = (event, state_name) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        [state_name]: URL.createObjectURL(event.target.files[0]),
      });
    }
    this.fileUploadHandler(event, state_name);
  };

  onUpdate = () => {
    baguhin(this.state.entity, this.state.model).then(
      (data) => {
        let { model } = this.state;
        model = data;
        this.setState({ model });
      }
    );
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    console.log(this.state.model);
    return (
      <LayoutContentWrapper>
        <PageHeader>Profile</PageHeader>
        <Row style={rowStyle} justify="start">
          <Col offset={2} span={18} style={colStyle}>
            <Box>
              <Row>
                <Col offset={2} span={4} style={colStyle}>
                  <div className="hoverImage">
                    <img
                      id="target"
                      className="imageHover"
                      alt="first-logo"
                      width="auto"
                      height="150"
                      src={
                        this.state.logo ||
                        axios.defaults.baseURL +
                        `storage/school/${this.url}/${this.state.model.logo}`
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "http://localhost:8000/storage/default.jpg";
                      }}
                    />
                    <div className="middleButton">
                      <Popover content="Upload First logo/image">
                        <label htmlFor="first-logo" className="btn btn-primary">
                          <FontAwesomeIcon icon={faUpload} />
                        </label>
                        <input
                          className="d-none"
                          onChange={(e) => {
                            this.onImageChange(e, "logo");
                          }}
                          type="file"
                          accept="image/x-png,image/gif,image/jpeg"
                          id="first-logo"
                        />
                      </Popover>
                    </div>
                  </div>
                </Col>
                <Col
                  offset={1}
                  className="text-center"
                  span={10}
                  style={colStyle}
                >
                  <label
                    style={{ fontSize: this.state.font }}
                    className="school-name"
                  >
                    {this.state.model.name}
                  </label>
                  <label>{this.state.model.tagline}</label>
                  <label>{this.state.model.address}</label>
                  <label>{this.state.model.phone}</label>
                </Col>
                <Col offset={1} span={4} style={colStyle}>
                  <div className="hoverImage">
                    <img
                      id="target"
                      className="imageHover"
                      alt="second-logo"
                      width="auto"
                      height="150"
                      src={
                        this.state.icon ||
                        axios.defaults.baseURL +
                        `storage/school/${this.url}/${this.state.model.icon}`
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "http://localhost:8000/storage/default.jpg";
                      }}
                    />
                    <div className="middleButton">
                      <Popover content="Upload Second logo/image">
                        <label
                          htmlFor="second-logo"
                          className="btn btn-primary"
                        >
                          <FontAwesomeIcon icon={faUpload} />
                        </label>
                        <input
                          className="d-none"
                          onChange={(e) => {
                            this.onImageChange(e, "icon");
                          }}
                          type="file"
                          accept="image/x-png,image/gif,image/jpeg"
                          id="second-logo"
                        />
                      </Popover>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={rowStyle} justify="start">
                <Col span={12}></Col>
              </Row>
              <Row style={rowStyle} justify="start">
                <Col className="text-center" span={12}>
                  <FontAwesomeIcon style={{ fontSize: 200 }} icon={faEye} />
                </Col>
                <Col span={12}>
                  <textarea
                    onChange={(e) => {
                      let { model } = this.state;
                      model.vision = e.target.value;
                      this.setState({ model });
                    }}
                    defaultValue={this.state.model.vision}
                    className="editable-text school-mission"
                  />
                </Col>
              </Row>
            </Box>
          </Col>
        </Row>
      </LayoutContentWrapper>
    );
  }
}
