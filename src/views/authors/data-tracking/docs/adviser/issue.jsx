import React, { Component } from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup, Textarea, } from '../../../../components/uielements/input';
import Modals from '../../../../components/modal';
import ModalStyle from '../../../../components/modal/modal.style';
import WithDirection from '../../../../config/withDirection';
import Button from '../../../../components/uielements/button';
import { Col } from 'antd';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issue: {},
            model: {
                issue: {
                    title: ''
                }
            },
            loading: false,
        };
    }
    onChange = (e, target, name) => {
        let { model, issue } = this.state
        if (target) {
            issue[target] = e.target.value
            this.setState({ issue })
        } else {
            e.target ? model[e.target.name] = e.target.value : model[name] = e
            this.setState({ model })
        }

    }
    handleClose = () => this.props.onClose()
    onSubmit = (e) => {
        e.preventDefault();
        let model = this.state.model;
        model.issue = this.state.issue
        this.props.onSubmit(model)
    }
    render() {
        // eslint-disable-next-line
        if (this.props.exhibit) { this.state.model = this.props.model }

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
                                value={this.state.model.issue ? this.state.model.issue.title : ''}
                                onChange={(e) => this.onChange(e, 'title')}
                            />
                        </InputGroup>
                    </Col>
                    <Col span="24">
                        <InputGroup compact style={{ marginBottom: '15px' }}>
                            <Input
                                style={{ width: '20%' }}
                                defaultValue="Reason"
                                disabled={true}
                            />
                            <Textarea
                                row={6}
                                style={{ width: '80%' }}
                                placeholder="Enter Reason"
                                value={this.state.model.issue ? this.state.model.issue.reason : ''}
                                onChange={(e) => this.onChange(e, 'reason')}
                            />
                        </InputGroup>
                    </Col>
                </InputGroup>

            </Modal >
        )
    }
}