import { Col } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Modals from "../../../components/modal";
import ModalStyle from "../../../components/modal/modal.style";
import Button from "../../../components/uielements/button";
import Input, { InputGroup } from "../../../components/uielements/input";
import Select from "../../../components/uielements/select";
import WithDirection from "../../../config/withDirection";
import { edit } from "../../../redux/BREAD/actions";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const Card = ({ model, visible, onClose, edit, users, access }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(model);
  const title = model.id ? "Demote Acount" : "Promote as Superadmin";
  const btnMsg = model.id ? "Update" : "Submit";

  useEffect(() => {
    setUser(model);
  }, [visible, model]);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      this.setLoading(false);
    }, 2000);
  };
  const onSubmit = () => {
    console.log(user);
    // edit('users', user)
    // onClose();
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
      {model.id ? (
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
                placeholder="Select Name"
                disabled={true}
                value={model.fullname}
              />
            </InputGroup>
          </Col>
          <Col span="24">
            <InputGroup compact style={{ marginBottom: "15px" }}>
              <Input
                style={{ width: "20%" }}
                defaultValue="Role"
                disabled={true}
              />
              <Select
                style={{ width: "80%" }}
                placeholder="Select Role"
                defaultValue={
                  model.role_id === "6028f7713e320000f40026be"
                    ? model.role.display_name
                    : ""
                }
                onChange={(e) => setUser({ ...user, role_id: e })}
              >
                {access}
              </Select>
            </InputGroup>
          </Col>
        </InputGroup>
      ) : (
        <Col span="24">
          <InputGroup compact style={{ marginBottom: "15px" }}>
            <Input
              style={{ width: "20%" }}
              defaultValue="User"
              disabled={true}
            />
            <Select
              style={{ width: "80%" }}
              placeholder="Select User"
              value={model.user_id !== "" ? model.user_id : ""}
              onChange={(e) => alert(e)}
            >
              {users}
            </Select>
          </InputGroup>
        </Col>
      )}
    </Modal>
  );
};

export default connect(null, { edit })(Card);
