import '@fortawesome/fontawesome-free/css/all.min.css';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Popover, Row } from 'antd';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import { InputGroup } from '../../../components/uielements/input';
import Select, { SelectOption } from '../../../components/uielements/select';
import Box from '../../../components/utility/box';
import LayoutContent from '../../../components/utility/layoutContent';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import basicStyle from '../../../config/basicStyle';
import { baguhin, itala, listahan, tanong } from '../../../talaan';




const Option = SelectOption;
const getBadge = index => {
    switch (index) {
        case 0: return 'primary'
        case 1: return 'secondary'
        case 2: return 'success'
        case 3: return 'danger'
        case 4: return 'warning'
        case 5: return 'info'
        case 6: return 'light'
        default: return 'dark'
    }
}

export default class extends Component {
    constructor() {
        super()
        let auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'loads',
            employees: [],
            levels: [],
            level: undefined,
            subjects: [],
            model: '',
            exhibit: false,
            activeIndex: 0,
            auth: auth,
            stage: undefined
        };
        this.auth = auth;
    }
    async componentDidMount() {
        const cater = Object.keys(this.state.auth.school.stages);
        await listahan('levels', { key: cater }).then(
            data => { this.setState({ levels: [...data], level: data[0].id }) }
        )
    }
    handlesSubject = async (level) => {
        const params = { level: level }
        await listahan(`subjects`, params).then(
            data => { this.setState({ subjects: [...data], level: level }) }
        )
        const model = this.state.levels.find(newlevel => newlevel.id === level);
        if (this.state.stage !== model.stage) {
            this.setState({ stage: model.stage })
            this.handlesEmployee(model.stage)
        }
    }
    handlesEmployee = (stage) => {
        let params = { stage: stage };
        tanong(`${this.state.entity}/access`, params).then(data => { this.setState({ employees: [...data] }) })
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, exhibit: false });
        }, 2000);
    };
    onSave = async (i) => {
        let model = this.state.employees[i]
        let subjects = [];
        await model.accessloads.subject_ledger.map((subj) => subjects.push(subj.id))

        let load = undefined;
        if (model.accessloads.id) {
            load = {
                user_id: this.state.auth.id,
                subjects: subjects,
            }
            baguhin(
                this.state.entity,
                model.accessloads.id,
                load
            )
                .then(
                    data => {
                        let { employees } = this.state;
                        employees[i].accessloads = data;
                        this.setState({ employees })
                    });

        } else {
            load = {
                user_id: this.state.auth.id,
                batch_id: this.state.auth.batch_id,
                prof_id: model.id,
                subjects: subjects
            }
            itala(this.state.entity, load)
                .then(
                    data => {
                        let { employees } = this.state;
                        employees.push(data);
                        this.setState({ employees });
                    });
        }
    }
    handleSearchReset = (key) => this.handlesEmployee(key)
    onChange = e => { this.setState({ [e.target.name]: e.target.value }) }
    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        let writer = this.state.employees.map((model, index) => {
            let load = [];
            if (model.accessloads) {
                model.accessloads.subject_ledger.map((subject) => {
                    if (subject) {
                        if (this.state.level === subject.level_id) {
                            load.push(subject.code)
                        }
                    }
                    return "Good!";
                })
            }
            return (
                <tr key={model.id}>
                    <td>{index + 1}</td>
                    <td>{model.url}</td>
                    <td>{model.fullname}</td>
                    <td>
                        <Select mode="multiple"
                            onChange={(e) => {
                                // alert(e.length)
                                if (e.length > 0) {
                                    let val = e[e.length - 1]
                                    const subj = this.state.subjects.find(subject => subject.code === val)
                                    let employees = this.state.employees
                                    let model = employees[index];
                                    if (model.accessloads) {
                                        let existVal = model.accessloads.subject_ledger.find(subject => subject.code === val)
                                        if (existVal) {
                                            model.accessloads.subject_ledger.splice(e.length)
                                        } else {
                                            model.accessloads.subject_ledger.push(subj)
                                        }
                                    } else {
                                        model['accessloads'] = { 'subject_ledger': [subj] }
                                    }

                                    employees[index] = model;

                                    this.setState({ employees });
                                }

                            }}
                            style={{ width: '80%' }} placeholder="Select Subjects" value={load} >
                            {this.state.subjects.map((subject) => {
                                return ([<Option value={subject.code}>{subject.code}</Option>,])
                            })}
                        </Select>
                    </td>
                    <td>
                        <ButtonGroup>
                            <Popover content="Save" >
                                <Button onClick={this.onSave.bind(this, index)} className="btn btn-outline-success">
                                    <FontAwesomeIcon icon={faCheck} />
                                </Button>
                            </Popover>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
        return (
            <LayoutContentWrapper>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={6} sm={12} xs={24} style={colStyle}>
                        <Box title={<h2>Subjects</h2>} subtitle="Draggable">
                            <InputGroup compact style={{ marginBottom: '25px' }}>
                                <Select type="multiple" style={{ width: '50%' }} placeholder="Select Levels" onChange={this.handlesSubject}>
                                    {this.state.levels.map((model) => {
                                        return (<Option value={model.id} >{model.fullname}</Option>)
                                    })}
                                </Select>
                            </InputGroup>
                            <MDBContainer>
                                <MDBListGroup>
                                    {
                                        this.state.levels.length > 0 ?
                                            this.state.subjects.map((subject, index) => { return (<MDBListGroupItem color={getBadge(index)}>{subject.code} | {subject.description}</MDBListGroupItem>) })
                                            :
                                            <MDBListGroupItem href="#">Select Fields First</MDBListGroupItem>
                                    }

                                </MDBListGroup>
                            </MDBContainer>
                        </Box>
                    </Col>
                    <Col md={18} sm={12} xs={24} style={colStyle}>
                        <LayoutContent>
                            <MDBTable striped hover responsive>
                                <MDBTableHead>
                                    <tr>
                                        <th>#</th>
                                        <th>img</th>
                                        <th>Name</th>
                                        <th>Access Loads</th>
                                        <th>Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>{writer}</MDBTableBody>
                            </MDBTable>
                        </LayoutContent>
                    </Col>
                </Row>
            </LayoutContentWrapper >
        );
    }
}
