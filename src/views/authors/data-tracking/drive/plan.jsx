import React, { Component } from "react";
import LayoutContentWrapper from "../../../../components/utility/layoutWrapper";
import LayoutContent from "../../../../components/utility/layoutContent";
import Input from "../../../../components/uielements/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faLink, faTimes } from "@fortawesome/free-solid-svg-icons";
import { MDBContainer, MDBIframe } from "mdbreact";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      link: "",
      show: "https://www.google.com/drive/",
    };
  }

  render() {
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          {/* <button onClick={() => console.log(this.state)}>Log state</button> */}
          <Input
            value={this.state.link}
            placeholder="Please enter Google Drive link"
            addonBefore={<FontAwesomeIcon icon={faLink} />}
            addonAfter={
              this.state.show !== "https://www.google.com/drive/" ? (
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.setState({
                      show: "https://www.google.com/drive/",
                      link: "",
                    })
                  }
                  icon={faTimes}
                  size="2x"
                />
              ) : (
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.state.link
                      ? this.setState({ show: this.state.link })
                      : alert("Link cannot be empty")
                  }
                  icon={faSearch}
                  size="2x"
                />
              )
            }
            onChange={(e) => this.setState({ link: e.target.value })}
            onPressEnter={this.viewDocs}
          />
          <MDBContainer className="text-center">
            <MDBIframe src={this.state.show || null} />
          </MDBContainer>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
