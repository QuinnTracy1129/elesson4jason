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
const Option = SelectOption;
const Modal = WithDirection(isoModal);

const Card = ({ model, visible, onClose, updateOrCreate }) => {
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState(model);
  const title = model.id ? "Update Level" : "Add Level";
  const btnMsg = model.id ? "Update" : "Submit";

  useEffect(() => {
    setLevel(model);
  }, [model]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLevel({ ...level, [name]: value });
  };

  const onSubmit = () => {
    const url = "forbidden/attached/authority/levels";
    updateOrCreate(url, level);
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
      title={title}
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
          {btnMsg}
        </Button>,
      ]}
    >
      <InputGroup size="large" style={{ marginBottom: "15px" }}>
        <Col span="24"></Col>
        <Col span="24">
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "20%" }}
              defaultValue="Stage"
              disabled={true}
            />
            <Select
              value={level.stage}
              style={{ width: "80%" }}
              onChange={(value) => setLevel({ ...level, stage: value })}
            >
              <Option value="jh">Junior High School</Option>
              <Option value="sh">Senior High School</Option>
            </Select>
          </InputGroup>
        </Col>
        <Col span="24">
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "20%" }}
              defaultValue="description"
              disabled={true}
            />
            <Input
              style={{ width: "80%" }}
              placeholder="description"
              value={level.description || ""}
              name="description"
              onChange={handleInputChange}
            />
          </InputGroup>
        </Col>
        <Col span="24">
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "20%" }}
              defaultValue="Level"
              disabled={true}
            />
            <Input
              type="number"
              style={{ width: "80%" }}
              placeholder="Level"
              value={level.yrlvl || ""}
              name="yrlvl"
              onChange={handleInputChange}
            />
          </InputGroup>
        </Col>
      </InputGroup>
    </Modal>
  );
};

export default connect(null, { updateOrCreate })(Card);
