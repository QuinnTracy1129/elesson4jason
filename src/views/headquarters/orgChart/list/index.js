import '@fortawesome/fontawesome-free/css/all.min.css';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import Button, { ButtonGroup } from '../../../../components/uielements/button';
import Popover from '../../../../components/uielements/popover';
import LayoutContent from '../../../../components/utility/layoutContent';
import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import basicStyle from '../../../../config/basicStyle';
import { baguhin, itago, tanong } from '../../../../talaan';
import Card from './card';

export default class extends Component {
    constructor() {
        super()
        this.auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'users',
            models: [],
            model: '',
            exhibit: false,
            activeIndex: undefined,
            positions: []
        };
        this.key = document.getElementById('InputTopbarSearch');
    }
    componentDidMount() {
        this.onSearch();
        this.key.addEventListener('keyup', this.onSearch);
    }
    componentWillUnmount() { this.key.removeEventListener('keyup', this.onSearch); }
    onSearch = () => {
        const params = { key: this.key.value }
        tanong(this.state.entity, params).then(datas => {
            let { positions } = this.state;
            datas.map(data => {
                if (!positions.includes(data.position)) {
                    positions.push(data.position);
                }
                return "Mapped!";
            })

            this.setState({ models: datas })
            console.log(this.state.models)
        })
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
    onUpdate = () => {
        baguhin(
            this.state.entity,
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
        this.state.newModel ? this.onUpdate() : this.onUpdate();
        this.switchExhibitStatus()
    }
    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        let writer = this.state.models.map((model, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td >{model.position}</td>
                    <td >{model.fullname}</td>
                    {/* <td>{this.state.models[key]}</td> */}
                    <td>
                        <ButtonGroup>
                            <Popover content="Promote" >
                                <Button className="btn btn-outline-info" onClick={this.onExhibit.bind(this, index)}>
                                    <FontAwesomeIcon icon={faAngleDoubleUp} />
                                </Button>
                            </Popover>
                            <Popover content="Demote" placement="right" >
                                <Button className="btn btn-outline-danger" onClick={this.onDelete.bind(this, index)}>
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
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
                            <h1>Organizational Chart List</h1>
                            <small>{ }</small>
                        </Col>
                        {/* <Col md={1} sm={12} xs={24} style={colStyle}>
                            <ButtonGroup>
                                <Popover content='Add a Org Chart' >
                                    <Button className="btn btn-outline-primary" onClick={this.newExhibit}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </Popover>
                            </ButtonGroup>
                        </Col> */}
                    </Row>
                    <MDBTable striped hover responsive>
                        <MDBTableHead>
                            <tr>
                                <th>#</th>
                                <th>Position</th>
                                <th>Employee</th>
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
