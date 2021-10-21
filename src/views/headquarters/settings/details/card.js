import React, { Component } from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup, Textarea } from '../../../../components/uielements/input';
import Modals from '../../../../components/modal';
import ModalStyle from '../../../../components/modal/modal.style';
import WithDirection from '../../../../config/withDirection';
import Button from '../../../../components/uielements/button';
import { Col } from 'antd';
import Select, { SelectOption } from '../../../../components/uielements/select';
import ContentHolder from '../../../../components/utility/contentHolder';



const isoModal = ModalStyle(Modals);
const Option = SelectOption;
const Modal = WithDirection(isoModal);
const children = [

    <Option value="Primary">Primary</Option>,
    <Option value="Secondary">Secondary</Option>,
    <Option value="Tertiary">Tertiary</Option>,
    <Option value="Post Graduate">Post Graduate</Option>,
    <Option value="Under Graduate">Under Graduate</Option>,
];

export default class Card extends Component {
    constructor(props) {
        super(props);
        let auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            model: '',
            user: auth,
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
                title={this.props.newModel ? "Add a School" : "Update School"}
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

                {this.state.user.role.name !== 'dev' || this.props.newModel ||
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
                                    style={{ width: '80%' }}
                                    placeholder="Enter Name"
                                    value={this.state.model.name || ''}
                                    onChange={(e) => {
                                        console.log(e.target);
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
                                    defaultValue="Acronyms"
                                    disabled={true}
                                />
                                <Input
                                    disabled={true}
                                    style={{ width: '80%' }}
                                    placeholder="Enter Acronyms"
                                    value={this.state.model.acronyms || ''}
                                    onChange={(e) => {
                                        console.log(e.target);
                                        let { model } = this.state;
                                        model.acronyms = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="24">
                            <InputGroup compact style={{ marginBottom: '0.5px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Code"
                                    disabled={true}
                                />
                                <Input
                                    disabled={true}
                                    type="number"
                                    style={{ width: '80%' }}
                                    placeholder="Enter Code"
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
                            <ContentHolder style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Academic Stages"
                                    disabled={true}
                                />
                                <Select
                                    mode="multiple"
                                    style={{ width: '80%' }}
                                    placeholder="Enter Academic Stages"
                                    defaultValue={this.state.model.stages}
                                    onChange={(e) => {
                                        console.log(e);
                                        let { model } = this.state;
                                        model.stages = e
                                        this.setState({ model });
                                    }}
                                >
                                    {children}
                                </Select>
                            </ContentHolder>
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
                                        let { model } = this.state;
                                        model.country = e.target.value
                                        this.setState({ model });
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
                                    type="number"
                                    style={{ width: '80%' }}
                                    placeholder="Enter Region"
                                    value={this.state.model.region || ''}
                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.region = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="24">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Division"
                                    disabled={true}
                                />
                                <Input
                                    style={{ width: '80%' }}
                                    placeholder="Enter Division"
                                    value={this.state.model.division || ''}
                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.division = e.target.value
                                        this.setState({ model });
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
                                    style={{ width: '80%' }}
                                    placeholder="Enter District"
                                    value={this.state.model.district || ''}
                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.district = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                            </InputGroup>
                        </Col>


                        <Col span="24">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Address"
                                    disabled={true}
                                />
                                <Input
                                    style={{ width: '80%' }}
                                    placeholder="Enter Address"
                                    value={this.state.model.address || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.address = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="24">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Phone"
                                    disabled={true}
                                />
                                <Input
                                    type="number"
                                    style={{ width: '80%' }}
                                    placeholder="Enter Phone"
                                    value={this.state.model.phone || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.phone = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="24">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Contact Person"
                                    disabled={true}
                                />
                                <Input
                                    style={{ width: '80%' }}
                                    placeholder="Enter Contact Person"
                                    value={this.state.model.cp || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.cp = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                            </InputGroup>
                        </Col>

                    </InputGroup>
                }
                <InputGroup size="large" style={{ marginBottom: '15px' }}>

                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="HYMN"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Enter HYMN"
                                value={this.state.model.hymn || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.hymn = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '25%' }}
                                defaultValue="Link of HYMN"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '75%' }}
                                placeholder="Enter Link of HYMN"
                                value={this.state.model.url_hymn || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.url_hymn = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Tagline"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Enter Tagline"
                                value={this.state.model.tagline || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.tagline = e.target.value
                                    this.setState({ model });
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
                            <Textarea
                                autosize={{ minRows: 2, maxRows: 6 }}
                                style={{ width: '80%' }}
                                placeholder="Enter History"
                                value={this.state.model.history || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.history = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Logo"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Enter Logo"
                                value={this.state.model.logo || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.logo = e.target.value
                                    this.setState({ model });
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Icon"
                                disabled={true}
                            />
                            <Input
                                style={{ width: '80%' }}
                                placeholder="Enter Icon"
                                value={this.state.model.icon || ''}

                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.icon = e.target.value
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