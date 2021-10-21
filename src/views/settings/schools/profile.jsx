import React, { Component } from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup, } from '../../../components/uielements/input';
import Modals from '../../../components/modal';
import ModalStyle from '../../../components/modal/modal.style';
import WithDirection from '../../../config/withDirection';
import Button from '../../../components/uielements/button';
import { Col } from 'antd';


const isoModal = ModalStyle(Modals);
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
                title="View"
                onOk={this.handleOk}
                onCancel={this.handleClose}
                footer={[
                    <Button key="back" size="large" type="danger" onClick={this.handleClose}>
                        Cancel
                    </Button>
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
                                disabled={true}
                                defaultValue="Name"
                                style={{ width: '80%' }}
                                placeholder="Enter Name"
                                value={this.state.model.name || ''}
                                onChange={(e) => {
                                    let { model } = this.state
                                    model.name = e.target.value
                                    this.setState({ model })
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Acronym"
                                disabled={true}
                            />
                            <Input
                                disabled={true}
                                style={{ width: '80%' }}
                                placeholder="Enter Acronym"
                                value={this.state.model.acronyms || ''}
                                onChange={(e) => {
                                    let { model } = this.state
                                    model.acronyms = e.target.value
                                    this.setState({ model })
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Stages"
                                disabled={true}
                            />
                            <Input
                                disabled={true}
                                style={{ width: '80%' }}
                                placeholder="Enter Stages"
                                value={this.state.model.stages && Object.keys(this.state.model.stages).join(', ')}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Country"
                                disabled={true}
                            />
                            <Input
                                disabled={true}
                                style={{ width: '80%' }}
                                placeholder="Enter Country"
                                value={this.state.model.country || ''}
                                onChange={(e) => {
                                    let { model } = this.state
                                    model.country = e.target.value
                                    this.setState({ model })
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Province"
                                disabled={true}
                            />
                            <Input
                                disabled={true}
                                style={{ width: '80%' }}
                                placeholder="Enter Province"
                                value={this.state.model.province || ''}
                                onChange={(e) => {
                                    let { model } = this.state
                                    model.province = e.target.value
                                    this.setState({ model })
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Region"
                                disabled={true}
                            />
                            <Input
                                disabled={true}
                                style={{ width: '80%' }}
                                placeholder="Enter Region"
                                value={this.state.model.region || ''}
                                onChange={(e) => {
                                    let { model } = this.state
                                    model.region = e.target.value
                                    this.setState({ model })
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="District"
                                disabled={true}
                            />
                            <Input
                                disabled={true}
                                style={{ width: '80%' }}
                                placeholder="Enter District"
                                value={this.state.model.district || ''}
                                onChange={(e) => {
                                    let { model } = this.state
                                    model.district = e.target.value
                                    this.setState({ model })
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Code"
                                disabled={true}
                            />
                            <Input
                                disabled={true}
                                style={{ width: '80%' }}
                                placeholder="Enter Code"
                                value={this.state.model.code || ''}
                                onChange={(e) => {
                                    let { model } = this.state
                                    model.code = e.target.value
                                    this.setState({ model })
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="History"
                                disabled={true}
                            />
                            <Input
                                disabled={true}
                                style={{ width: '80%' }}
                                placeholder="Enter History"
                                value={this.state.model.history || ''}
                                onChange={(e) => {
                                    let { model } = this.state
                                    model.history = e.target.value
                                    this.setState({ model })
                                }}
                            />
                        </InputGroup>
                    </Col>
                </InputGroup>
            </Modal>
        )
    }
}