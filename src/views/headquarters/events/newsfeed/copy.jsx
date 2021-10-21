import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Box from '../../../../components/utility/box';
import Modals from '../../../../components/feedback/modal';
import Input, { Textarea } from '../../../../components/uielements/input';

const info = Modals.confirm

const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap'
}

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: undefined,
            subtitle: undefined,
            announcement: undefined
        };
    }

    onSubmit = () => {
        alert('haha')
        // console.log(this.state);
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    popModal = () => {
        info({
            title: this.props.label,
            content:
                <Row>
                    <Col className="mb-2">
                        <Input
                            defaultValue={this.state.title}
                            placeholder="Title"
                            name='title'
                            onChange={(event) => this.changeHandler(event)}
                        />
                    </Col>
                    <Col className="mb-2">
                        <Input
                            defaultValue={this.state.subtitle}
                            placeholder="Sub title"
                            name='subtitle'
                            onChange={(event) => this.changeHandler(event)}
                        />
                    </Col>
                    <Textarea
                        rows={4}
                        defaultValue={this.state.announcement}
                        placeholder="Announcement"
                        name='announcement'
                        onChange={(event) => this.changeHandler(event)}
                    />
                </Row>,
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 2000)
                });
            },
            okText: 'Announce',
            cancelText: 'Cancel',
        });
    }

    render() {
        return (
            <Box>
                <Row style={rowStyle}>
                    <Col span={2} className="d-flex align-items-center">
                        <img
                            width={50}
                            height={50}
                            src='https://mdbootstrap.com/img/Photos/Avatars/img%20%281%29.jpg'
                            alt='avatar'
                            className='rounded-circle img-responsive mx-auto'
                        />
                    </Col>
                    <Col span={22} className="d-flex align-items-center">
                        <div onClick={this.popModal} className='w-100 rounded-pill h-75 d-flex align-items-center stylish-color text-wrap' style={{ cursor: 'pointer' }}>
                            <span className="ml-3 text-white">
                                {/* {
                                    this.state.announcement ?
                                        this.state.announcement.length > 65 ?
                                            `${this.state.announcement.slice(0, 65)}...`
                                            :
                                            this.state.announcement
                                        :
                                        this.props.label
                                } */}
                                {this.props.label}
                            </span>
                        </div>
                    </Col>
                </Row>
            </Box >
        );
    }
}