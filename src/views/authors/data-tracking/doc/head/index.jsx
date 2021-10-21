import React, { Component } from "react";
import LayoutContentWrapper from "../../../../../components/utility/layoutWrapper";
import LayoutContent from "../../../../../components/utility/layoutContent";
import { MDBCol, MDBRow } from "mdbreact";
import Tabs, { TabPane } from "../../../../../components/uielements/tabs";
import Process from "./process/index";
import Approved from "./approved/index";

export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <MDBRow>
            <MDBCol>
              <h1>Documents</h1>
            </MDBCol>
          </MDBRow>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Processing" key="1">
              <Process />
            </TabPane>
            <TabPane tab="Approved" key="2">
              <Approved />
            </TabPane>
          </Tabs>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
