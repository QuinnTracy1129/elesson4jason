import { Col } from 'antd';
import React, { Component } from 'react';
import Modals from '../../../../components/modal';
import ModalStyle from '../../../../components/modal/modal.style';
import Button from '../../../../components/uielements/button';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup } from '../../../../components/uielements/input';
import WithDirection from '../../../../config/withDirection';


const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
// const Option = SelectOption;

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                slots: {
                    name: '',
                    location: ''
                }
            },
            loading: false,
            schools: '',
            length: ''
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
                title={this.props.newModel ? "Add Room" : "Update Room"}
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
                                defaultValue="Name"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Name"
                                value={this.state.model.name || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.name = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Location"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Building/ Location"
                                value={this.state.model.building || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.building = e.target.value
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