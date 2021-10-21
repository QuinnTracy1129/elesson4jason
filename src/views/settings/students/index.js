import '@fortawesome/fontawesome-free/css/all.min.css';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import Popover from '../../../components/uielements/popover';
import LayoutContent from '../../../components/utility/layoutContent';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import basicStyle from '../../../config/basicStyle';
import { baguhin, itago, itala, tanong } from '../../../talaan';
import Card from './card';



// import { counter } from '@fortawesome/fontawesome-svg-core';



export default class extends Component {
    constructor() {
        super()
        let auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'students',
            models: [],
            model: '',
            exhibit: false,
            activeIndex: 0,
            auth: auth
        };
    }
    componentDidMount() { this.onSearch() }

    onSearch = (key) => {
        let params = {};
        if (key) {
            let p = key.split(',');
            if (p.length > 1) {
                params['lname'] = p[0].trim();
                params['key'] = p[1].trim();
            } else {
                params['key'] = key
            }
        }
        tanong(this.state.entity, params).then(data => { this.setState({ models: [...data] }) })
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
            model: {
                id: '',
                name: '',
                display_name: '',
            },
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
    handleSearchReset = (key) => this.onSearch(key)

    // Callback function
    closeModal = () => this.switchExhibitStatus()
    handleSubmit = (model) => {
        this.setState({ model });
        this.state.newModel ? this.onSave() : this.onUpdate();
        this.switchExhibitStatus()
    }
    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        let writer = this.state.models.map((model, index) => {
            return (
                <tr key={model.id}>
                    <td>{index + 1}</td>
                    <td>{model.fullname}</td>
                    <td>{model.is_male ? 'Male' : 'Female'}</td>
                    <td>{model.lrn}</td>
                    <td>{model.dob}</td>
                    <td>{model.pob}</td>
                    <td>
                        <ButtonGroup>
                            <Popover content="Edit" placement="left">
                                <Button className="btn btn-outline-info">
                                    <FontAwesomeIcon icon={faEdit} onClick={this.onExhibit.bind(this, index, model.id)} />
                                </Button>
                            </Popover>
                            <Popover content="Delete" placement="right"                            >
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
                            <h2>Student's Ledger</h2>
                        </Col>
                        <Col md={1} sm={12} xs={24} style={colStyle}>
                            <ButtonGroup>
                                <Popover content='Add a student' >
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
                                <th>Gender</th>
                                <th>LRN</th>
                                <th>DOB</th>
                                <th>POB</th>
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
