import React, { Component } from 'react'
import Input, { InputGroup, } from '../../../../components/uielements/input';
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
            model: '',
            loading: false,
        };
    }
    onChange = e => { this.setState({ [e.target.name]: e.target.value }) }
    handleClose = () => this.props.onClose()
    render() {
        // eslint-disable-next-line
        if (this.props.exhibit) { this.state.model = this.props.model }
        console.log(this.state.model);
        let info = ['fullname', 'stages', 'status', 'position', 'accounts', 'gender', 'platforms']
        let details = info.map(model => {
            return (<Col span="24">
                <InputGroup compact style={{ marginBottom: '15px' }}>
                    <Input
                        className="text-capitalize"
                        style={{ width: '20%' }}
                        defaultValue={model}
                        disabled={true}
                    />
                    <Input
                        className="text-capitalize"
                        disabled={true}
                        style={{ width: '80%' }}
                        placeholder={`Enter ${model}`}
                        value={this.state.model[model] || ''}
                    />
                </InputGroup>
            </Col>)
        })
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
                {details}
            </Modal>
        )
    }
}