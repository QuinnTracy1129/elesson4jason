import React, { Component } from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup, } from '../../../../components/uielements/input';
import Modals from '../../../../components/modal';
import ModalStyle from '../../../../components/modal/modal.style';
import WithDirection from '../../../../config/withDirection';
import Button from '../../../../components/uielements/button';
import { Col } from 'antd';
import Select, { SelectOption } from '../../../../components/uielements/select';



const isoModal = ModalStyle(Modals);
const Option = SelectOption;
const Modal = WithDirection(isoModal);

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: { status: '' },
            loading: false,
        };
    }
    
    onChange = e => { this.setState({ [e.target.name]: e.target.value }) }
    handleClose = () => this.props.onClose()
    onSubmit = (e) => {
        e.preventDefault();
        let model = this.state.model;
        this.props.onSubmit(model)
    }
    render() {
        // eslint-disable-next-line
        if (this.props.exhibit) { this.state.model = this.props.model }

        return (
            <Modal
                visible={this.props.exhibit}
                title={this.props.newModel ? "Add a Batch" : "Update Batch"}
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
                    >
                        {this.props.newModel ? "Submit" : "Update"}
                    </Button>,
                ]}
            >
                <InputGroup size="large" style={{ marginBottom: '15px' }}>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Batch"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="School Year"
                                value={this.state.model.SY || ''}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.SY = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Stage"
                                disabled={true}
                            />
                            <Select
                                style={{ width: '80%' }}
                                value={this.state.model.stages || ''}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.stages = e
                                    this.setState({ model });
                                }}
                            >
                                {
                                    this.props.stages.map(stage => {
                                        return (
                                            <Option value={stage}>{stage}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Semester"
                                disabled={true}
                            />
                            <Select
                                style={{ width: '80%' }} value={this.state.model.semester || ''}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.semester = e
                                    this.setState({ model });
                                }}
                            >
                                <Option value="1">First Semester</Option>
                                <Option value="2">Second Semester</Option>
                                <Option value="3">Third Semester</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '25%' }}
                                defaultValue="Enrollment Start"
                                disabled={true}
                            />
                            <Input
                                type="date"
                                style={{ width: '75%' }}
                                placeholder="Enrollment Start"
                                value={this.state.model.e_start || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.e_start = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '25%' }}
                                defaultValue="Enrollment End"
                                disabled={true}
                            />
                            <Input
                                type="date"
                                style={{ width: '75%' }}
                                placeholder="Enrollment End"
                                value={this.state.model.e_end || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.e_end = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '25%' }}
                                defaultValue="Classes Start"
                                disabled={true}
                            />
                            <Input
                                type="date"
                                style={{ width: '75%' }}
                                placeholder="Classes Start"
                                value={this.state.model.c_start || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.c_start = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '25%' }}
                                defaultValue="Classes End"
                                disabled={true}
                            />
                            <Input
                                type="date"
                                style={{ width: '75%' }}
                                placeholder="Classes End"
                                value={this.state.model.c_end || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.c_end = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                    </Col>
                </InputGroup>
            </Modal >
        )
    }
}