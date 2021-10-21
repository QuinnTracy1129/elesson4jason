import React from 'react';
// import { siteConfig } from '../../config.js';
import Logo from '../../image/logo/neust.png';
import Deped from '../../image/logo/deped.png';
import "./style.css"
import { Row, Col } from 'antd';
import basicStyle from '../../config/basicStyle';

export default function ({ logo, school, address, title }) {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
        <Row style={rowStyle} gutter={gutter} justify="start">

            <Col span={4} style={colStyle} className="text-center" style={{ marginTop: '.5%', maxHeight: 100 }}>
                <img src={Logo} alt='logo' style={{ border: 0, height: '100%' }} />
            </Col>
            <Col span={16} style={colStyle, { height: 100 }} className="text-center">
                <Row className="default-name" style={rowStyle, { width: '100%' }}>
                    <span>Republic of the Philippines</span>
                </Row>
                <Row className="school-name" style={rowStyle, { width: '100%' }}> {school} </Row>
                <Row className="default-name" style={rowStyle, { width: '100%' }}> {address} </Row>
                <Row className="form-title" style={rowStyle, { width: '100%', marginTop: '0.5%' }}> {title} </Row>
            </Col>
            <Col span={4} style={colStyle} className="text-center" style={{ marginTop: '.5%', maxHeight: 100 }}>
                <img src={Deped} alt='logo' style={{ border: 0, height: '100%' }} />
            </Col>
        </Row>
    )
}