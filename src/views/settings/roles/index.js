import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Title from '../../../components/header/index';
import LayoutContent from '../../../components/utility/layoutContent';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import { browse, destroy } from "../../../redux/BREAD/actions";
import Card from './card';
import { Dummy } from "./dummy";
import Writer from './writer';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'forbidden/attached/authority/roles',
            entity: 'roles',
            model: Dummy,
            visible: false,
        };
    }
    componentDidMount() { this.onSearch(); }
    componentDidUpdate(prevProps) {
        if (prevProps.searchKey !== this.props.searchKey) {
            this.onSearch(this.props.searchKey);
        }
    }
    onSearch = async (key) => await this.props.browse(this.state.url, key);
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
                        title='Roles'
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
    return { models, searchKey: key };
}

export default connect(mapStateToProps, { browse, destroy })(Index);