import React, { Component } from "react";
import LayoutContentWrapper from "../../../../../components/utility/layoutWrapper";
import LayoutContent from "../../../../../components/utility/layoutContent";
import { MDBCol, MDBRow } from "mdbreact";
import Tabs, { TabPane } from "../../../../../components/uielements/tabs";
import Process from "./process/index";
import Noted from "./noted/index";

export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.key = document.getElementById("InputTopbarSearch").style =
      "display:none";
    this.state = {
      models: [],
    };
  }

  render() {
    // const {department_id}= this.auth
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
            <TabPane tab="Noted" key="2">
              <Noted />
            </TabPane>
          </Tabs>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
