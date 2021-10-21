import React, { Component } from 'react';
import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import LayoutContent from '../../../../components/utility/layoutContent';
import { MDBCol, MDBRow } from 'mdbreact';
import Tabs, { TabPane } from '../../../../components/uielements/tabs';
import Process from './process';
import Checked from './checked';

export default class extends Component {
    render() {
        return (
            <LayoutContentWrapper >
                <LayoutContent>
                    <MDBRow>
                        <MDBCol>
                            <h1>Documents</h1>
                        </MDBCol>
                    </MDBRow>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Processing" key="1">
                            <Process />
                        </TabPane>
                        <TabPane tab="Checked" key="2">
                            <Checked />
                        </TabPane>
                    </Tabs>
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}
