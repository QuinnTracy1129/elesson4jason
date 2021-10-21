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
import LayoutContent from '../../../../components/utility/layoutContent';
import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import basicStyle from '../../../../config/basicStyle';
import { baguhin, itago, itala, tanong } from '../../../../talaan';
import Card from './card';


const getBadge = status => {
    switch (status) {
        case 'done': return 'bg-danger text-white rounded'
        case 'pending': return 'bg-warning text-dark rounded'
        case 'ongoing': return 'bg-primary text-white rounded'
        default: return 'bg-light text-dark rounded'
    }
}
const getStages = stage => {
    switch (stage) {
        case 'prep': return 'Preparatory'
        case 'elem': return 'Elementary'
        case 'jhs': return 'Junior High School'
        case 'shs': return 'Senior High School'
        case 'tertiary': return 'College'
        case 'gs': return 'Masteral'
        default: return 'PhD'
    }
}
const getSem = sem => {
    switch (sem) {
        case 1: return 'First Semister'
        case 2: return 'Second Semister'
        default: return 'Third Semister'
    }
}

export default class extends Component {
    constructor() {
        super()
        let auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'batches',
            subentity: `batches`,
            models: [],
            user: auth,
            model: { SY: '', e_start: '', status: '' },
            exhibit: false,
            activeIndex: 0,
            auth: auth,
            stages: Object.keys(auth.school.stages)
        };
    }
    componentDidMount() { this.onSearch() }
    onSearch = (key) => {
        tanong(this.state.subentity, key).then(data => {
            this.setState({ models: [...data] })
        })
    }
    onExhibit = (i) => {
        let model = this.state.models[i];
        this.setState({
            model,
            newModel: false,
            activeIndex: i
        });
        this.switchExhibitStatus()
    }
    newExhibit = () => {
        this.setState({
            model: {
                id: ''
                , SY: ''
                , e_start: ''
                , status: ''
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
        console.log(this.state.model);
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
        let writer = this.state.models.map((model, index) => {
            return (
                <tr key={model.id}>
                    <td>{index + 1}</td>
                    <td>{model.SY}</td>
                    <td>{getStages(model.stages)}</td>
                    <td>{getSem(model.semester)}</td>
                    <td style={{ textAlign: "center" }}>{model.e_start}</td>
                    <td style={{ textAlign: "center" }}>{model.e_end}</td>
                    <td style={{ textAlign: "center" }}><b className={getBadge(model.status)}>{model.status}</b></td>
                    <td style={{ textAlign: "center" }}>{model.c_start}</td>
                    <td style={{ textAlign: "center" }}>{model.c_end}</td>
                    <td>
                        <ButtonGroup>
                            <Popover content="Edit" >
                                <Button className="btn btn-outline-info" onClick={this.onExhibit.bind(this, index, model.id)}>
                                    <FontAwesomeIcon icon={faEdit} />
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
                            <h1>Academic Year</h1>
                        </Col>
                        <Col md={1} sm={12} xs={24} style={colStyle}>
                            <ButtonGroup>
                                <Popover content='Add a Batch' >
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
                                <th rowSpan="2">#</th>
                                <th rowSpan="2">Batch</th>
                                <th rowSpan="2">Stages</th>
                                <th rowSpan="2">Semester</th>
                                <th colSpan="2" style={{ textAlign: "center" }}>Enrollment</th>
                                <th rowSpan="2" style={{ textAlign: "center" }}>Status</th>
                                <th colSpan="2" style={{ textAlign: "center" }}>Classes</th>
                                <th rowSpan="2">Action</th>
                            </tr>
                            <tr>
                                <th style={{ textAlign: "center" }}>Start</th>
                                <th style={{ textAlign: "center" }}>End</th>
                                <th style={{ textAlign: "center" }}>Start</th>
                                <th style={{ textAlign: "center" }} >End</th>
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
                    user={this.state.user}
                    models={this.state.models}
                    stages={this.state.stages}
                />
            </LayoutContentWrapper>
        );
    }
}
