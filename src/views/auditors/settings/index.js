import "@fortawesome/fontawesome-free/css/all.min.css";
import { Col, Row } from "antd";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import React, { Component } from "react";
import Banner from "../../../components/utility/banner/faculty/classroom";
import Box from "../../../components/utility/box";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import basicStyle from "../../../config/basicStyle";



// import { tanong } from '../../../talaan';

export default class extends Component {
  constructor() {
    super();
    // let auth = JSON.parse(localStorage.getItem("auth"));
    this.state = {
      // url: `classroom/${auth.batch_id}/find`,
      model: "",
    };
    document.getElementById("InputTopbarSearch").style = "display:none";
  }
  // componentDidMount() {
  //     tanong(this.state.url).then(data => {
  //         this.setState({ model: data })
  //         console.log(data);
  //     })
  // }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const page = this.state.model ? (
      <Box>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={23} sm={12} xs={24} style={colStyle}>
            <h1>Class Session</h1>
          </Col>
        </Row>
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
    ) : (
      <Banner />
    );

    return (
      <LayoutContentWrapper>
        <Row style={rowStyle} justify="start">
          {page}
        </Row>
      </LayoutContentWrapper>
    );
  }
}
