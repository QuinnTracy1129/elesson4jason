import React from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import { Row, Col } from 'antd';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './style.css'
import ContentHolder from '../../../components/utility/contentHolder';
import Box from '../../../components/utility/box';
import basicStyle from '../../../config/basicStyle';
import Header from '../../../containers/Header/cor';


export default function ({ auth, model, miscellaneous, subjects }) {
    const { colStyle, rowStyle } = basicStyle;
    let prices = [];
    let programTitle = [];
    let amount = 0;
    let tlab = 0;
    let tlec = 0;
    let tUnit = 0;

    programTitle = Object.keys(miscellaneous).map(key => <h6 className="table-2-data" id={key}>{key}</h6>);
    prices = Object.keys(miscellaneous).map(key => {
        amount += miscellaneous[key];
        return (<h6 className="table-2-data" id={key}>{miscellaneous[key]}</h6>)
    });

    let writer = subjects.map((subject, index) => {
        let sched = subject.schedules.map(sched => <span className="table-2-data">{sched} <br /></span>)
        tlab += subject.lab;
        tlec += subject.lec;
        tUnit += subject.units;
        return (
            <Col span={24} style={{ marginTop: '1%', marginLeft: '1%', marginBottom: -10 }} key={subject.id}>
                <Col span={4}><span className="table-2-data" >{subject.code}</span></Col>
                <Col span={4}><span className="table-2-data">{subject.name}</span></Col>
                <Col span={4}>
                    <Row style={rowStyle} justify="start">
                        <Col span={8}><span className="table-2-data">{subject.lab}</span></Col>
                        <Col span={8}><span className="table-2-data">{subject.lec}</span></Col>
                        <Col span={8}><span className="table-2-data">{subject.units}</span></Col>
                    </Row>
                </Col>
                <Col span={3}><span className="table-2-data">{subject.section}</span></Col>
                <Col span={5}>{sched}</Col>
                <Col span={3} className="border-bottom border-dark"><span className="table-2-data">{subject.faculty}</span></Col>
            </Col>
        )
    })

    return (
        <LayoutContentWrapper>
            <Col offset={2} span={18} style={colStyle}>
                <Box>
                    <Header
                        logo='logo'
                        school={auth.school.name} // 'Nueva Ecija University of Science and Technology'
                        address={auth.school.localAddress} // 'Cabanatuan City, Nueva Ecija'
                        title='CERTIFICATE OF REGISTRATION'
                    />
                    <ContentHolder style={{ marginTop: '5%' }}>
                        <Row style={rowStyle} justify="start">
                            <Col span={12} style={colStyle}>
                                <div className="text-left">
                                    <span className="text-name">Registration No: <span className="text-data">{model.id}</span></span>
                                </div>
                            </Col>
                            <Col span={12} style={colStyle}>
                                <div className="text-right">
                                    <span className="text-name">Academic Year/Term: <span className="text-data">2012-2013, 2nd Semester</span></span>
                                </div>
                            </Col>
                        </Row>
                        <Col className="border border-dark" span={24} style={colStyle}>
                            <Col className="border-bottom border-dark text-center table-title" span={24} style={{ backgroundColor: '#e4e6fa' }}>
                                STUDENT GENERAL INFORMATION
                                </Col>
                            <Row style={rowStyle} justify="start">
                                <Col span={12} style={colStyle}>
                                    <Col className="text-right" span={4} style={colStyle}>
                                        <span className="table-1-name">LRN:</span><br />
                                        <span className="table-1-name">Name:</span>
                                    </Col>
                                    <Col offset={1} className="text-left" span={18} style={colStyle}>
                                        <span className="table-title">2012101059</span><br />
                                        <span className="table-1-data text-uppercase">Pajarillaga, Benedict Earle Gabriel Romero</span>
                                    </Col>
                                </Col>
                                <Col span={12} style={colStyle}>
                                    <Col span={24} style={colStyle}>
                                        <Col className="text-right" span={4} style={colStyle}>
                                            <span className="table-1-name">College:</span><br />
                                            <span className="table-1-name">Program:</span>
                                        </Col>
                                        <Col offset={1} className="text-left" span={18} style={colStyle}>
                                            <span className="normal-text">College of Information and Communications Technology</span><br />
                                            <span className="normal-text">Bachelor of Science in Information Technology</span>
                                        </Col>
                                    </Col>
                                </Col>
                                <Col span={24} style={{ marginTop: '-4%' }}>
                                    <Col span={8} style={colStyle}>
                                        <Col className="text-right" span={4} style={colStyle}>
                                            <span className="table-1-name">Sex:</span><br />
                                            <span className="table-1-name">Age:</span>
                                        </Col>
                                        <Col offset={1} className="text-left" span={18} style={colStyle}>
                                            <span className="normal-text">Male</span><br />
                                            <span className="normal-text">24.0</span>
                                        </Col>
                                    </Col>
                                    <Col span={8} style={colStyle}>
                                        <Col className="text-right" span={6} style={colStyle}>
                                            <span className="table-1-name">Major:</span><br />
                                            <span className="table-1-name">Year Level:</span>
                                        </Col>
                                        <Col offset={1} className="text-left" span={16} style={colStyle}>
                                            <span className="normal-text">Web Application Programming</span><br />
                                            <span className="table-1-year">1st Year</span>
                                        </Col>
                                    </Col>
                                    <Col span={8} style={colStyle}>
                                        <Col className="text-right" span={6} style={colStyle}>
                                            <span className="table-1-name">Curriculum:</span><br />
                                            <span className="table-1-name">Scholarship:</span>
                                        </Col>
                                        <Col offset={1} className="text-left" span={16} style={colStyle}>
                                            <span className="normal-text">S.Y. 2020-2021</span><br />
                                            <span className="normal-text text-uppercase">Provincial scholarship program</span>
                                        </Col>
                                    </Col>
                                </Col>
                            </Row>
                            <Col className="border-bottom border-top border-dark text-center d-flex align-items-center table-title" span={24} style={{ backgroundColor: '#e4e6fa' }}>
                                <Col span={4} style={colStyle}>
                                    CODE
                                    </Col>
                                <Col span={4} style={colStyle}>
                                    SUBJECT TITLE
                                    </Col>
                                <Col span={4} style={colStyle}>
                                    UNIT
                                        <Row style={rowStyle} justify="start">
                                        <Col span={8} style={colStyle}>
                                            Lab
                                            </Col>
                                        <Col span={8} style={colStyle}>
                                            Lec
                                            </Col>
                                        <Col span={8} style={colStyle}>
                                            Credit
                                            </Col>
                                    </Row>
                                </Col>
                                <Col span={4} style={colStyle}>
                                    SECTION
                                    </Col>
                                <Col span={4} style={colStyle}>
                                    SCHEDULE/ROOM
                                    </Col>
                                <Col span={4} style={colStyle}>
                                    FACULTY SIGNATURE
                                    </Col>
                            </Col>
                            {writer}
                            <Col span={24} style={{ marginTop: '1%', marginLeft: '1%' }}>
                                <Col span={5} style={colStyle}>
                                    <span className="table-2-special" >Note: Subject marked with "*" is Special Subject</span>
                                </Col>
                                <Col className="text-right" span={3} style={colStyle}>
                                    <span className="table-2-info">Total Unit(s)&nbsp;&nbsp;&nbsp;</span>
                                </Col>
                                <Col className="border-top border-dark" span={4} style={colStyle}>
                                    <Row style={rowStyle} justify="start">
                                        <Col span={8} style={colStyle}>
                                            <span className="table-2-info">{tlab}</span>
                                        </Col>
                                        <Col span={8} style={colStyle}>
                                            <span className="table-2-info">{tlec}</span>
                                        </Col>
                                        <Col span={8} style={colStyle}>
                                            <span className="table-2-info">{tUnit}</span>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={4} style={colStyle}></Col>
                                <Col span={4} style={colStyle}></Col>
                                <Col span={4} style={colStyle}></Col>
                            </Col>
                            <Row style={rowStyle} justify="start">
                                <Col className='border border-dark' offset={1} span={10} style={colStyle}>
                                    <Col span={24} className="border-bottom border-dark text-center table-title" style={{ backgroundColor: '#e4e6fa' }}>
                                        ASSESSED FEES
                                        </Col>
                                    <Col span={24}><span className="table-3-info">All Programs</span></Col>
                                    <Col offset={1} span={10} className="text-left">
                                        {programTitle}
                                    </Col>
                                    <Col offset={1} span={10} className="text-right">
                                        {prices}
                                    </Col>
                                    <Col offset={1} span={10} className="text-left">
                                        <span className="table-2-info">Total Assessment</span>
                                    </Col>
                                    <Col offset={1} span={10} className="text-right border-top border-dark">
                                        <span className="table-2-info">{amount}</span>
                                    </Col>
                                    <Col span={22} offset={1}>
                                        <p className="table-3-p">"Figures appearing above shall NOT be paid by the
                                        student. Tuition Fees and other School Fees are FREE
                                        as mandated by RA 10931 except for OJT Fee, RLE
                                        Fee and Affiliation Fee."</p>
                                    </Col>
                                </Col>
                                <Col offset={1} span={11} style={colStyle}>
                                    <Col className="text-center" span={24} style={colStyle}>
                                        <span className='table-3-right-title'>Rules Governing Refund</span>
                                    </Col>
                                    <Col span={24} style={colStyle}>
                                        <p className='table-3-right-data' style={{ textIndent: '15px' }}>Part II, Chapter W - NEUST Student Handbook(21/Aug/2001)
                                        Section 5. No refund shall be granted for dropping of subjects.</p>
                                    </Col>
                                    <Col span={24} style={colStyle}>
                                        <p className='table-3-right-data' style={{ textIndent: '15px' }}>
                                            In due consideration of my admission to the Nueva Ecija University of Science and Technology (NEUST)
                                            and of the privileges of students in this institution, I hereby abide by and comply with all the rules
                                            and regulations laid down by the duly constituted authorities of NEUST and of the college in which I
                                            am officially enrolled.
                                        </p>
                                    </Col>
                                </Col>
                            </Row>
                            <Col offset={1} span={10} style={colStyle}>
                                <Col span={12} style={colStyle} className="text-left">
                                    <span className="table-2-info">Official Receipt</span><br />
                                    <span className="table-2-info">Payment/Validation Date:</span>
                                </Col>
                                <Col span={12} style={colStyle} className="text-left">
                                    <u><span className="table-2-info">0634555A</span></u><br />
                                    <u><span className="table-2-info">October 30, 2012 9:31 am</span></u>
                                </Col>
                            </Col>
                            <Col offset={1} span={11} style={colStyle}>
                                <Col className="border-top border-dark text-center" offset={2} span={20} style={colStyle}>
                                    <span className="table-2-info">Student's Signature</span>
                                </Col>
                            </Col>
                            <Col offset={12} span={11} style={colStyle}>
                                <span className="table-2-info">APPROVED BY</span>
                                <Col className="text-center" span={24} style={{ marginTop: '10%' }}>
                                    <span className="table-title">MELISSA BELINDA P. FARONILO, Ph.D</span>
                                </Col>
                                <Col className="border-top border-dark text-center" offset={2} span={20} style={{ marginTop: '-1%' }}>
                                    <span className="table-2-info">Director, Office of Admission and Registration</span>
                                </Col>
                            </Col>
                            <Row style={rowStyle} justify="start">
                                <Col offset={6} span={6} style={colStyle}>
                                    <span className="table-2-info">Printed By: Nieves, Gian Carlo I.</span>
                                </Col>
                                <Col span={6} style={colStyle}>
                                    <span className="table-2-info">Date Printed: April 27, 2020 8:54 pm</span>
                                </Col>
                                <Col span={6} style={colStyle}>
                                    <span className="table-2-info">Terminal: [DESKTOP-V16TDDP]</span>
                                </Col>
                            </Row>
                            <Col span={24} className="border-top border-dark text-center table-title" style={{ backgroundColor: '#e4e6fa' }}>
                                KEEP THIS CERTIFICATE. YOU WILL BE REQUIRED TO PRESENT THIS IN ALL YOUR DEALINGS WITH THE CAMPUS.
                                </Col>
                        </Col>
                    </ContentHolder>
                </Box>
            </Col>
        </LayoutContentWrapper >
    );
}
