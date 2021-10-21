import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Box from '../../../../components/utility/box';
import Modals from '../../../../components/feedback/modal';
import Input, { Textarea, InputGroup } from '../../../../components/uielements/input';
import Select, { SelectOption } from '../../../../components/uielements/select';
import Popover from '../../../../components/uielements/popover';

import ModalStyle from '../../../../containers/Feedback/Modal/modal.style';
import WithDirection from '../../../../config/withDirection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faImages, faPlayCircle, faTimes, faVideo } from '@fortawesome/free-solid-svg-icons';

import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBIframe } from "mdbreact";
import axios from 'axios';

import message from '../../../../components/feedback/message';
import MessageContent from '../../../../containers/Feedback/Message/message.style';
import { listahan } from '../../../../talaan';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const Option = SelectOption;

const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap'
}

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.auth = JSON.parse(localStorage.getItem('auth'));
        this.url = localStorage.getItem('url');
        this.state = {
            model: {
                title: undefined,
                subtitle: undefined,
                announcement: undefined,
                attachment: undefined,
                category: undefined,
                certain: undefined,
                file_type: undefined,
                author: this.auth.email,
                authorname: this.auth.fullname
            },
            visible: false,
            show_image: undefined,
            show_images: [],
            show_url: undefined,
            files: undefined,
            levels: []
        };
    }

    //add every info to a model so it is easier to transfer
    componentDidMount() {
        listahan('levels', { key: Object.keys(this.auth.school.stages) }).then(data => {
            const levels = data.map((model) => {
                return (<Option value={model.id}>{model.fullname}</Option>)
            })
            this.setState({ levels })
        })
    }

    onSubmit = () => {
        let model = this.state.model;
        this.props.onSubmit(model)
        this.handleCancel();
    }

    handleClick = () => {
        let embed = `https://www.youtube.com/embed/${this.state.model.attachment}`
        this.setState({
            show_url: embed
        })
    }

    changeHandler = (event) => {
        let { model } = this.state;
        if (event === 'url') {
            model.file_type = event;
            this.setState({
                model
            });
        } else {
            switch (event.target.name) {
                case 'image':
                    let file_name = model.title ?
                        `${model.title}.${event.target.files[0].name.split('.').pop()}`
                        :
                        event.target.files[0].name;
                    model.attachment = file_name;
                    model.file_type = event.target.name;
                    this.setState({
                        model,
                        files: event.target.files[0],
                        show_image: URL.createObjectURL(event.target.files[0])
                    });
                    break;

                case 'images':
                    let multiple = [];
                    let images = [];
                    for (let i = 0; i < event.target.files.length; i++) {
                        if (model.title) {
                            multiple.push(`${model.title}${i}.${event.target.files[i].name.split('.').pop()}`);
                        } else {
                            multiple.push(event.target.files[i].name);
                        }
                        images.push(URL.createObjectURL(event.target.files[i]));
                    }
                    model.attachment = multiple;
                    model.file_type = event.target.name;
                    this.setState({
                        model,
                        files: event.target.files,
                        show_images: images
                    });
                    break;

                case 'url':
                    model.attachment = event.target.value.slice(32);
                    model.file_type = event.target.name;
                    this.setState({ model });
                    break;

                default:
                    model[event.target.name] = event.target.value
                    this.setState({ model });
                    break;
            }
        }
    }

    verification = () => {
        console.log(this.state.model);
        let values = [];
        if (!this.state.model.announcement) {
            values.push('Announcement')
        }
        if (!this.state.model.category) {
            values.push('Category')
        }
        if (this.state.model.category === 'certain') {
            if (!this.state.model.certain) {
                values.push('Levels')
            }
        }
        if (values.length > 0) {
            message.warning(
                <MessageContent>
                    Input(s) <strong>{values.join(', ')}</strong> cannot be empty.
                </MessageContent>
            );
        } else {
            this.fileUploadHandler()
        }
    }

    fileUploadHandler = () => {
        if (this.state.files) {
            const files = this.state.files;
            let reader;
            let form = {};
            if (files.length > 0) {
                Object.keys(files).map(key => {
                    reader = new FileReader();
                    reader.readAsDataURL(files[key]);
                    reader.onload = () => {
                        form.email = this.auth.email;
                        form.file_base64 = reader.result
                        console.log(form.file_base64);
                        form.ext = files[key].name.split('.').pop();
                        if (this.state.model.title) {
                            form.name = `${this.state.model.title}${key}`;
                        } else {
                            form.name = files[key].name.split('.')[0];
                        }
                        form.url = this.url
                        // axios.post('api/newsfeeds/upload', form)
                        // this.onSubmit()
                        console.log(reader);
                    }
                    return '';
                })
            } else {
                reader = new FileReader();
                reader.readAsDataURL(files);
                reader.onload = async () => {
                    form.email = this.auth.email;
                    form.file_base64 = reader.result
                    form.ext = files.name.split('.').pop();
                    if (this.state.model.title) {
                        form.name = this.state.model.title;
                    } else {
                        form.name = files.name.split('.')[0];
                    }
                    form.url = this.url
                    await axios.post('api/newsfeeds/upload', form)
                    this.onSubmit()
                };
            }
        } else {
            this.onSubmit()
        }
    }


    handleCancel = () => {
        const model = {
            title: undefined,
            subtitle: undefined,
            announcement: undefined,
            attachment: undefined,
            category: undefined,
            certain: undefined,
            file_type: undefined,
            author: this.auth.email,
            authorname: this.auth.fullname
        }
        this.setState({ model, visible: false });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    render() {
        const profile = `${axios.defaults.baseURL}storage/Users/${this.auth.email}/${this.auth.profile}`

        let carousel = this.state.show_images.map((image, index) => {
            return (
                <MDBCarouselItem key={index} itemId={index + 1}>
                    <img
                        className="d-block w-100"
                        src={image}
                        alt={index}
                    />
                </MDBCarouselItem>
            )
        })

        return (
            <Box className="mx-auto">
                <Row style={rowStyle}>
                    <Col span={2} className="d-flex align-items-center">
                        <div className="rounded-circle d-flex align-items-center border border-dark" style={{ height: 80, width: 80 }}>
                            <img
                                width={79}
                                height={79}
                                src={profile}
                                alt='avatar'
                                className='rounded-circle img-responsive mx-auto'
                            />
                        </div>
                    </Col>
                    <Col offset={1} span={20} className="d-flex align-items-center">
                        <div onClick={this.showModal} className='w-100 rounded-pill h-50 d-flex align-items-center stylish-color text-wrap' style={{ cursor: 'pointer' }}>
                            <span className="ml-3 text-white">
                                What announcement should we make today?
                            </span>
                        </div>
                    </Col>
                </Row>
                <Modal
                    visible={this.state.visible}
                    title='What announcement should we make today?'
                    onCancel={this.handleCancel}
                    footer={[
                        <button key="back" className="btn" onClick={this.handleCancel}>
                            Cancel
                        </button>,
                        <button className='btn btn-primary' key="submit" onClick={this.verification}>
                            Submit
                        </button>
                    ]}
                >
                    <Row style={rowStyle} className="border-bottom border-dark mb-2">
                        <Col className="mb-2" span={24}>
                            <Input
                                value={this.state.model.title}
                                placeholder="Title"
                                name='title'
                                onChange={(event) => this.changeHandler(event)}
                            />
                        </Col>
                        <Col className="mb-2" span={24}>
                            <Input
                                value={this.state.model.subtitle}
                                placeholder="Sub title"
                                name='subtitle'
                                onChange={(event) => this.changeHandler(event)}
                            />
                        </Col>
                        <Col span={this.state.model.category === 'certain' ? 16 : 24} className="mb-1">
                            <InputGroup compact>
                                <Input
                                    style={{ width: '25%' }}
                                    defaultValue="Category :"
                                    disabled={true}
                                />
                                <Select
                                    style={{ width: '75%' }}
                                    value={this.state.model.category || undefined}
                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.category = e
                                        this.setState({ model });
                                    }}
                                >
                                    <SelectOption value="campus">Campus</SelectOption>
                                    <SelectOption value="certain">Certain level</SelectOption>
                                </Select>
                            </InputGroup>
                        </Col>
                        <Col span={8} style={{ display: this.state.model.category === 'certain' ? 'block' : 'none' }}>
                            <Select
                                mode="multiple"
                                value={this.state.model.certain || undefined}
                                style={{ width: "100%" }}
                                onChange={(e) => {
                                    let { model } = this.state;
                                    model.certain = e
                                    this.setState({ model });
                                }}
                            >
                                {this.state.levels}
                                {/* <Option value="7">Grade 7</Option>
                            <Option value="8">Grade 8</Option>
                            <Option value="9">Grade 9</Option>
                            <Option value="10">Grade 10</Option> */}
                            </Select>
                        </Col>
                        <Textarea
                            className="mb-2"
                            rows={4}
                            value={this.state.model.announcement}
                            placeholder="Announcement"
                            name='announcement'
                            onChange={(event) => this.changeHandler(event)}
                        />
                    </Row>
                    <Row style={{ display: this.state.model.file_type ? 'none' : 'block' }}>
                        <Col span={8} className="text-center">
                            <Popover content="Post an image">
                                <label htmlFor="image" type="button" className="btn btn-outline-success">
                                    <FontAwesomeIcon size='3x' icon={faImage} />
                                </label>
                            </Popover>
                            <input id="image" name="image" onChange={(event) => this.changeHandler(event)} type="file" accept="image/x-png,image/gif,image/jpeg" className="d-none" />
                        </Col>
                        <Col span={8} className="text-center">
                            <Popover content="Post multiple images">
                                <label htmlFor="images" type="button" className="btn btn-outline-secondary">
                                    <FontAwesomeIcon size='3x' icon={faImages} />
                                </label>
                            </Popover>
                            <input id="images" name="images" onChange={(event) => this.changeHandler(event)} type="file" accept="image/x-png,image/gif,image/jpeg" multiple className="d-none" />
                        </Col>
                        <Col span={8} className="text-center">
                            <Popover content="Post a Youtube video">
                                <button className="btn btn-outline-danger" onClick={() => this.changeHandler('url')}>
                                    <FontAwesomeIcon size="3x" icon={faVideo} />
                                </button>
                            </Popover>
                        </Col>
                    </Row>
                    <Row style={{ display: this.state.model.file_type ? 'block' : 'none' }}>
                        <div className="text-right">
                            <Popover content="Clear all files">
                                <FontAwesomeIcon onClick={
                                    () => {
                                        let { model } = this.state;
                                        model.attachment = undefined;
                                        model.file_type = undefined;
                                        this.setState({
                                            model,
                                            show_image: undefined,
                                            show_images: [],
                                            show_url: undefined
                                        })
                                    }
                                } style={{ cursor: 'pointer' }} icon={faTimes} />
                            </Popover>
                        </div>
                        <Col span={24} style={{ display: this.state.model.file_type === 'image' ? 'block' : 'none' }}>
                            <img width="100%" height="auto" src={this.state.show_image} alt="Preview" />
                        </Col>
                        <Col span={24} style={{ display: this.state.model.file_type === 'images' ? 'block' : 'none' }}>
                            <MDBCarousel
                                activeItem={1}
                                length={this.state.show_images.length}
                                showControls={true}
                                showIndicators={true}
                                className="z-depth-1"
                                slide
                            >
                                <MDBCarouselInner>
                                    {carousel}
                                </MDBCarouselInner>
                            </MDBCarousel>
                        </Col>
                        <Col span={24} style={{ display: this.state.model.file_type === 'url' ? 'block' : 'none' }}>
                            <MDBIframe title="Youtube" src={this.state.show_url || 'https://www.youtube.com/embed/'} />
                            <Input
                                placeholder="Paste whole Youtube URL"
                                name='url'
                                onChange={(event) => this.changeHandler(event)}
                                addonAfter={
                                    <FontAwesomeIcon
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => this.handleClick()}
                                        icon={faPlayCircle}
                                        size='2x'
                                    />}
                            />
                        </Col>
                    </Row>
                </Modal>
            </Box >
        );
    }
}