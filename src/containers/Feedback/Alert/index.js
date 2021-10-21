import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ContentHolder from '../../../components/utility/contentHolder';
import basicStyle from '../../../config/basicStyle';
import Alert from '../../../components/feedback/alert';

export default class isomorphicAlert extends Component {
  onClose = function (e) { };

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const marginBot = {
      marginBottom: '10px'
    };
    return (
      <LayoutWrapper>
        <PageHeader>Alert</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="Title" >
              <ContentHolder>
                <Alert
                  message="SuccessText"
                  type="success"
                />
                <Alert
                  message="infoText"
                  type="info"
                  style={marginBot}
                />
                <Alert
                  message="warning"
                  type="warning"
                  style={marginBot}
                />
                <Alert
                  message="Error"
                  type="error"
                />
              </ContentHolder>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="ClosableAlertType">
              <ContentHolder>
                <Alert
                  message={"Warning Description"}
                  type="warning"
                  closable
                  onClose={this.onClose}
                  style={marginBot}
                />
                <Alert
                  message="ErrorText"
                  description="Error Description"
                  type="error"
                  closable
                  onClose={this.onClose}
                />
              </ContentHolder>
            </Box>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="IconAlertType">
              <ContentHolder>
                <Alert
                  message="SuccessText"
                  type="success"
                  style={marginBot}
                />
                <Alert
                  message="InfoText"
                  type="info"
                  style={marginBot}
                />
                <Alert
                  message="WarningText"
                  type="warning"
                  style={marginBot}
                />
                <Alert
                  message="ErrorText"
                  type="error"
                />
              </ContentHolder>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title="IconInfoAlertType" >
              <ContentHolder>
                <Alert
                  message="SuccessTips"
                  description="SuccessTipsDescription"
                  type="success"
                  showIcon
                  style={marginBot}
                />
                <Alert
                  message="InformationTips"
                  description="InformationDescription"
                  type="info"
                  showIcon
                  style={marginBot}
                />
                <Alert
                  message="WarningTips"
                  description="Warning Description"
                  type="warning"
                  showIcon
                  style={marginBot}
                />
                <Alert
                  message="ErrorTips"
                  description="ErrorDescription"
                  type="error"
                  showIcon
                />
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
