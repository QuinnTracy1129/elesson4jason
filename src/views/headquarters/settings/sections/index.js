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
            entity: 'sections',
            model: Dummy,
            exhibit: false,
            faculties: [],
            levels: []
        };
    }
    componentDidMount() {
        this.onSearch();
        listahan('levels').then(data => {
            if (data) {
                const levels = data.map((model) => <SelectOption value={model.id}>{model.fullname}</SelectOption>)
                this.setState({ levels })
            }
        })
        listahan('faculties/non/adviser').then(data => {
            if (data) {
                const faculties = data.map((model) => <SelectOption value={model.id}>{model.fullname}</SelectOption>)
                this.setState({ faculties })
            }
        })
    }
    onSearch = async (key) => await this.props.browse(this.state.entity, { key: key, batch: 3 });
    exhibit = (i) => {
        const model = this.props.models[i];
        this.setState({ model });
        this.toggle()
    }
    dummy = () => {
        this.setState({ model: Dummy });
        this.toggle()
    }
    toggle() { this.setState({ visible: !this.state.visible }) }
    handleSearchReset = (key) => this.onSearch(key)

    // Callback function
    closeModal = () => this.toggle()
    handlesDestroy = (pkey) => this.props.destroy(this.state.url, pkey)
    render() {
        const { model, visible, faculties, levels } = this.state;
        const { models } = this.props;
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <Title
                        title='Sections'
                        dummy={this.dummy}
                    />
                    <Writer
                        models={models}
                        exhibit={this.exhibit}
                        destroy={this.handlesDestroy}
                    />
                    <Card
                        model={model}
                        visible={visible}
                        onClose={this.closeModal}
                        levels={levels}
                        faculties={faculties}
                    />
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}

function mapStateToProps(state) {
    const { models, key } = state.BREAD;
    return { models: models, searchKey: key };
}

export default connect(mapStateToProps, { browse, destroy })(Index);