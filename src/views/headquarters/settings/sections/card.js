
import { Col } from 'antd';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Modals from '../../../../components/modal';
import ModalStyle from '../../../../components/modal/modal.style';
import Button from '../../../../components/uielements/button';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup } from '../../../../components/uielements/input';
import Select from '../../../../components/uielements/select';
import WithDirection from '../../../../config/withDirection';
import { updateOrCreate } from "../../../../redux/BREAD/actions";


const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const Card = ({ model, levels, faculties, visible, onClose, updateOrCreate }) => {
    const [loading, setLoading] = useState(false);
    const [section, setSection] = useState(model);
    const title = model.id ? "Update Section" : "Add Section";
    const btnMsg = model.id ? "Update" : "Submit";

    useEffect(() => {
        setSection(model);
        console.log(section);
    }, [model]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSection({ ...section, [name]: value });
    };

    const onSubmit = () => {
        updateOrCreate('sections', section);
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
            <InputGroup size="large" style={{ marginBottom: '15px' }}>
                <Col span="24">
                    <InputGroup compact style={{ marginBottom: '15px' }}>
                        <Input
                            style={{ width: '20%' }}
                            defaultValue="Year Level"
                            disabled={true}
                        />
                        <Select
                            style={{ width: "80%" }}
                            value={section.level_id}
                            onChange={(value) => setSection({ ...section, level_id: value })}
                        >
                            {levels}
                        </Select>
                    </InputGroup>
                </Col>
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
                            value={section.name}
                            name='name'
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                </Col>
                <Col span="24">
                    <InputGroup compact style={{ marginBottom: '15px' }}>
                        <Input
                            style={{ width: '30%' }}
                            defaultValue="Track strand"
                            disabled={true}
                        />
                        <Input
                            style={{ width: '70%' }}
                            placeholder="Enter Track Strand"
                            value={model.trackStrand}
                            name='trackStrand'
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                </Col>
                <Col span="24">
                    <InputGroup compact style={{ marginBottom: '15px' }}>
                        <Input
                            style={{ width: '40%' }}
                            defaultValue="Student Capacity"
                            disabled={true}
                        />
                        <Input
                            type="number"
                            style={{ width: '60%' }}
                            placeholder="Enter Max Student"
                            value={section.accumulate}
                            name='accumulate'
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                </Col>
                <Col span="24">
                    <InputGroup compact style={{ marginBottom: '15px' }}>
                        <Input
                            style={{ width: '20%' }}
                            defaultValue="Adviser"
                            disabled={true}
                        />
                        <Select
                            style={{ width: "80%" }}
                            value={section.adviser_id}
                            onChange={(value) => setSection({ ...section, adviser_id: value })}
                        >
                            {faculties}
                        </Select>
                    </InputGroup>
                </Col>
            </InputGroup>
        </Modal >
    )
}
export default connect(null, { updateOrCreate })(Card);
