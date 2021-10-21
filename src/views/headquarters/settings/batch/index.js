import React, { Component } from 'react';
import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import LayoutContent from '../../../../components/utility/layoutContent';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Title from '../../../../components/header/index';
import { connect } from "react-redux";
import { browse, destroy } from "../../../../redux/BREAD/actions";

import Card from './card';
import Writer from './writer';



class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entity: 'batches',
            model: undefined,
            visible: false,
            isNew: true,
        };
    }
    componentDidMount() { this.onSearch() }
    onSearch = async (key) => await this.props.browse(this.state.entity, key);
    exhibit = (i) => {
        const model = this.props.models[i];
        this.setState({ model, isNew: false });
        this.toggle()
    }
    dummy = () => {
        this.setState({ isNew: true });
        this.toggle()
    }

    handlesDestroy = (i, pkey) => this.props.destroy(this.state.entity, pkey)
    toggle() { this.setState({ visible: !this.state.visible }) }

    // Callback function
    closeModal = () => this.toggle()
    render() {
        const { model, isNew, visible } = this.state;
        const { models } = this.props;
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <Title
                        title='Batch'
                        dummy={this.dummy}
                    />
                    <Writer
                        models={models}
                        exhibit={this.exhibit}
                        destroy={this.handlesDestroy}
                    />

                    <Card
                        model={model}
                        isNew={isNew}
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
