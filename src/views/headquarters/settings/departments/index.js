import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Title from '../../../../components/header/index';
import { SelectOption } from '../../../../components/uielements/select';
import LayoutContent from '../../../../components/utility/layoutContent';
import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import { browse, destroy } from "../../../../redux/BREAD/actions";
import { listahan } from '../../../../talaan';
import Card from './card';
import { Dummy } from "./dummy";
import Writer from './writer';

class Index extends Component {
    constructor() {
        super()
        this.auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'departments',
            model: {},
            visible: false,
            faculties: [],
            facultyRef: []
        };
    }
    componentDidMount() {
        this.onSearch();
        listahan('faculties').then(faculties => faculties && this.setState({ faculties }))
    }
    onSearch = async (key) => await this.props.browse(this.state.entity, key);

    exhibit = async (i) => {
        const model = this.props.models[i];
        let facultyRef = this.state.faculties.map((model) => <SelectOption value={model.id}>{model.fullname}</SelectOption>)
        //  pop(): Remove an item from the end of an array.
        //  push(): Add items to the end of an array.
        //  shift(): Remove an item from the beginning of an array.
        //  unshift(): Add items to the beginning of an array.
        if (model.head) { facultyRef.unshift(<SelectOption value={model.head.id}>{model.head.fullname}</SelectOption>) }
        if (model.master) { facultyRef.unshift(<SelectOption value={model.master.id}>{model.master.fullname}</SelectOption>) }
        facultyRef.unshift(<SelectOption value={null}>Please select faculty</SelectOption>)
        this.setState({ model, facultyRef });
        this.toggle()
    }
    dummy = () => {
        let facultyRef = this.state.faculties.map((model) => <SelectOption value={model.id}>{model.fullname}</SelectOption>)
        this.setState({ model: Dummy, facultyRef });
        this.toggle()
    }
    toggle() { this.setState({ visible: !this.state.visible }) }
    // Callback function
    closeModal = () => this.toggle()
    handlesDestroy = (pkey) => this.props.destroy(this.state.entity, pkey)

    render() {
        const { model, visible, facultyRef } = this.state;
        const { models } = this.props;
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <Title
                        title='Lists Of Departments'
                        dummy={this.dummy}
                    />

                    <Writer
                        models={models}
                        exhibit={this.exhibit}
                        destroy={this.handlesDestroy}
                    />
                    <Card
                        facultyRef={facultyRef}
                        model={model}
                        visible={visible}
                        onClose={this.closeModal}
                    />
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}

function mapStateToProps(state) {
    const { models, key } = state.BREAD;
    return { models, searchKey: key };
}

export default connect(mapStateToProps, { browse, destroy })(Index);