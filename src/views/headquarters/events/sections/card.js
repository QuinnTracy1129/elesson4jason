import React, { Component } from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup, } from '../../../../components/uielements/input';
import Modals from '../../../../components/modal';
import ModalStyle from '../../../../components/modal/modal.style';
import WithDirection from '../../../../config/withDirection';
import Button from '../../../../components/uielements/button';
import { Col } from 'antd';
import Select, { SelectOption } from '../../../../components/uielements/select';
import { listahan } from '../../../../talaan';


const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const Option = SelectOption;

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: '',
            loading: false,
            schools: undefined,
            levels: undefined,
            advisers: undefined,
        };
    }
    componentDidMount() {
        listahan('levels').then(data => {
            let levels = data.map((model) => {
                return (<Option value={model.id}>{model.name}</Option>)
            })
            this.setState({ levels })
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
                title={this.props.newModel ? "Add a Section" : "Update Section"}
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
                                defaultValue="School"
                                disabled={true}
                            />
                            <Select
                                style={{ width: '80%' }}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.school_id = e
                                    this.setState({ model });
                                }}
                            >
                                {this.state.schools}
                            </Select>
                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Year Level"
                                disabled={true}
                            />
                            <Select
                                style={{ width: '80%' }}
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
                                defaultValue="Name"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Enter  name"
                                value={this.state.model.name || undefined}

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
                                defaultValue="Year Level"
                                disabled={true}
                            />
                            <Select
                                style={{ width: '80%' }}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.level_id = e
                                    this.setState({ model });
                                }}
                            >
                                {this.state.advisers}
                            </Select>

                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Truck/Strand"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Truck/Strand"
                                value={this.state.model.trackStrand || undefined}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.trackStrand = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Number of students "
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Number of students"
                                value={this.state.model.accumulate || undefined}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.accumulate = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Display name"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Enter Display name"
                                value={this.state.model.status || undefined}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.status = e.target.value
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