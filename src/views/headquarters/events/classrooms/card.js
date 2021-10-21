import React, { Component } from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup, } from '../../../../components/uielements/input';
import Modals from '../../../../components/modal';
import ModalStyle from '../../../../components/modal/modal.style';
import WithDirection from '../../../../config/withDirection';
import Button from '../../../../components/uielements/button';
import { Col } from 'antd';

import Select, { SelectOption } from '../../../../components/uielements/select';
const Option = SelectOption;

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: '',
            loading: false,
            rooms: [],
            slots: [],
            sections: [],
            selectedSections: []
        };
    }
    onChange = e => { this.setState({ [e.target.name]: e.target.value }) }
    handleClose = () => this.props.onClose()
    handlesRooms = async (level) => {
        const sections = this.state.sections.filter(Section => Section.level_id === level)
        const selectedSections = sections.map((model) => <Option value={model.id}>{model.name} | {model.trackStrand}</Option>)

        const room = this.state.rooms.find(room => room.level_id === level)
        console.log(room);
        const slots = room.slots.map((model) => <Option value={model.name}>{model.building} | {model.name}</Option>)
        this.setState({ slots, selectedSections })
    }
    onSubmit = (e) => {
        e.preventDefault();
        let model = this.state.model;
        this.props.onSubmit(model)
    }
    render() {
        if (this.props.exhibit) {
            // eslint-disable-next-line
            this.state.model = this.props.model
            // eslint-disable-next-line
            this.state.rooms = this.props.rooms
            // eslint-disable-next-line
            this.state.sections = this.props.sections
        }
        return (
            <Modal
                visible={this.props.exhibit}
                title={this.props.newModel ? "Tag a Designation" : "Update Designation"}
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
                                placeholder="Enter Posision"
                                value={this.state.model.position || ''}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.position = e
                                    this.setState({ model });
                                }}
                            >
                                <Option value="Adviser">Adviser</Option>
                                <Option value="Co-adviser">Co-adviser</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Level"
                                disabled={true}
                            />
                            <Select
                                style={{ position: "relative", width: '80%' }}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.level_id = e
                                    this.setState({ model });
                                    this.handlesRooms(e)
                                }}
                            >
                                {this.props.levels}
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Section"
                                disabled={true}
                            />
                            <Select
                                style={{ position: "relative", width: '80%' }}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.section_id = e
                                    this.setState({ model });
                                }}
                            >
                                {this.state.selectedSections}
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Room"
                                disabled={true}
                            />
                            <Select
                                style={{ position: "relative", width: '80%' }}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.room = e
                                    this.setState({ model });
                                }}
                            >
                                {this.state.slots}
                            </Select>
                        </InputGroup>
                    </Col>
                </InputGroup>
            </Modal>
        )
    }
}