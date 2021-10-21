import React, { Component } from "react";
import LayoutContentWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import { Row, Col } from "antd";
import basicStyle from "../../../../config/basicStyle";
import Box from "../../../../components/utility/box";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import SchoolImage from "../../../../image/CTNHS.jpg";
import DepedLogo from "../../../../image/deped.png";

export default class extends Component {
  render() {
    const { rowStyle, colStyle } = basicStyle;
    return (
      <LayoutContentWrapper>
        <PageHeader>About</PageHeader>
        <Row style={rowStyle} justify="start">
          <Col offset={2} span={18} style={colStyle}>
            <Box>
              <Row style={rowStyle} justify="start" className="mb-3">
                <Col
                  span={7}
                  style={colStyle}
                  className="d-flex align-self-center"
                >
                  <img
                    id="target"
                    className="mx-auto"
                    alt="first-logo"
                    width="auto"
                    height="150"
                    src={SchoolImage}
                  />
                </Col>
                <Col span={10} style={colStyle} className="text-center">
                  <label className="school-name">
                    Camp Tinio National High School
                  </label>
                </Col>
                <Col
                  span={7}
                  style={colStyle}
                  className="d-flex align-self-center"
                >
                  <img
                    id="target"
                    className="mx-auto"
                    alt="second-logo"
                    width="auto"
                    height="150"
                    src={DepedLogo}
                  />
                </Col>
              </Row>
              <Row style={rowStyle} justify="start" className="mb-2">
                <Col className="text-center display-4 mg-2" span={24}>
                  ABOUT US
                </Col>
                <Row style={rowStyle} justify="start" className="mb-2">
                  <Col className="d-flex align-self-center" span={12}>
                    <FontAwesomeIcon
                      style={{ fontSize: 200 }}
                      icon={faGraduationCap}
                      className="mx-auto"
                    />
                  </Col>
                  <Col span={12}>
                    <div className="text-center h1">MISSION</div>
                    <p className="mb-2 text-indent text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ratione soluta, mollitia quia culpa veniam a animi enim
                      voluptate, eum facilis exercitationem placeat accusamus
                      labore eligendi, inventore sint eaque repudiandae
                      officiis.
                    </p>
                    <p className="text-indent text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ratione soluta, mollitia quia culpa veniam a animi enim
                      voluptate, eum facilis exercitationem placeat accusamus
                      labore eligendi, inventore sint eaque repudiandae
                      officiis. Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit. Ratione soluta, mollitia quia culpa
                      veniam a animi enim voluptate, eum facilis exercitationem
                      placeat accusamus labore eligendi, inventore sint eaque
                      repudiandae officiis.
                    </p>
                  </Col>
                </Row>
              </Row>
              <Row style={rowStyle} justify="start">
                <Row style={rowStyle} justify="start" className="mb-2">
                  <Col className="d-flex align-self-center" span={12}>
                    <FontAwesomeIcon
                      style={{ fontSize: 200 }}
                      icon={faEye}
                      className="mx-auto"
                    />
                  </Col>
                  <Col span={12}>
                    <div className="text-center h1">VISION</div>
                    <p className="mb-2 text-indent text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ratione soluta, mollitia quia culpa veniam a animi enim
                      voluptate, eum facilis exercitationem placeat accusamus
                      labore eligendi, inventore sint eaque repudiandae
                      officiis.
                    </p>
                    <p className="text-indent text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ratione soluta, mollitia quia culpa veniam a animi enim
                      voluptate, eum facilis exercitationem placeat accusamus
                      labore eligendi, inventore sint eaque repudiandae
                      officiis. Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit. Ratione soluta, mollitia quia culpa
                      veniam a animi enim voluptate, eum facilis exercitationem
                      placeat accusamus labore eligendi, inventore sint eaque
                      repudiandae officiis.
                    </p>
                  </Col>
                </Row>
              </Row>
            </Box>
          </Col>
        </Row>
      </LayoutContentWrapper>
    );
  }
}
