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
      dep: [],
    };
  }
  SelectChangeHandler = (name, value) => {
    const params = { level: value };
    listahan("sections", params).then((data) =>
      this.setState({ dep: [...data] })
    );
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
    }

<<<<<<< HEAD
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
                {this.state.dep.map((section) => {
                  return (
                    <SelectOption
                      key={`section-${section.id}`}
                      value={section._id}
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
=======
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
                                {this.state.dep.map((section) => {
                                    return (<SelectOption key={`section-${section.id}`} value={section.id}>{section.name}</SelectOption>)
                                })}
                            </Select>
                        </InputGroup>
                    </Col>
                </InputGroup>
            </Modal>
        )
    }
}
>>>>>>> 07877747153a3bae950ac948aae459da36f9e8b2
