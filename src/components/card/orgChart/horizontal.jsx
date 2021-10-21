import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Row, Col } from 'antd';
import { MDBCard, MDBCardBody, MDBCardText, } from 'mdbreact';
const rowStyle = { width: '100%', display: 'flex', flexFlow: 'row wrap' }

export default ({ image, fullname, position, classname }) => {

    return (
        <MDBCard style={{ width: '12.5rem', zIndex: 1 }}>
            <MDBCardBody>
                <Row style={rowStyle}>
                    <Col span={24} className="d-flex align-items-center">
                        <img
                            width='100'
                            height='100'
                            src={image}
                            alt='avatar'
                            className={`${classname} rounded-circle img-responsive mx-auto`}
                        />
                    </Col>
                    <Col span={24}>
                        <span className="h6"> {fullname} </span>
                        <MDBCardText className="mt-2"> {position} </MDBCardText>
                    </Col>
                </Row>
            </MDBCardBody>
        </MDBCard>
    );
};