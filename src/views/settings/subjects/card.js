import React, { Component } from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup, } from '../../../components/uielements/input';
import Modals from '../../../components/modal';
import ModalStyle from '../../../components/modal/modal.style';
import WithDirection from '../../../config/withDirection';
import Button from '../../../components/uielements/button';
import { Col } from 'antd';
import Select, { SelectOption } from '../../../components/uielements/select';
import { listahan } from '../../../talaan';


const isoModal = ModalStyle(Modals);
const Option = SelectOption;
const Modal = WithDirection(isoModal);

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: '',
            loading: false,
            levels: '',
        };
    }
    componentDidMount() {
        listahan('levels').then(data => {
            let list = data.map((model) => {
                return (
                    <Option value={model.id}>{model.name}</Option>
                )
            })
            this.setState({ levels: list })
        })
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
                title={this.props.newModel ? "Add a Subject" : "Update Subject"}
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
                                defaultValue="Subject name"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Enter Subject name"
                                value={this.state.model.name || ''}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.name = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>

                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Year Level"
                                disabled={true}
                            />
                            <Select
                                style={{ width: '80%' }}
                                placeholder="Select Year Level"
                                value={this.state.model.level_id || ''}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.level_id = e
                                    this.setState({ model });
                                }}
                            >
                                {this.state.levels}
                            </Select>
                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Code"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Enter Subject Code"
                                value={this.state.model.code || ''}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.code = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>

                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Laboratory"
                                disabled={true}
                            />
                            <Input
                                type="number"

                                style={{ width: '80%' }}
                                placeholder="Enter Laboratory"
                                value={this.state.model.lab || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.lab = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Lectures"
                                disabled={true}
                            />
                            <Input
                                type="number"
                                style={{ width: '80%' }}
                                placeholder="Enter Lectures"
                                value={this.state.model.lec || ''}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.lec = e.target.value
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