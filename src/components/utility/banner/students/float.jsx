import { MDBCol, MDBRow } from "mdbreact";
import React, { Component } from "react";
import LayoutContentWrapper from "../../../../components/utility/layoutWrapper";
import LayoutContent from "../../../../components/utility/layoutContent";
import "../style.css";
import Select, { SelectOption } from "../../../../components/uielements/select";
import Input, { InputGroup } from "../../../../components/uielements/input";
import { tanong, itala, tignan, listahan } from "../../../../talaan";

export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.state = {
      entity: "registries",
      has_request: false,
      year_level: undefined,
      level_id: undefined,
      sections: [],
      model: {
        user_id: this.auth.id,
        level_id: undefined,
        section_id: undefined,
        status: "pending",
      },
    };
    document.getElementById("InputTopbarSearch").style = "display:none";
  }

  async componentDidMount() {
    // Registration
    let params = { user: this.auth.id };
    await tignan(this.state.entity, params).then((data) => {
      if (data.user_id === this.auth.id) {
        this.setState({ model: data, has_request: true });
      } else {
        tanong("forbidden/attached/authority/levels", { batch_id: 3 }).then(
          (data) => {
            console.log(data);
            let level_id = data[0].id;
            let year_level = data.map((model) => {
              return (
                <SelectOption key={`year-${model.id}`} value={model.id}>
                  {model.fullname}
                </SelectOption>
              );
            });
            this.setState({ year_level, level_id });
          }
        );
      }
    });
  }

  SelectChangeHandler = (name, value) => {
    let { model } = this.state;
    model[name] = value;
    if (name === "level_id") {
      const params = { level: value };
      listahan("sections", params).then((data) => {
        this.setState({ sections: [...data] });
      });
    }
    this.setState({ model });
  };

  handleSubmit = () => {
    let { model } = this.state;
    this.setState({ has_request: true });
    itala(this.state.entity, model);
  };

  render() {
    const { has_request, model } = this.state;
    const { status } = model;
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
                  {status === "pending" ? (
                    <h2>
                      Your request has been submitted, Please notify your
                      administrator.
                    </h2>
                  ) : (
                    <h2>
                      Your request has been approved, You can now check your
                      section.
                    </h2>
                  )}
                  <hr />
                  <h3>
                    You can also check your Request histories by going to
                    Profile
                  </h3>
                </div>
                <div className={has_request ? "d-none" : "d-block"}>
                  <h2 className="mb-3">
                    Before we continue, Please specify the Year level and
                    Section you wish to be part with
                  </h2>
                  <MDBCol size="8" className="mx-auto text-center">
                    <InputGroup compact className="mb-3">
                      <Input
                        style={{ width: "10%" }}
                        defaultValue="Year Level"
                        disabled={true}
                        className="text-left"
                      />
                      <Select
                        value={this.state.model.level_id || "Year Level"}
                        style={{ width: "90%" }}
                        onChange={(event) => {
                          this.SelectChangeHandler("level_id", event);
                        }}
                      >
                        {this.state.year_level}
                      </Select>
                    </InputGroup>
                    <InputGroup compact className="mb-3">
                      <Input
                        style={{ width: "10%" }}
                        defaultValue="Section"
                        disabled={true}
                        className="text-left"
                      />
                      <Select
                        value={this.state.model.section_id || "Section"}
                        style={{ width: "90%" }}
                        onChange={(event) => {
                          this.SelectChangeHandler("section_id", event);
                        }}
                        disabled={this.state.model.level_id ? false : true}
                      >
                        {this.state.sections.map((section) => {
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
