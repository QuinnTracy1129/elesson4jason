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
        const { code, status, url, title } = this.state.model;

        return (
            <Modal
                visible={this.props.exhibit}
                title={this.props.newModel ? "Add a Info" : "Update Info"}
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
                                defaultValue="Title"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Enter Title"
                                value={title || ''}
                                onChange={(e) => {
                                    let { model } = this.state
                                    model.title = e.target.value
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
                                style={{ width: '80%' }}
                                placeholder="Enter code"
                                value={code || ''}
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
                                defaultValue="Status"
                                disabled={true}
                            />
                            <Select
                                style={{ width: '80%' }}
                                placeholder="Enter status"
                                value={status || ''}
                                onChange={(e) => {
                                    let { model } = this.state
                                    model.status = e
                                    this.setState({ model })
                                }}
                            >
                                <SelectOption value="pending">Pending</SelectOption>
                                <SelectOption value="submitted">Submitted</SelectOption>
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="File"
                                disabled={true}
                            />
                            <Input
                                id="memo"
                                onClick={() => { document.getElementById('memos').click() }}
                                style={{ width: '80%' }}
                                placeholder="Input File"
                                value={url || ''}
                            />
                            <input accept="application/pdf,application" onChange={
                                (e) => {
                                    this.props.fileUploadHandler(e)
                                    let { model } = this.state
                                    model.url = e.target.files[0].name
                                    model.filetype = e.target.files[0].name.split('.').pop()
                                    this.setState({ model })
                                    document.getElementById('memo').value = e.target.files[0].name
                                }
                            } className="d-none" type="file" id="memos" />
                        </InputGroup>
                    </Col>
                </InputGroup>
            </Modal >
        )
    }
}