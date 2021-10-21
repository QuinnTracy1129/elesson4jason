import '@fortawesome/fontawesome-free/css/all.min.css';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import Button, { ButtonGroup } from '../../../../components/uielements/button';
import Popover from '../../../../components/uielements/popover';
import Select, { SelectOption } from '../../../../components/uielements/select';
import LayoutContent from '../../../../components/utility/layoutContent';
import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import basicStyle from '../../../../config/basicStyle';
import { baguhin, itago, itala, listahan, tanong } from '../../../../talaan';
import Card from './card';

const Option = SelectOption;


export default class extends Component {
    constructor() {
        super()
        this.auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'sections',
            models: [],
            levels: [],
            sections: [],
            model: undefined,
            exhibit: false,
            activeIndex: 0,
            level: undefined,
        };
    }
    componentDidMount() {
        tanong(this.state.entity).then(data => this.setState({ models: [...data] }))
        listahan('levels').then(data => {
            const levels = data.map((model) => <Option value={model.id}>{model.fullname}</Option>)
            this.setState({ levels })
        })
    }
    handelsSearch = (level) => {
        const sections = this.state.models.filter(model => model.level_id === level)
        this.setState({ sections })
        console.log(sections);
    }
    onExhibit = (i) => {
        let model = this.state.models[i];
        this.setState({
            model: model,
            newModel: false,
            activeIndex: i
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

    onSave = () => {
        itala(this.state.entity, this.state.model)
            .then(
                data => {
                    let { models } = this.state;
                    models.push(data);
                    this.setState({ models: models });
                });
    }
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
    onDelete = async (i, pk) => {
        let has_removed = await itago(this.state.entity, pk)
        if (has_removed) {
            let models = this.state.models;
            models.splice(i, 1);
            this.setState({ models });
        }
    }
    switchExhibitStatus() { this.setState({ exhibit: !this.state.exhibit }) }
    // handleSearchReset = (key) => this.onSearch(key)

    // Callback function
    closeModal = () => this.switchExhibitStatus()
    handleSubmit = (model) => {
        this.setState({ model: model });
        console.log(model)
        this.state.newModel ? this.onSave() : this.onUpdate();
        this.switchExhibitStatus()
    }
    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        let writer = this.state.sections.map((model, index) => {
            return (
                <tr key={model.id}>
                    <td>{index + 1}</td>
                    <td>{model.name}</td>
                    <td>{model.adviser}</td>
                    <td >{model.trackStrand || model.activity}</td>
                    <td style={{ textAlign: "center" }}>{model.accumulate}</td>
                    <td >{model.status}</td>
                    <td>
                        <ButtonGroup>
                            <Popover content="Edit" >
                                <Button className="btn btn-outline-info">
                                    <FontAwesomeIcon icon={faEdit} onClick={this.onExhibit.bind(this, index, model.id)} />
                                </Button>
                            </Popover>
                            <Popover
                                content="Delete"
                                placement="right"
                            >
                                <Button className="btn btn-outline-danger" onClick={this.onDelete.bind(this, index, model.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Popover>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={23} sm={12} xs={24} style={colStyle}>
                            <div>
                                <span style={{ fontSize: 50 }}>Section's Ledger</span>
                                <Select style={{ position: "relative", width: '30%' }}
                                    onChange={(e) => { this.handelsSearch(e) }}>
                                    {this.state.levels}
                                </Select>
                            </div>
                        </Col>


                        <Col md={1} sm={12} xs={24} style={colStyle}>
                            <ButtonGroup>
                                <Popover content='Add a Section' >
                                    <Button className="btn btn-outline-primary" onClick={this.newExhibit}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </Popover>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <MDBTable striped hover responsive>
                        <MDBTableHead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Adviser</th>
                                <th>Track/Strand</th>
                                <th>Number of Students</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>{writer}</MDBTableBody>
                    </MDBTable>
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
