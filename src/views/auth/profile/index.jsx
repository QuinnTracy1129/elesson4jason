import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';

import Zoom from './zoom';
import Gallery from './gallery/index';
import About from './about';
import Request from './requests'

import { MDBCol, MDBIcon, MDBRow } from 'mdbreact';

import { Tabs } from 'antd';
import { TabPane } from '../../../components/uielements/tabs.js';
// import axios from 'axios';

import Banner from '../../../image/defaults/default-banner.png';
import Download from '../../../image/defaults/download.jpg';

import './index.css'

export default class extends Component {
    constructor() {
        super()
        this.auth = JSON.parse(localStorage.getItem('auth'));
        document.getElementById('InputTopbarSearch').style = "display:none";
    }
    render() {
        let banner = this.auth.school ? Download : Banner;
        return (
            <LayoutContentWrapper >
                <LayoutContent>
                    <MDBRow className="mb-5">
                        <MDBCol>
                            <div className="container-fluid school-banner" style={{ backgroundImage: `url(${banner})` }}></div>
                            <Zoom image={`${this.auth.email}/${this.auth.profile}`} />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <Tabs onChange={this.callback} type="card">
                                <TabPane tab={
                                    <span>
                                        <MDBIcon icon="user" /> About
                                    </span>
                                } key="1">
                                    <About />
                                </TabPane>
                                {this.auth.rolename === 'superadmin' || this.auth.rolename === 'admin' ?
                                    <TabPane tab={
                                        <span>
                                            <MDBIcon icon="icons" /> Posts
                                        </span>
                                    } key="2">
                                        <Gallery />
                                    </TabPane>
                                    :
                                    null
                                }
                                <TabPane tab={
                                    <span>
                                        <MDBIcon icon="hands-helping" /> Requests
                                    </span>
                                } key="3">
                                    <Request />
                                </TabPane>
                                <TabPane tab={
                                    <span>
                                        <MDBIcon icon="user-friends" /> Friends
                                    </span>
                                } key="4" disabled={true}>
                                </TabPane>
                            </Tabs>
                        </MDBCol>
                    </MDBRow>
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}
