import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import { Row, Col } from 'antd';
import basicStyle from '../../../config/basicStyle';
import Box from '../../../components/utility/box';
import './style.css';

export default class extends Component {
    render() {
        const { rowStyle, colStyle } = basicStyle;
        return (
            <LayoutContentWrapper id="assessment-form">
                <Row style={rowStyle} justify="start">
                    <Col offset={5} span={14} style={colStyle}>
                        <Box>
                            <span className="ft12">Nueva Ecija University of Science and Technology</span><br />
                            <span className="ft13">Cabanatuan City, Nueva Ecija</span>
                            <Row style={rowStyle} justify="start">
                                <Col span={12} style={colStyle}>
                                    <Row style={rowStyle} justify="start">
                                        <span className="ft12">PRE-REGISTRATION/ASSESSMENT FORM</span>
                                    </Row>
                                    <span className="ft11">Registration No.: </span><span className="ft11">000313566</span>
                                </Col>
                                <Col span={12} style={colStyle}>
                                    <Col span={6}>
                                        <span className="ft11">School Year: </span><br />
                                        <span className="ft11">Reg. Date: </span>
                                    </Col>
                                    <Col span={18}>
                                        <span className="ft11">2018-2019, 1st Semester</span><br />
                                        <span className="ft11">17-Aug-2018 9:08 am</span>
                                    </Col>
                                </Col>
                            </Row>
                            <Row className="border border-dark" style={rowStyle} justify="start">
                                <Col offset={1} span={13} style={colStyle, { height: 50 }}>
                                    <Col style={colStyle} span={4}>
                                        <span className="ft11">Student :</span><br />
                                        <span className="ft11">Program :</span>
                                    </Col>
                                    <Col style={colStyle} span={20}>
                                        <span className="ft11">AGUILAR, Rey John Pasig (2012100667)</span><br />
                                        <span className="ft11">Master Of Science In Information Technology</span>
                                    </Col>
                                </Col>
                                <Col span={4} style={colStyle, { height: 50 }}>
                                    <span className="ft11">College : <span className="ft11">GRAD</span></span>
                                </Col>
                                <Col span={6} style={colStyle, { height: 50 }}>
                                    <Col style={colStyle} span={12}>
                                        <span className="ft11">Yr-Level :</span><br />
                                        <span className="ft11">Scholarship :</span>
                                    </Col>
                                    <Col style={colStyle} span={12}>
                                        <span className="ft11">Graduate</span><br />
                                        <span className="ft11"></span>
                                    </Col>
                                </Col>
                            </Row>
                            <Col style={{ height: 5 }}></Col>
                            <Row className="border border-dark" style={rowStyle} justify="start">
                                <Col className="text-center border-dark" span={24} style={colStyle, { borderStyle: 'none none dotted' }}>
                                    <span className="ft11">REGISTERED SUBJECT</span>
                                </Col>
                                <Col className="text-center d-flex align-items-center border-dark" span={24} style={colStyle, { borderStyle: 'none none dotted' }}>
                                    <Col span={3} style={colStyle}>
                                        <span className="ft11">CODE</span>
                                    </Col>
                                    <Col span={5} style={colStyle}>
                                        <span className="ft11">SUBJECT TITLE</span>
                                    </Col>
                                    <Col span={4} style={colStyle, { marginBottom: -15 }}>
                                        <Col span={8} style={colStyle}>
                                            <span className="ft11">LEC unit</span>
                                        </Col>
                                        <Col span={8} style={colStyle}>
                                            <span className="ft11">LEC <br /> Hr</span>
                                        </Col>
                                        <Col span={8} style={colStyle}>
                                            <span className="ft11">LAB Unit</span>
                                        </Col>
                                    </Col>
                                    <Col span={4} style={colStyle}>
                                        <span className="ft11">Section</span>
                                    </Col>
                                    <Col span={5} style={colStyle}>
                                        <span className="ft11">Schedule</span>
                                    </Col>
                                    <Col span={3} style={colStyle}>
                                        <span className="ft11">Room</span>
                                    </Col>
                                </Col>
                                <Col span={24} style={colStyle}>
                                    <Col className="text-center" span={3}>
                                        <span className="ft13">ITC-01</span><br />
                                        <span className="ft13">ITC-02</span>
                                    </Col>
                                    <Col span={5}>
                                        <span className="ft13">Computer Fundametal</span><br />
                                        <span className="ft13">Computer Network and Design</span>
                                    </Col>
                                    <Col className="text-center" span={4}>
                                        <Col span={8} style={colStyle}>
                                            <span className="ft13">3.0</span><br />
                                            <span className="ft13">3.0</span>
                                        </Col>
                                        <Col span={8} style={colStyle}>
                                            <span className="ft13">3.0</span><br />
                                            <span className="ft13">3.0</span>
                                        </Col>
                                        <Col span={8} style={colStyle}>
                                            <span className="ft13">3.0</span><br />
                                            <span className="ft13">3.0</span>
                                        </Col>
                                    </Col>
                                    <Col className="text-center" span={4} style={colStyle}>
                                        <span className="ft13">BSIT-1K</span><br />
                                        <span className="ft13">BSIT-1K</span>
                                    </Col>
                                    <Col className="text-center" span={5} style={colStyle}>
                                        <span className="ft13">MW 8:00AM-11:00AM</span><br />
                                        <span className="ft13">MW 8:00AM-11:00AM</span>
                                    </Col>
                                    <Col className="text-center" span={3} style={colStyle}>
                                        <span className="ft13">AD-406</span><br />
                                        <span className="ft13">UCC-LAB1</span>
                                    </Col>
                                </Col>
                                <Col span={24} style={colStyle, { marginTop: -30, height: 30 }}>
                                    <Col offset={7} span={1}>
                                        <b><span className="ft11">Total:</span></b>
                                    </Col>
                                    <Col className="text-center border-top border-dark" span={4}>
                                        <Col span={8} style={colStyle}>
                                            <b><span className="ft11">6.0</span></b>
                                        </Col>
                                        <Col span={8} style={colStyle}>
                                            <b><span className="ft11">6.0</span></b>
                                        </Col>
                                        <Col span={8} style={colStyle}>
                                            <b><span className="ft11">6.0</span></b>
                                        </Col>
                                    </Col>
                                </Col>
                            </Row>
                            <Col style={{ height: 5 }}></Col>
                            <Col span={16} style={colStyle}>
                                <Col className="border border-dark" span={12} style={colStyle}>
                                    <Col className="text-center border-dark" style={{ borderStyle: 'none none dotted' }} span={24}>
                                        <b><span className="ft11">TRUST FUND</span></b>
                                    </Col>
                                    <Col span={12} style={colStyle}>
                                        <div><span className="ft13">ATB/RED CROSS</span><br /></div>
                                        <span className="ft13">CHARITY</span>
                                    </Col>
                                    <Col className="text-right" span={12} style={colStyle}>
                                        <div><span className="ft13">15.00</span><br /></div>
                                        <span className="ft13">10.00</span>
                                    </Col>
                                    <Col className="text-right border-dark" offset={18} span={6} style={colStyle, { borderStyle: 'dotted none none none', marginTop: -15 }}>
                                        <span className="ft13">25.00</span>
                                    </Col>
                                </Col>
                                <Col offset={1} className="border border-dark" span={11} style={colStyle}>
                                    <Col className="text-center border-dark" style={{ borderStyle: 'none none dotted' }} span={24}>
                                        <b><span className="ft11">GENERAL FUND</span></b>
                                    </Col>
                                    <Col span={12} style={colStyle}>
                                        <div><span className="ft13">ATB/RED CROSS</span><br /></div>
                                        <span className="ft13">CHARITY</span>
                                    </Col>
                                    <Col className="text-right" span={12} style={colStyle}>
                                        <div><span className="ft13">15.00</span><br /></div>
                                        <span className="ft13">10.00</span>
                                    </Col>
                                    <Col className="text-right border-dark" offset={18} span={6} style={colStyle, { borderStyle: 'dotted none none none', marginTop: -15 }}>
                                        <span className="ft13">25.00</span>
                                    </Col>
                                </Col>
                            </Col>
                            <Col span={8} style={colStyle}>
                                <Col offset={1} span={23} style={colStyle}>
                                    <p className='ft11' style={{ marginBottom: 10 }}>Please check whether all entries in this Pre-Registration/Assessment Form are accurate and correc.</p>
                                    <p className='ft11' style={{ marginBottom: 10 }}>Checked By:</p>
                                    <p className='ft11'>Kindly sign below to attest the correctness of all entries.</p>
                                </Col>
                                <Row style={rowStyle} justify="start">
                                    <Col className="bottom-align-text" span={14} style={colStyle}>
                                        <span style={{ position: 'absolute', bottom: 15 }} className="ft11">Serial : <span className="ft11">2020575-HWOK983</span></span>
                                    </Col>
                                    <Col span={10} style={colStyle}>
                                        <div className="border border-dark" style={{ height: 100, width: 100 }}></div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col offset={8} span={16} style={colStyle}>
                                <Col span={12} style={colStyle}>
                                    <Col span={12}>
                                        <span className="ft11">1st Payment</span><br />
                                        <span className="ft11">2nd Payment</span><br />
                                        <span className="ft11">3rd Payment</span>
                                    </Col>
                                    <Col className="text-right" span={12}>
                                        <span className="ft13">2.500.00</span><br />
                                        <span className="ft13">1,500.00</span><br />
                                        <span className="ft13">1,100.00</span>
                                    </Col>
                                    <Col span={12}>
                                        <span className="ft12">Total assessment:</span>
                                    </Col>
                                    <Col className="text-right" span={12}>
                                        <span className="ft12 font-weight-bold">PHP 5,100.00</span>
                                    </Col>
                                </Col>
                                <Col offset={1} span={11} style={colStyle}>
                                    <Col className="ft11" span={24} style={colStyle}>
                                        Conforme :
                                        </Col>
                                    <Col className="ft11" span={24}>
                                        <span className="border-bottom border-dark" style={{ position: 'absolute', bottom: -50 }}>
                                            Student: AGUILAR, Rey John Pasig
                                            </span>
                                    </Col>
                                </Col>
                            </Col>
                            <div className="text-right">
                                <button onClick={() => { window.print() }} className="btn btn-primary">Print</button>
                            </div>
                        </Box>
                    </Col>
                </Row>
            </LayoutContentWrapper>
        );
    }
}
