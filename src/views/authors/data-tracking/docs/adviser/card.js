import React, { Component } from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup, Textarea, } from '../../../../components/uielements/input';
import Modals from '../../../../components/modal';
import ModalStyle from '../../../../components/modal/modal.style';
import WithDirection from '../../../../config/withDirection';
import Button from '../../../../components/uielements/button';
import { Col } from 'antd';
import Select, { SelectOption } from '../../../../components/uielements/select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            issue: {
                title: ''
            },
            model: '',
            loading: false,
        };
    }
    onChange = (e, target, name) => {
        let { model, issue } = this.state
        if (target) {
            issue[target] = e.target.value
            this.setState({ issue })
            console.log(this.state.issue);
        } else {
            e.target ? model[e.target.name] = e.target.value : model[name] = e
            this.setState({ model })
        }

    }
    handleClose = () => this.props.onClose()
    onSubmit = (e) => {
        e.preventDefault();
        let model = this.state.model;
        if (this.state.issue.title !== '') {
            model.issues = this.state.issue
            model.issues.issue_at = moment().format('MM/d/Y')
            model.status = 'denied'
        }
        this.props.onSubmit(model)
    }
    render() {
        // eslint-disable-next-line
        if (this.props.exhibit) { this.state.model = this.props.model }
        let { title, category, filetype, url, issues } = this.state.model;
        console.log(this.state.model);

        return (
            <Modal
                visible={this.props.exhibit}
                title={this.props.newModel ? "Add a Lesson plan" : "Issue"}
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
                {this.props.exhibit && !this.props.newModel ?
                    <InputGroup size="large" style={{ marginBottom: '15px' }}>
                        <Col span={24}>
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Title"
                                    disabled={true}
                                />
                                <Input
                                    style={{ width: '80%' }}
                                    placeholder="Enter Title"
                                    disabled={this.auth.rolename === 'faculty' ? true : false}
                                    value={this.auth.rolename === 'faculty' ? issues.title || '' : this.state.issue.title || ''}
                                    onChange={(e) => this.onChange(e, 'title')}
                                />
                            </InputGroup>
                        </Col>
                        <Col span={24}>
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Reason"
                                    disabled={true}
                                />
                                <Textarea
                                    row={6}
                                    style={{ width: '80%' }}
                                    disabled={this.auth.rolename === 'faculty' ? true : false}
                                    placeholder="Enter Reason"
                                    value={this.auth.rolename === 'faculty' ? issues.reason || '' : this.state.issue ? this.state.issue.reason : ''}
                                    onChange={(e) => this.onChange(e, 'reason')}
                                />
                            </InputGroup>
                        </Col>
                    </InputGroup>
                    :
                    < InputGroup size="large" style={{ marginBottom: '15px' }}>
                        <Col span={24}>
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Category"
                                    disabled={true}
                                />
                                <Select
                                    style={{ width: '80%' }}
                                    placeholder="Enter Category"
                                    value={category || ''}
                                    name="category"
                                    onChange={(e) => { this.onChange(e, null, 'category') }}
                                >
                                    <SelectOption value="dll">Daily Lesson Log</SelectOption>
                                    <SelectOption value="module">Module</SelectOption>
                                </Select>
                            </InputGroup>
                        </Col>
                        <Col span={24}>
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Title"
                                    disabled={true}
                                />
                                <Input
                                    style={{ width: '80%' }}
                                    placeholder="Enter Title"
                                    name="title"
                                    value={title || ''}
                                    onChange={(e) => this.onChange(e)}
                                />
                            </InputGroup>
                        </Col>
                        <Col span={24}>
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="File type"
                                    disabled={true}
                                />
                                <Select
                                    style={{ width: '80%' }}
                                    placeholder="Enter File type"
                                    value={filetype || ''}
                                    name="filetype"
                                    onChange={(e) => { this.onChange(e, null, 'filetype') }}
                                >
                                    <SelectOption value="drive">Google drive</SelectOption>
                                    <SelectOption value="pdf">PDF</SelectOption>
                                </Select>
                            </InputGroup>
                        </Col>
                        {filetype ? filetype === "pdf" ?
                            < Col span={24} className="text-center">
                                <label className="btn btn-info mr-3" htmlFor="pdf" ><FontAwesomeIcon icon={faUpload} /></label>
                                <Input
                                    className="text-center"
                                    placeholder='PDF file'
                                    style={{ width: '90%' }}
                                    disabled={true}
                                    value={this.state.model.name || ''}
                                />
                                <input accept="application/pdf,application" onChange={
                                    (e) => {
                                        let { model } = this.state;
                                        model.file = e.target.files[0]
                                        model.url = title ? `${title}.${e.target.files[0].name.split('.').pop()}` : e.target.files[0].name
                                        model.name = e.target.files[0].name
                                        this.setState({ model })
                                    }
                                } className="d-none" type="file" id="pdf" />
                            </Col>
                            :
                            < Col span={24}>
                                <InputGroup compact style={{ marginBottom: '15px' }}>
                                    <Input
                                        style={{ width: '20%' }}
                                        defaultValue="Url"
                                        disabled={true}
                                    />
                                    <Input
                                        style={{ width: '80%' }}
                                        placeholder="Enter Url"
                                        name="url"
                                        value={url || ''}
                                        onChange={(e) => this.onChange(e)}
                                    />
                                </InputGroup>
                            </Col> : ''
                        }
                    </InputGroup>}
            </Modal >
        )
    }
}