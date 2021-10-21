import { Col } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Modals from "../../../components/modal";
import ModalStyle from "../../../components/modal/modal.style";
import Button from "../../../components/uielements/button";
import Input, { InputGroup } from "../../../components/uielements/input";
import Select, { SelectOption } from "../../../components/uielements/select";
import WithDirection from "../../../config/withDirection";
import { add, edit } from "../../../redux/BREAD/actions";
const Option = SelectOption;

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const dummy = {
  name: "",
  role: "visitor",
};

const Card = ({
  model,
  isNew = true,
  visible,
  onClose,
  add,
  edit,
  roles = [],
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(dummy);

  useEffect(() => {
    console.log(roles);
    setUser(isNew ? dummy : model);
  }, [visible, isNew, model]);

  const onSubmit = () => {
    const url = "users";
    isNew ? add(url, user) : edit(url, user);
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
      title={isNew ? "Add Users" : "Update Users"}
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
        <Col span={24}>
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "20%" }}
              defaultValue="Name"
              disabled={true}
            />
            <Input
              style={{ width: "80%" }}
              disabled={true}
              value={model.fullname}
              onChange={(e) => {
                let { model } = this.state;
                model.name = e.target.value;
                this.setState({ model });
              }}
            />
          </InputGroup>
        </Col>
        <Col span={24}>
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "20%" }}
              defaultValue="Role"
              disabled={true}
            />
            <Select
              style={{ width: "80%" }}
              placeholder="Select Role"
              defaultValue={model.rolename}
              onChange={(value) => setUser({ ...user, role_id: value })}
            >
              {roles.map((role) => (
                <Option key={`role-${role.id}`} value={role.id}>
                  {role.display_name}
                </Option>
              ))}
            </Select>
          </InputGroup>
        </Col>
      </InputGroup>
    </Modal>
  );
};

export default connect(null, { add, edit })(Card);
