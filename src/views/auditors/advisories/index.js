import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import { Row, Col } from 'antd';
import basicStyle from '../../../config/basicStyle';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Popover from '../../../components/uielements/popover';



import { listahan, tanong, itala, baguhin, itago } from '../../../talaan';
import Card from './card';



export default class extends Component {
    constructor() {
        super()
        let auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'advisories',
            URLlevel: `levels`,
            subEntity: 'sections',
            levels: [],
            sections: [],
            models: [],
            level: '',
            model: { name: '', display_name: '' },
            exhibit: false,
            activeIndex: 0,
            auth: auth,
            batch: auth.batch_id
        };
    }
    async componentDidMount() {
        const cater = this.state.auth.stages;
        await listahan(this.state.URLlevel, { key: cater }).then(
            data => { this.setState({ levels: [...data], level: data[0].id }) }
        )
        await listahan(this.state.subEntity, { key: this.state.level }).then(
            data => { this.setState({ sections: [...data] }) }
        )
        if (this.state.sections.length > 0) {
            this.onSearch(this.state.sections[0].id)
        }
    }
    onSections = async (e) => {
        await listahan(this.state.subEntity, { key: e }).then(
            data => { this.setState({ sections: [...data] }) }
        )
        this.onSearch(e)
    }
    onSectionChage = (e) => { this.onSearch(e.target.value) }
    onSearch = (key) => {
        const params = { batch: this.state.batch, level: this.state.level, section: key }
        tanong(this.state.entity, params).then(data => {
            this.setState({ models: [...data] })
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
        const { rowStyle, colStyle, gutter } = basicStyle;
        let writer = this.state.models.map((model, index) => {
            return (
                <tr key={model.id}>
                    <td>{index + 1}</td>
                    <td>{model.url}</td>
                    <td>{model.student.fullname}</td>
                    <td>{model.student.dob}</td>
                    <td>{model.student.age}</td>
                    <td>{model.created_at}</td>
                    <td>
                        <ButtonGroup>
                            <Popover
                                content="View"
                                placement="left"
                            >
                                <Button className="btn btn-outline-success" onClick={this.onExhibit.bind(this, index)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                            </Popover>
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
                            <h1>Advisory Class</h1>
                        </Col>
                        <select id="levels" onChange={this.onSections}>
                            {this.state.levels.map((model) => {
                                return (
                                    <option value={model.id}>{model.fullname}</option>
                                )
                            })}
                        </select>:
                            <select id="sections" onChange={this.onSectionChage}>
                            {this.state.sections.map((model) => {
                                return (<option value={model.id}>{model.name}</option>)
                            })}
                        </select>
                    </Row>
                    <MDBTable striped hover responsive>
                        <MDBTableHead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>DOB</th>
                                <th>Age</th>
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
