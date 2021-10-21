import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Title from '../../../components/header/index';
import { SelectOption } from '../../../components/uielements/select';
import LayoutContent from '../../../components/utility/layoutContent';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import { browse } from "../../../redux/BREAD/actions";
import { listahan } from '../../../talaan';
import Card from './card';
import Writer from './writer';

class Index extends Component {
    constructor() {
        super()
        this.state = {
            entity: 'users',
            model: '',
            visible: false,
            users: [],
            access: []
        };
    }
    componentDidMount() { this.onSearch() }

    onSearch = async (key) => {
        let params = { role: 2 };
        if (key) {
            let p = key.split(',');
            if (p.length > 1) {
                params['lname'] = p[0].trim();
                params['key'] = p[1].trim();
            } else {
                params['key'] = key
            }
        }
        await this.props.browse(`${this.state.entity}/superadmin`, key)
        listahan(`users/promotion`).then(datas => {
            let users = datas.map(user => <SelectOption value={user.id}>{user.fullname}</SelectOption>)
            this.setState({ users })
        })

        listahan('roles', { name: this.props.role }).then(roles => {
            let access = roles.map(role => <SelectOption value={role.id}>{role.display_name}</SelectOption>)
            this.setState({ access })
        })
    }
    exhibit = (i) => {
        const modelRef = this.props.models[i];
        const model = {
            id: modelRef.id,
            fullname: modelRef.fullname
        }
        this.setState({ model });
        this.toggle()
    }
    dummy = () => {
        this.setState({ model: { role_id: 2 } });
        this.toggle()
    }
    toggle() { this.setState({ visible: !this.state.visible }) }
    // Callback function
    closeModal = () => this.toggle()
    render() {
        const { model, visible, access, users } = this.state;
        const { models } = this.props;

        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <Title
                        title='Superadmin'
                        dummy={this.dummy}
                    />
                    <Writer
                        models={models}
                        exhibit={this.exhibit}
                    />

                    <Card
                        model={model}
                        visible={visible}
                        onClose={this.closeModal}
                        access={access}
                        users={users}
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

export default connect(mapStateToProps, { browse })(Index);