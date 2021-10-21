import '@fortawesome/fontawesome-free/css/all.min.css';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import Button, { ButtonGroup } from '../../../../components/uielements/button';
import Popover from '../../../../components/uielements/popover';
import LayoutContent from '../../../../components/utility/layoutContent';
import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import basicStyle from '../../../../config/basicStyle';
import { baguhin, hanapin, listahan, tanong } from '../../../../talaan';


export default class extends Component {
    constructor() {
        super()
        this.auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'forbidden/attached/authority/specializations',
            subEntity: 'schools/details',
            models: [],
            model: '',
            stages: [],
            datas: [],
            specializations: undefined,
            activeIndex: 0,
            options: {}
        };
        this.key = document.getElementById('InputTopbarSearch');
    }
    async componentDidMount() {
        this.key.addEventListener('keydown', (e) => { if (e.key === 'Enter') { this.onSearch(); this.key.value = ''; } });
        this.onSearch();
    }
    componentWillUnmount() { this.key.removeEventListener('keyup', this.onSearch); }
    onSearch = async () => {
        await hanapin(this.state.subEntity).then(data => {
            this.setState({ datas: data })
        })
        tanong(this.state.entity, this.state.datas.stages).then(data => {
            this.setState({ models: [...data] })
        })
        await listahan(this.state.entity, this.state.datas.stages).then((data) => {
            this.setState({ specializations: [...data] })
        })
    }
    newExhibit = async () => {
        this.state.specializations.forEach(model => {
            let { options } = this.state
            options[model.acronym] = model.acronym
            this.setState({ options })
        });
        let speacialization = this.state.options
        await Swal.fire({
            input: 'select',
            inputOptions: { 'speacialization': speacialization },
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value) {
                        this.onTag(value)
                        resolve()
                    } else {
                        resolve('You need to select speacialization :)')
                    }
                })
            }
        })
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, exhibit: false });
        }, 2000);
    };
    onDelete = async (i, pk) => {
        let { datas } = this.state
        datas.stages.jhs.splice(datas.stages.jhs.indexOf(pk), 1)
        this.setState({ datas })
        console.log(this.state.datas);
        baguhin(
            this.state.subEntity,
            this.state.datas,
            false
        ).then(data => {
            listahan(this.state.entity, data.stages).then((data) => {
                this.setState({ specializations: [...data] })
            })
            Swal.fire(
                'Untagged!',
                'Untag successfully.',
                'success'
            )
            let models = this.state.models;
            models.splice(i, 1);
            this.setState({ models });
        })
    }
    handleSearchReset = (key) => this.onSearch(key)

    // Callback function
    onTag = (acronym) => {
        delete this.state.options[acronym]
        let { datas } = this.state
        datas.stages.jhs.push(acronym)
        this.setState({ datas })
        baguhin(
            this.state.subEntity,
            this.state.datas
        )
            .then(
                data => {
                    tanong(this.state.entity, data.stages).then(data => {
                        this.setState({ models: [...data] }, () => console.log(this.state))
                    })
                    listahan(this.state.entity, data.stages).then((data) => {
                        this.setState({ specializations: [...data] })
                    })
                });

    }
    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        let writer = this.state.models.map((model, index) => {
            return (
                <tr key={model.id}>
                    <td>{index + 1}</td>
                    <td>{model.name}</td>
                    <td>{model.acronym}</td>
                    <td>{model.activity}</td>
                    <td>
                        <ButtonGroup>
                            <Popover content="Untag" placement="right" >
                                <Button className="btn btn-outline-danger" onClick={this.onDelete.bind(this, index, model.acronym)}>
                                    <FontAwesomeIcon icon={faTimes} />
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
                            <h1>Specializations</h1>
                        </Col>
                        <Col md={1} sm={12} xs={24} style={colStyle}>
                            <ButtonGroup>
                                <Popover content='Add a Specialization' >
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
                                <th>Acronym</th>
                                <th>Specialization</th>
                                <th>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>{writer}</MDBTableBody>
                    </MDBTable>
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}
