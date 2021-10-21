import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Title from '../../../../components/header/index';
import LayoutContent from '../../../../components/utility/layoutContent';
import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import { browse, destroy } from "../../../../redux/BREAD/actions";
import Card from './card';
import { Dummy } from "./dummy";
import Writer from './writer';

class Index extends Component {
    constructor() {
        super()
        let auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            url: 'forbidden/attached/authority/levels',
            model: Dummy,
            user: auth,
            visible: false,
        };
    }
    componentDidMount() { this.onSearch() }
    onSearch = async (key) => await this.props.browse(this.state.url, { key: key, batch: 3 });
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
        const { model, visible } = this.state;
        const { models } = this.props;
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <Title
                        title='Year Levels'
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
