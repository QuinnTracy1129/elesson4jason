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
            model: '',
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
                title={this.props.newModel ? "Add an Employee" : "Update Employee"}
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
                                defaultValue="Position"
                                disabled={true}
                            />
                            <Select
                                style={{ width: '80%' }}
                                value={this.state.model.position || ''}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.position = e
                                    this.setState({ model });
                                }}
                            >
                                <Option value="Principal">Principal</Option>
                                <Option value="Vice Principal">Vice Principal</Option>
                                <Option value="Librarian">Librarian</Option>
                                <Option value="Instructional">Instructional Coordinator</Option>
                                <Option value="Academic Advisor">Academic Advisor</Option>
                                <Option value="Head Teacher">Head Teacher</Option>
                                <Option value="Faculty">Faculty</Option>
                                <Option value="Education Consultant">Education Consultant</Option>
                                <Option value="Education Policy Analyst">Education Policy Analyst</Option>
                                <Option value="Higher Education Administrator">Higher Education Administrator</Option>

                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Staff"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Enter Staff name"
                                value={this.state.model.name || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.name = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                    </Col>
                </InputGroup>
            </Modal>
        )
    }
}