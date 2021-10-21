import '@fortawesome/fontawesome-free/css/all.min.css';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import Button, { ButtonGroup } from '../../../../components/uielements/button';
import Input, { InputGroup } from '../../../../components/uielements/input';
import LayoutContent from '../../../../components/utility/layoutContent';
import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import { baguhin, hanapin } from '../../../../talaan';
import Card from './card';


export default class extends Component {
    constructor() {
        super()
        let auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: `schools/details`,
            model: '',
            exhibit: false,
            activeIndex: 0,
            message: '',
            auth: auth,
        };
    }
    componentDidMount() { this.onSearch() }

    onSearch = (key) => {
        let params = {};
        if (key) { params['key'] = key }
        hanapin(this.state.entity).then(data => {
            this.setState({ model: data }, () => console.log('starts here'))
        })
    }
    onExhibit = (model) => {
        // console.log(model);
        this.setState({
            model: model,
            newModel: false
        });
        this.switchExhibitStatus()
    }
    newExhibit = () => {
        this.setState({
            model: {},
            newModel: true
        });
        this.switchExhibitStatus()
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, exhibit: false });
        }, 2000);
    };
    onUpdate = () => {
        baguhin(
            this.state.entity,
            this.state.model.id,
            this.state.model
        )
            .then(
                data => {
                    let { models } = this.state;
                    models[this.state.activeIndex] = data;
                    this.setState({ models: models })
                });
    }
    switchExhibitStatus() { this.setState({ exhibit: !this.state.exhibit }) }
    handleSearchReset = (key) => this.onSearch(key)

    // Callback function
    closeModal = () => this.switchExhibitStatus()
    handleSubmit = (model) => {
        this.setState({ model: model });
        console.log(model)
        this.state.newModel ? this.onSave() : this.onUpdate();
        this.switchExhibitStatus()
    }
    render() {
        console.log(this.state.model);
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <InputGroup size="large" style={{ marginBottom: '15px' }}>
                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Logo"
                                    disabled={true}
                                // style={{ width: '80%' }}
                                // placeholder="Enter Logo"
                                // value={this.state.model.logo || ''}

                                // onChange={(e) => {
                                //     let { model } = this.state;
                                //     model.logo = e.target.value
                                //     this.setState({ model });
                                // }}
                                />

                            </InputGroup>
                        </Col>
                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>

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
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Icon"
                                    disabled={true}
                                />
                            </InputGroup>
                        </Col>

                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="School Name"
                                    disabled={true}
                                />
                                <Input
                                    disabled={true}
                                    style={{ width: '80%' }}
                                    placeholder="Enter School"
                                    value={this.state.model.name || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        console.log(this.state.model);
                                        model.name = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    disabled={true}
                                    style={{ width: '75%' }}
                                    placeholder="Enter acronym"
                                    value={this.state.model.acronyms || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.acronyms = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                                <Input
                                    style={{ width: '25%' }}
                                    defaultValue="The Acronym"
                                    disabled={true}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Batch"
                                    disabled={true}
                                />
                                <Input
                                    disabled={true}
                                    style={{ width: '80%' }}
                                    placeholder="Enter Batch"
                                    value={this.state.model.batch_sy || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.batch_sy = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '80%' }}
                                    placeholder="Enter History"
                                    value={this.state.model.stages || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.stages = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="School Level"
                                    disabled={true}
                                />
                            </InputGroup>
                        </Col>

                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Location"
                                    disabled={true}
                                />
                                <Input
                                    disabled={true}
                                    style={{ width: '80%' }}
                                    value={this.state.model.address || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        console.log(this.state.model);
                                        model.name = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    disabled={true}
                                    style={{ width: '75%' }}
                                    placeholder="Enter Division"
                                    value={this.state.model.division || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.division = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                                <Input
                                    style={{ width: '25%' }}
                                    defaultValue="The Division"
                                    disabled={true}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Num Of Employee"
                                    disabled={true}
                                />
                                <Input
                                    disabled={true}
                                    style={{ width: '80%' }}
                                    placeholder="Enter employees"
                                    value={this.state.model.employees || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.employees = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    disabled={true}
                                    style={{ width: '80%' }}
                                    placeholder="Enter School Code"
                                    value={this.state.model.code || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.code = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="School Code"
                                    disabled={true}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="Hymn"
                                    disabled={true}
                                />
                                <TextArea
                                    disabled={true}
                                    autosize={{ minRows: 2 }}
                                    style={{ width: '80%' }}
                                    placeholder="Enter Logo"
                                    value={this.state.model.hymn || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.hymn = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                            </InputGroup>
                        </Col>
                        <Col span="12">
                            <InputGroup compact style={{ marginBottom: '15px' }}>

                                <TextArea
                                    disabled={true}
                                    autosize={{ minRows: 2 }}
                                    style={{ width: '80%' }}
                                    placeholder="Enter Icon"
                                    value={this.state.model.tagline || ''}

                                    onChange={(e) => {
                                        let { model } = this.state;
                                        model.tagline = e.target.value
                                        this.setState({ model });
                                    }}
                                />
                                <Input
                                    style={{ width: '20%' }}
                                    defaultValue="School Moto"
                                    disabled={true}
                                />
                            </InputGroup>
                        </Col>

                        <Col>
                            <ButtonGroup>
                                <Button className="btn btn-outline-info" onClick={this.onExhibit.bind(this, this.state.model)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </InputGroup>

                </LayoutContent>
                <Card
                    model={this.state.model}
                    newModel={this.state.newModel}
                    exhibit={this.state.exhibit}
                    onClose={this.closeModal}
                    onSubmit={this.handleSubmit}
                />
            </LayoutContentWrapper>
        );
    }
}
