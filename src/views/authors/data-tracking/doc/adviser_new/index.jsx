import React, { Component } from "react";
import LayoutContentWrapper from "../../../../../components/utility/layoutWrapper";
import LayoutContent from "../../../../../components/utility/layoutContent";
import { MDBCol, MDBRow } from "mdbreact";
import Tabs, { TabPane } from "../../../../../components/uielements/tabs";
import Process from "./process";
import Submitted from "./submitted";
import Card from "./card";
import Interactive from "./interactive/index";

export default class extends Component {
  state = {
    didSubmit: false,
  };

  handleSubmit = () => {
    this.setState({ didSubmit: !this.state.didSubmit });
  };

  render() {
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <MDBRow>
            <MDBCol>
              <h1>Documents</h1>
            </MDBCol>
            <MDBCol className="text-right">
              <Interactive onSubmit={this.handleSubmit} />
              <Card onSubmit={this.handleSubmit} />
            </MDBCol>
          </MDBRow>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Processing" key="1">
              <Process didSubmit={this.state.didSubmit} />
            </TabPane>
            <TabPane tab="Published" key="2">
              <Submitted />
            </TabPane>
          </Tabs>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
