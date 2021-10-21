import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faPlus } from '@fortawesome/free-solid-svg-icons'
import Tabs, { TabPane } from '../../../components/uielements/tabs';
import { MDBCol, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { baguhin, hanapin, listahan } from '../../../talaan';
import ButtonGroup from 'antd/lib/button/button-group';
import { Button, Popover } from 'antd';
import Card from './card'


export default class extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.match);
        this.advisory = JSON.parse(localStorage.getItem('advisory'));
        this.state = {
            url: 'classrooms',
            subject_id: this.props.match.params.subject,
            classroom_id: this.props.match.params.classroom,
            classroom: undefined,
            subject: undefined,
            modules: [],
            asgmts: [],
            students: [],
            model: {},
            exhibit: false,
            target: "modules"
        };
    }
    callback = (key) => {
        switch (key) {
            case '1':
                this.setState({ target: 'modules' })
                break;
            case '2':
                this.setState({ target: 'asgmts' })
                break;

            default:
                this.setState({ target: 'wala' })
                break;
        }
        this.setState({ key })
    }
    componentDidMount() {
        hanapin(this.state.url, this.props.match.params.classroom)
            .then(classroom => {
                console.log(classroom);
                let subject = classroom.schedules.find(schedule => schedule.subject_id === Number(this.props.match.params.subject))
                console.log(subject);
                let modules = subject.modules
                let asgmts = subject.asgmts
                this.setState({ classroom, subject, modules, asgmts })
            });
        listahan('advisories', { classroom: this.props.match.params.classroom })
            .then(datas => {
                let students = datas.map((data, index) => {
                    return (
                        <tr><td>{index + 1}</td>
                            <td>{data.student.lrn}</td>
                            <td>{data.fullname}</td>
                            <td>{data.student.gender}</td>
                            <td>{data.student.age}</td>
                            <td>{data.student.phone}</td>
                            <td>{data.student.fulladdress}</td>
                        </tr>
                    )
                })
                this.setState({ students })
            })
    }

    onSave = (model) => {
        let { classroom, target } = this.state
        let subject = classroom.schedules.find(schedule => schedule.subject_id === Number(this.props.match.params.subject))
        let value = subject[target].push(model)
        classroom.schedules[target] = value
        baguhin(this.state.url, this.state.classroom.id, classroom).then(data => { this.switchExhibitStatus() })
        console.log(this.state.classroom);
    }
    //exhibit
    switchExhibitStatus = () => { this.setState({ exhibit: !this.state.exhibit }) }
    newExhibit = () => {
        this.setState({
            model: { title: '' },
            newModel: true
        });
        this.switchExhibitStatus()
    }
    render() {
        let modules = this.state.modules.map((module, index) => {
            return (
                <tr><td>{index + 1}</td>
                    <td>{module.title}</td>
                    <td>{module.text}</td>
                    <td>{module.posted_at}</td>
                    <td>{module.link}</td>
                </tr>
            )
        })
        let asgmts = this.state.asgmts.map((asgmt, index) => {
            return (
                <tr><td>{index + 1}</td>
                    <td>{asgmt.title}</td>
                    <td>{asgmt.text}</td>
                    <td>{asgmt.posted_at}</td>
                    <td>{asgmt.link}</td>
                </tr>
            )
        })
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <label className="h1">Math 7</label>
                    <Tabs onChange={this.callback} type="card">
                        <TabPane
                            tab={<span><FontAwesomeIcon icon={faCogs} /> Module</span>} key="1">
                            <MDBCol className="text-right">
                                <ButtonGroup>
                                    <Popover content='Add a Module' >
                                        <button className="btn btn-outline-primary rounded" onClick={this.newExhibit}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </Popover>
                                </ButtonGroup>
                            </MDBCol>
                            <MDBTable striped hover responsive>
                                <MDBTableHead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Date Posted</th>
                                        <th>Download</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {modules}
                                </MDBTableBody>
                            </MDBTable>
                        </TabPane>
                        <TabPane
                            tab={<span><FontAwesomeIcon icon={faCogs} /> Assignments</span>} key="2">
                            <MDBCol>
                                <ButtonGroup>
                                    <Popover content='Add a Section' >
                                        <Button className="btn btn-outline-primary" onClick={this.newExhibit}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </Button>
                                    </Popover>
                                </ButtonGroup>
                            </MDBCol>
                            <MDBTable striped hover responsive>
                                <MDBTableHead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Date Posted</th>
                                        <th>Download</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {asgmts}
                                </MDBTableBody>
                            </MDBTable>
                        </TabPane>
                        <TabPane
                            tab={<span><FontAwesomeIcon icon={faCogs} /> Students</span>} key="3">

                            <MDBTable striped hover responsive>
                                <MDBTableHead>
                                    <tr>
                                        <th>#</th>
                                        <th>LRN</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Age</th>
                                        <th>Contact</th>
                                        <th>Address</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>{this.state.students}</MDBTableBody>
                            </MDBTable>
                        </TabPane>
                    </Tabs>
                </LayoutContent>
                <Card
                    exhibit={this.state.exhibit}
                    model={this.state.model}
                    fillables={['title', 'link', 'text']}
                    onClose={this.switchExhibitStatus}
                    onSubmit={this.onSave}
                />
            </LayoutContentWrapper >
        );
    }
}
