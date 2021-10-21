import { MDBCol, MDBRow } from "mdbreact";
import React, { Component } from "react";
import LayoutContentWrapper from "../../../../components/utility/layoutWrapper";
import LayoutContent from "../../../../components/utility/layoutContent";
import "../style.css";
import Select, { SelectOption } from "../../../../components/uielements/select";
import Input, { InputGroup } from "../../../../components/uielements/input";
import { itala, tignan, listahan } from "../../../../talaan";

export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.state = {
      entity: "registries",
      has_request: false,
      year_level: undefined,
      level_id: undefined,
      dep: [],
      model: {
        user_id: this.auth.id,
        depratment_id: undefined,
        status: "pending",
      },
    };
    document.getElementById("InputTopbarSearch").style = "display:none";
  }

  async componentDidMount() {
    // Registration
    let params = { user: this.auth.id };
    await tignan(this.state.entity, params).then((data) => {
      if (data.student_id === this.auth.id) {
        this.setState({ model: data, has_request: true });
      } else {
        listahan("departments").then((data) => {
          this.setState({ dep: [...data] });
        });
      }
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = () => {
    let { model } = this.state;
    this.setState({ has_request: true });
    itala(this.state.entity, model);
  };

  render() {
    console.log(this.state.model);
    const { has_request } = this.state;
    console.log(has_request);
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <MDBRow>
            <MDBCol size="12" className="text-center mb-5">
              <b className="display-2 platform-title">Welcome to eLesson</b>
            </MDBCol>
            <MDBCol size="12">
              <MDBCol size="10" className="mx-auto text-center">
                <div
                  className={
                    has_request
                      ? "d-block container-fluid text-center"
                      : "d-none"
                  }
                >
                  <h2>
                    Your request has been submitted, Please notify your
                    administrator .
                  </h2>
                  <hr />
                  <h3>
                    You can also check your Request histories by going to
                    Profile
                  </h3>
                </div>
                <div className={has_request ? "d-none" : "d-block"}>
                  <h2 className="mb-3">
                    Before we continue, Please specify the department you wish
                    to be part with
                  </h2>
                  <MDBCol size="8" className="mx-auto text-center">
                    <InputGroup compact className="mb-3">
                      <Input
                        style={{ width: "10%" }}
                        defaultValue="Department"
                        disabled={true}
                        className="text-left"
                      />
                      <Select
                        value={this.state.model.department_id || "Department"}
                        style={{ width: "90%" }}
                        onChange={(e) => {
                          let { model } = this.state;
                          model.department_id = e;
                          this.setState({ model });
                        }}
                      >
                        {this.state.dep.map((section) => {
                          return (
                            <SelectOption
                              key={`section-${section.id}`}
                              value={section.id}
                            >
                              {section.name}
                            </SelectOption>
                          );
                        })}
                      </Select>
                    </InputGroup>
                    <button
                      className="btn btn-primary"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </button>
                  </MDBCol>
                </div>
              </MDBCol>
            </MDBCol>
          </MDBRow>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
