import { Col } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Modals from "../../../../components/modal";
import ModalStyle from "../../../../components/modal/modal.style";
import Button from "../../../../components/uielements/button";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup } from "../../../../components/uielements/input";
import Select, { SelectOption } from "../../../../components/uielements/select";
import WithDirection from "../../../../config/withDirection";
import { updateOrCreate } from "../../../../redux/BREAD/actions";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
// const Option = SelectOption;

const Card = ({ model, facultyRef, visible, onClose, updateOrCreate }) => {
  const [loading] = useState(false);
  //   const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState(model);
  const title = model.id ? "Update Department" : "Add Department";
  const btnMsg = model.id ? "Update" : "Submit";

  useEffect(() => {
    setDepartment(model);
    console.log(model);
  }, [model]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const onSubmit = () => {
    updateOrCreate("departments", department);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title={title}
      onOk={this.handleOk}
      onCancel={onClose}
      footer={[
        <Button key="back" size="large" type="danger" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          size="large"
          loading={loading}
          onClick={onSubmit}
        >
          {btnMsg}
        </Button>,
      ]}
    >
      <InputGroup size="large" style={{ marginBottom: "15px" }}>
        <Col span="24">
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "20%" }}
              defaultValue="Name"
              disabled={true}
            />
            <Input
              style={{ width: "80%" }}
              placeholder="Enter the Name of  department"
              name="name"
              value={department.name}
              onChange={handleInputChange}
            />
          </InputGroup>
        </Col>
        <Col span="24">
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "20%" }}
              defaultValue="Acronym"
              disabled={true}
            />
            <Input
              style={{ width: "80%" }}
              placeholder="Enter Acronym"
              name="acronym"
              value={department.acronym}
              onChange={handleInputChange}
            />
          </InputGroup>
        </Col>
        <Col span="24">
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "25%" }}
              defaultValue="Head Teacher"
              disabled={true}
            />
            <Select
              style={{ width: "75%" }}
              defaultValue={"Please select faculty"}
              value={department.head_id}
              name="head_id"
              onChange={(val) => setDepartment({ ...department, head_id: val })}
            >
              {facultyRef}
            </Select>
          </InputGroup>
        </Col>
        <Col span="24">
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "25%" }}
              defaultValue="Master Teacher"
              disabled={true}
            />
            <Select
              style={{ width: "75%" }}
              defaultValue="Please select faculty"
              value={department.master_id}
              onChange={(val) =>
                setDepartment({ ...department, master_id: val })
              }
            >
              {facultyRef}
            </Select>
          </InputGroup>
        </Col>
        <Col span="24">
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "20%" }}
              defaultValue="Category"
              disabled={true}
            />
            <Select
              style={{ width: "80%" }}
              value={department.is_teaching ? "true" : "false"}
              onChange={(val) =>
                setDepartment({
                  ...department,
                  is_teaching: val === "true" ? true : false,
                })
              }
            >
              <SelectOption value="true">Teaching</SelectOption>
              <SelectOption value="false">Non-Teaching</SelectOption>
            </Select>
          </InputGroup>
        </Col>
      </InputGroup>
    </Modal>
  );
};

export default connect(null, { updateOrCreate })(Card);
