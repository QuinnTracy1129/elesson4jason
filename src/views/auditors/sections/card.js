import React, { Component } from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Input, { InputGroup, } from '../../../components/uielements/input';
import Modals from '../../../components/modal';
import ModalStyle from '../../../components/modal/modal.style';
import WithDirection from '../../../config/withDirection';
import Button from '../../../components/uielements/button';
import { Col } from 'antd';
import moment from 'moment';


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
        model.posted_at = moment().format('MMM DD, YYYY');
        this.props.onSubmit(model)
    }
    render() {
        // eslint-disable-next-line
        if (this.props.exhibit) { this.state.model = this.props.model }
        // let { title, text, posted_at, link } = this.state.model;
        let writer = this.props.fillables.map(fillable => {
            return <Col span="24">
                <InputGroup compact style={{ marginBottom: '15px' }}>
                    <Input
                        className="text-capitalize"
                        style={{ width: '20%' }}
                        defaultValue={fillable}
                        disabled={true}
                    />
                    <Input
                        className={'text-capitalize'}
                        style={{ width: '80%' }}
                        placeholder={`Enter ${fillable}`}
                        value={this.state.model[fillable] || ''}
                        onChange={(e) => {
                            let { model } = this.state
                            model[fillable] = e.target.value
                            this.setState({ model })
                        }}
                    />
                </InputGroup>
            </Col>
        })

        return (
            <Modal
                visible={this.props.exhibit}
                title={"Add a Work"}
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
                        Submit
                    </Button>,
                ]}
            >
                <InputGroup size="large" style={{ marginBottom: '15px' }}>
                    {writer}
                </InputGroup>
            </Modal>
        )
    }
}