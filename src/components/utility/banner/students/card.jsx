import React, { Component } from "react";
import Input, { InputGroup } from "../../../../components/uielements/input";
import Modals from "../../../../components/modal";
import ModalStyle from "../../../../components/modal/modal.style";
import WithDirection from "../../../../config/withDirection";
import Button from "../../../../components/uielements/button";
import Select, { SelectOption } from "../../../../components/uielements/select";
import { Col } from "antd";

import { listahan } from "../../../../talaan";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: "",
      loading: false,
      sections: [],
    };
  }
  SelectChangeHandler = (name, value) => {
    let { model } = this.state;
    model[name] = value;
    if (name === "level_id") {
      const params = { level: value };
      listahan("sections", params).then((data) =>
        this.setState({ sections: [...data] })
      );
    }
<<<<<<< HEAD
    this.setState({ model });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClose = () => this.props.onClose();
  onSubmit = (e) => {
    e.preventDefault();
    let model = this.state.model;
    this.props.onSubmit(model);
  };
  //
  render() {
    // eslint-disable-next-line
    if (this.props.exhibit) {
      this.state.model = this.props.model;
=======
    //  
    render() {
        // eslint-disable-next-line
        if (this.props.exhibit) { this.state.model = this.props.model }

        return (
            <Modal
                visible={this.props.exhibit}
                title="Make a request"
                onOk={this.handleOk}
                onCancel={this.handleClose}
                footer={[
                    <Button key="back" size="large" type="danger" onClick={this.handleClose}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        loading={this.state.loading}
                        onClick={this.onSubmit}
                    >Submit</Button>,
                ]}
            >
                <InputGroup size="large" style={{ marginBottom: '15px' }}>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Year Level"
                                disabled={true}
                            />
                            <Select
                                value={this.state.model.level_id || 'Year Level'}
                                style={{ width: "80%" }}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.level_id = e
                                    this.SelectChangeHandler('level_id', model.level_id)
                                    this.setState({ model });
                                }}

                            >
                                {this.props.year_level}
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Section"
                                disabled={true}
                            />
                            <Select
                                value={this.state.model.section_id || 'Section'}
                                style={{ width: "80%" }}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.section_id = e
                                    this.setState({ model });
                                }}

                            >
                                {this.state.sections.map((section) => {
                                    return (<SelectOption key={`section-${section.id}`} value={section.id}>{section.name}</SelectOption>)
                                })}
                            </Select>
                        </InputGroup>
                    </Col>
                </InputGroup>
            </Modal>
        )
>>>>>>> 07877747153a3bae950ac948aae459da36f9e8b2
    }

    return (
      <Modal
        visible={this.props.exhibit}
        title="Make a request"
        onOk={this.handleOk}
        onCancel={this.handleClose}
        footer={[
          <Button
            key="back"
            size="large"
            type="danger"
            onClick={this.handleClose}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={this.state.loading}
            onClick={this.onSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <InputGroup size="large" style={{ marginBottom: "15px" }}>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Year Level"
                disabled={true}
              />
              <Select
                value={this.state.model.level_id || "Year Level"}
                style={{ width: "80%" }}
                onChange={(e) => {
                  let { model } = this.state;
                  model.level_id = e;
                  this.SelectChangeHandler("level_id", model.level_id);
                  this.setState({ model });
                }}
              >
                {this.props.year_level}
              </Select>
            </InputGroup>
          </Col>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Section"
                disabled={true}
              />
              <Select
                value={this.state.model.section_id || "Section"}
                style={{ width: "80%" }}
                onChange={(e) => {
                  let { model } = this.state;
                  model.section_id = e;
                  this.setState({ model });
                }}
              >
                {this.state.sections.map((section) => {
                  return (
                    <SelectOption
                      key={`section-${section.id}`}
                      value={section_id}
                    >
                      {section.name}
                    </SelectOption>
                  );
                })}
              </Select>
            </InputGroup>
          </Col>
        </InputGroup>
      </Modal>
    );
  }
}
