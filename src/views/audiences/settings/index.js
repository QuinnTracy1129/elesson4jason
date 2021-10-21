import { Col, Row } from "antd";
import React, { Component } from "react";
import Banner from "./../../../components/utility/banner/students";
import Box from "./../../../components/utility/box";
import LayoutContentWrapper from "./../../../components/utility/layoutWrapper";
import basicStyle from "./../../../config/basicStyle";

export default class extends Component {
  constructor() {
    super();
    // let auth = JSON.parse(localStorage.getItem('auth'));
    this.state = {
      // url: `library/session/${auth.batch_id}/find`,
      model: undefined,
    };
    document.getElementById("InputTopbarSearch").style = "display:none";
  }
  componentDidMount() {
    // tanong(this.state.url).then(data => {
    //     this.setState({ model: data })
    //     console.log(data);
    // })
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const page = this.state.model ? (
      <Col md={23} sm={12} xs={24} style={colStyle}>
        <Box>
          <h1>Tabulator Session</h1>
          <h2>Sportfess Theme</h2>
          <br />
          <p>{this.state.model.theme}</p>
          <p> Registration Day: </p>
          <p>
            {this.state.model.registration_start}-
            {this.state.model.registration_end}
          </p>
          <br />
          <p>Sportfess Day: </p>
          <p>
            {this.state.model.sportfess_start}-{this.state.model.sportfess_end}
          </p>
          <br />
        </Box>
      </Col>
    ) : (
      <Banner />
    );

    return (
      <LayoutContentWrapper className="platform-container">
        <Row style={rowStyle} justify="start">
          {page}
        </Row>
      </LayoutContentWrapper>
    );
  }
}
