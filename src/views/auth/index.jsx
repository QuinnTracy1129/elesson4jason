import { MDBCol, MDBRow, MDBEdgeHeader, MDBFreeBird } from "mdbreact";
import React, { Component } from "react";
import "./index.css";
import Topbar from "./topbar";
import FrontPage from "../../image/frontPage.jpg";

export default class extends Component {
  render() {
    return (
      <div>
        <Topbar />
        <MDBEdgeHeader
          color="darken-3"
          className="sectionPage indigo accent-4"
        />
        <div className="mt-3 mb-5">
          <MDBFreeBird>
            <MDBRow>
              <MDBCol
                md="12"
                className="mx-auto float-none white z-depth-1 py-2 px-2"
              >
                <img
                  src={FrontPage}
                  width="100%"
                  height="auto"
                  alt="data-sample"
                />
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
        </div>
      </div>
    );
  }
}
