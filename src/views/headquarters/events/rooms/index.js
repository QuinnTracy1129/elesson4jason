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
import Card from './card';
import { Dummy } from "./dummy";
import Writer from './writer';

const Option = SelectOption;

class Index extends Component {
    constructor() {
        super()
        this.auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'rooms',
            data: undefined,
            model: Dummy,
            exhibit: false,
            activeIndex: 0,
            levels: [],
            level: '1',
            has_register: false
        };
    }
    componentDidMount() {
        this.onSearch();
    }
    onSearch = async (key) => await this.props.browse(this.state.entity, key);
    exhibit = async (i) => {
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
    handlesDestroy = (pkey) => this.props.destroy(this.state.entity, pkey)

    render() {
        const { model, visible, facultyRef } = this.state;
        const { models } = this.props;
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    {/* <label style={{ fontSize: 16 }}>Rooms : </label>
                    <Select
                        style={{ width: '20%' }} value={this.state.level || ''}
                        onChange={async (e) => {
                            let { level } = this.state;
                            level = e
                            await this.setState({ level });
                            this.onSearch()
                        }}
                    >
                        <Option key="jhs" value="jh">Junior High School</Option>
                        <Option key="shs" value="sh">Senior High School</Option>
                    </Select> */}



                    <Title
                        title='Rooms'
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
            </LayoutContentWrapper >
        );
    }
}

function mapStateToProps(state) {
    const { models, key } = state.BREAD;
    return { models, searchKey: key };
}

export default connect(mapStateToProps, { browse, destroy })(Index);