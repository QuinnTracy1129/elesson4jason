import React, { Component } from "react";
import { MDBCol, MDBInput, MDBRow } from "mdbreact";

export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
  }
  render() {
    return (
      <div className="container-fluid">
        <MDBRow>
          <MDBCol className="text-center">
            <MDBInput
              value={this.auth.fname}
              label="First name"
              size="lg"
              disabled
            />
          </MDBCol>
          <MDBCol className="text-center">
            <MDBInput
              value={this.auth.middlename ? this.auth.middlename.name : ""}
              label="Middle name"
              size="lg"
              disabled
            />
          </MDBCol>
          <MDBCol className="text-center">
            <MDBInput
              value={this.auth.lname}
              label="Last name"
              size="lg"
              disabled
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              value={this.auth.email}
              label="E-mail address"
              size="lg"
              disabled
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              icon={
                this.auth.email_verified_at ? "check-circle" : "times-circle"
              }
              value={this.auth.email_verified_at ? "Verified" : "Pending"}
              label="E-mail address verified"
              size="lg"
              disabled
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              value={this.auth.gender}
              label="Gender"
              size="lg"
              disabled
            />
          </MDBCol>
        </MDBRow>

        {this.auth.role ? (
          <MDBRow>
            <MDBCol>
              <MDBInput
                value={this.auth.roledisplayname}
                label="Role"
                size="lg"
                disabled
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                value={this.auth.position}
                label="Position"
                size="lg"
                disabled
              />
            </MDBCol>
          </MDBRow>
        ) : null}

        {this.auth.school ? (
          <MDBRow>
            <MDBCol>
              <MDBInput
                value={this.auth.schoolname}
                label="School"
                size="lg"
                disabled
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                value={this.auth.school.address}
                label="School Address"
                size="lg"
                disabled
              />
            </MDBCol>
          </MDBRow>
        ) : null}
      </div>
    );
  }
}
