import React, { useEffect, useState } from "react";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup } from "../../../../components/uielements/input";
import { connect } from "react-redux";
import Modals from "../../../../components/modal";
import ModalStyle from "../../../../components/modal/modal.style";
import WithDirection from "../../../../config/withDirection";
import Button from "../../../../components/uielements/button";
import { Col } from "antd";
import Select, { SelectOption } from "../../../../components/uielements/select";
import { add, edit } from "../../../../redux/BREAD/actions";

const isoModal = ModalStyle(Modals);
const Option = SelectOption;
const Modal = WithDirection(isoModal);

const dummy = {
  SY: "",
  semester: "",
};
const Card = ({ model, isNew = true, visible, onClose, add, edit }) => {
  const [loading, setLoading] = useState(false);
  const [batch, setBatch] = useState(dummy);

  useEffect(() => {
    setBatch(isNew ? dummy : model);
  }, [visible, isNew, model]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBatch({ ...batch, [name]: value });
  };

  const onSubmit = () => {
    const url = "batches";
    isNew ? add(url, batch) : edit(url, batch);
    onClose();
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      this.setLoading(false);
    }, 2000);
  };

  return (
    <Modal
      visible={visible}
      title={isNew ? "Add Batch" : "Update Batch"}
      onOk={handleOk}
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
          {isNew ? "Submit" : "Update"}
        </Button>,
      ]}
    >
      <InputGroup size="large" style={{ marginBottom: "15px" }}>
        <Col span="24">
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "27%" }}
              defaultValue="FROM"
              disabled={true}
            />
            <Input
              style={{ width: "73%" }}
              placeholder="School Year"
              value={batch.SY}
              name="SY"
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "27%" }}
              defaultValue="Semester"
              disabled={true}
            />
            <Select
              style={{ width: "73%" }}
              value={batch.semester || ""}
              name="semester"
              onChange={(value) => setBatch({ ...batch, semester: value })}
            >
              <Option value="1">First Semester</Option>
              <Option value="2">Second Semester</Option>
              <Option value="3">Third Semester</Option>
            </Select>
          </InputGroup>
        </Col>
      </InputGroup>
    </Modal>
  );
};

export default connect(null, { add, edit })(Card);
