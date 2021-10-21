// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modals from '../../../components/modal';
import ModalStyle from '../../../components/modal/modal.style';
import Button from '../../../components/uielements/button';
import Input, { InputGroup } from '../../../components/uielements/input';
import WithDirection from '../../../config/withDirection';
import { updateOrCreate } from "../../../redux/BREAD/actions";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const Card = ({ model, visible, onClose, updateOrCreate }) => {
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState(model)
    const title = model.id ? "Update Role" : "Add Role";
    const btnMsg = model.id ? "Update" : "Submit";

    useEffect(() => {
        setRole(model)
    }, [visible, model])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRole({ ...role, [name]: value })
    }

    const onSubmit = () => {
        updateOrCreate('forbidden/attached/authority/roles', role)
        onClose();
    }
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => { this.setLoading(false); }, 2000);
    };
    return (
        <Modal
            visible={visible}
            title={title}
            onOk={handleOk}
            onCancel={onClose}
            footer={[
                <Button key="back" size="large" onClick={onClose}>
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
            <InputGroup size="large" style={{ marginBottom: '15px' }}>
                <Col span="24">
                    <InputGroup compact style={{ marginBottom: '15px' }}>
                        <Input
                            style={{ width: '20%' }}
                            defaultValue="Name"
                            disabled={true}
                        />
                        <Input
                            style={{ width: '80%' }}
                            placeholder="Enter Name"
                            name="name"
                            value={role.name}
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                </Col>
                <Col span="24">
                    <InputGroup compact style={{ marginBottom: '15px' }}>
                        <Input
                            style={{ width: '20%' }}
                            defaultValue="Display name"
                            disabled={true}
                        />
                        <Input
                            style={{ width: '80%' }}
                            placeholder="Enter Display name"
                            name="display_name"
                            value={role.display_name}
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                </Col>
            </InputGroup>
        </Modal>
    )
}

export default connect(null, { updateOrCreate })(Card)
