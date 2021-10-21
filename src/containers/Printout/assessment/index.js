import React from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import { Row, Col } from "antd";
import basicStyle from "../../../config/basicStyle";
import Box from "../../../components/utility/box";
import "./style.css";
import QRCode from "qrcode"; //npm i qrcode

const generateCode = (code) => {
  QRCode.toDataURL(code).then((url) => {
    document.getElementById("qrcode").src = url;
  });
};

export default function ({ auth, model, miscellaneous, subjects }) {
  const { rowStyle, colStyle } = basicStyle;
  let tlab = 0;
  let tlec = 0;
  let tUnit = 0;

<<<<<<< HEAD
  let writer = subjects.map((subject, index) => {
    let sched = subject.schedules.map((sched) => (
      <span className="ft13">
        {sched} <br />
      </span>
    ));
    tlab += subject.lab;
    tlec += subject.lec;
    tUnit += subject.units;
    return (
      <Col span={24} style={{ marginTop: "1%" }} key={subject._id}>
        <Col span={3}>
          <span className="ft13" style={{ marginLeft: 15 }}>
            {subject.code}
          </span>
        </Col>
        <Col span={5}>
          <span className="ft13">{subject.name}</span>
        </Col>
        <Col className="text-center" span={4}>
          <Row justify="start">
            <Col span={8}>
              <span className="ft13">{subject.lab}</span>
            </Col>
            <Col span={8}>
              <span className="ft13">{subject.lec}</span>
=======
    let writer = subjects.map((subject, index) => {
        let sched = subject.schedules.map(sched => <span className="ft13">{sched} <br /></span>)
        tlab += subject.lab;
        tlec += subject.lec;
        tUnit += subject.units;
        return (
            <Col span={24} style={{ marginTop: '1%' }} key={subject.id}>
                <Col span={3}><span className="ft13" style={{ marginLeft: 15 }} >{subject.code}</span></Col>
                <Col span={5}><span className="ft13">{subject.name}</span></Col>
                <Col className="text-center" span={4}>
                    <Row justify="start">
                        <Col span={8}><span className="ft13">{subject.lab}</span></Col>
                        <Col span={8}><span className="ft13">{subject.lec}</span></Col>
                        <Col span={8}><span className="ft13">{subject.units}</span></Col>
                    </Row>
                </Col>
                <Col className="text-center" span={4}><span className="ft13">{subject.section}</span></Col>
                <Col span={5} className="ft13">{sched}</Col>
                <Col span={3} className="border-bottom border-dark"><span className="ft13">{subject.faculty}</span></Col>
>>>>>>> 07877747153a3bae950ac948aae459da36f9e8b2
            </Col>
            <Col span={8}>
              <span className="ft13">{subject.units}</span>
            </Col>
          </Row>
        </Col>
        <Col className="text-center" span={4}>
          <span className="ft13">{subject.section}</span>
        </Col>
        <Col span={5} className="ft13">
          {sched}
        </Col>
        <Col span={3} className="border-bottom border-dark">
          <span className="ft13">{subject.faculty}</span>
        </Col>
      </Col>
    );
  });

  return (
    <LayoutContentWrapper id="assessment-form" className="page1">
      <Row style={rowStyle} justify="start">
        <Col offset={0} span={24} style={colStyle}>
          <Box>
            <span className="ft12">{auth.school.name}</span>
            <br />
            <span className="ft13">{auth.school.address}</span>
            <Row style={rowStyle} justify="start">
<<<<<<< HEAD
              <Col span={12} style={colStyle}>
                <Row style={rowStyle} justify="start">
                  <span className="ft12">PRE-REGISTRATION/ASSESSMENT FORM</span>
                </Row>
                <span className="ft11">Registration No.: </span>
                <span className="ft11">{model._id}</span>
              </Col>
              <Col span={12} style={colStyle}>
                <Col span={6}>
                  <span className="ft11">School Year: </span>
                  <br />
                  <span className="ft11">Reg. Date: </span>
                </Col>
                <Col span={18}>
                  {/*  2018-2019, 1st Semester */}
                  <span className="ft11">S.Y.: {auth.school.batch_sy}</span>
                  <br />
                  {/* 17-Aug-2018 9:08 am */}
                  <span className="ft11">{model.created_at}</span>
                </Col>
              </Col>
            </Row>
            <Row
              className="border border-dark"
              style={rowStyle}
              justify="start"
            >
              <Col offset={1} span={13} style={{ height: 50 }}>
                <Col span={5}>
                  <span className="ft11">Student :</span>
                  <br />
                  <span className="ft11">Track|Strand :</span>
                </Col>
                <Col span={19}>
                  <span className="ft11">{auth.fullname}</span>
                  <br />
                  <span className="ft11">{auth.strand}</span>
                </Col>
              </Col>
              <Col span={6} style={{ height: 50 }}>
                <Col style={colStyle} span={12}>
                  <span className="ft11">Grade Level :</span>
                  <br />
                  <span className="ft11">Scholarship :</span>
                </Col>
                <Col style={colStyle} span={12}>
                  <span className="ft11">{model.level.fullname}</span>
                  <br />
                  <span className="ft11"></span>
                </Col>
              </Col>
            </Row>
            <Col style={{ height: 5 }}></Col>
            <Row
              className="border border-dark"
              style={rowStyle}
              justify="start"
            >
              <Col
                className="text-center border-dark"
                span={24}
                style={{ borderStyle: "none none dotted" }}
              >
                <span className="ft11">REGISTERED SUBJECT</span>
              </Col>
              <Col
                className="text-center d-flex align-items-center border-dark"
                span={24}
                style={{ borderStyle: "none none dotted" }}
              >
                <Col span={3}>
                  <span className="ft11">CODE</span>
                </Col>
                <Col span={5}>
                  <span className="ft11">SUBJECT TITLE</span>
                </Col>
                <Col span={4}>
                  <Col span={8}>
                    <span className="ft11">LEC unit</span>
                  </Col>
                  <Col span={8}>
                    <span className="ft11">
                      LEC <br /> Hr
                    </span>
                  </Col>
                  <Col span={8}>
                    <span className="ft11">LAB Unit</span>
                  </Col>
                </Col>
                <Col span={4}>
                  <span className="ft11">Section</span>
                </Col>
                <Col span={5}>
                  <span className="ft11">Schedule</span>
                </Col>
                <Col span={3}>
                  <span className="ft11">Room</span>
                </Col>
              </Col>
              {writer}
              <Col span={24} style={{ marginTop: -30, height: 30 }}>
                <Col offset={7} span={1}>
                  <b>
                    <span className="ft11">Total:</span>
                  </b>
                </Col>
                <Col className="text-center border-top border-dark" span={4}>
                  <Col span={8} style={colStyle}>
                    <b>
                      <span className="ft11">{tlab}</span>
                    </b>
                  </Col>
                  <Col span={8} style={colStyle}>
                    <b>
                      <span className="ft11">{tlec}</span>
                    </b>
                  </Col>
                  <Col span={8} style={colStyle}>
                    <b>
                      <span className="ft11">{tUnit}</span>
                    </b>
                  </Col>
                </Col>
              </Col>
            </Row>
            <Col style={{ height: 5 }}></Col>
            <Col span={16} style={colStyle}>
              <Col className="border border-dark" span={12} style={colStyle}>
                <Col
                  className="text-center border-dark"
                  style={{ borderStyle: "none none dotted" }}
                  span={24}
                >
                  <b>
                    <span className="ft11">TRUST FUND</span>
                  </b>
                </Col>
                <Col span={12} style={colStyle}>
                  <div>
                    <span className="ft13">ATB/RED CROSS</span>
                    <br />
                  </div>
                  <span className="ft13">CHARITY</span>
                </Col>
                <Col className="text-right" span={12} style={colStyle}>
                  <div>
                    <span className="ft13">15.00</span>
                    <br />
                  </div>
                  <span className="ft13">10.00</span>
                </Col>
                <Col
                  className="text-right border-dark"
                  offset={18}
                  span={6}
                  style={{
                    borderStyle: "dotted none none none",
                    marginTop: -15,
                  }}
                >
                  <span className="ft13">25.00</span>
                </Col>
              </Col>
              <Col
                offset={1}
                className="border border-dark"
                span={11}
                style={colStyle}
              >
                <Col
                  className="text-center border-dark"
                  style={{ borderStyle: "none none dotted" }}
                  span={24}
                >
                  <b>
                    <span className="ft11">GENERAL FUND</span>
                  </b>
                </Col>
                <Col span={12} style={colStyle}>
                  <div>
                    <span className="ft13">ATB/RED CROSS</span>
                    <br />
                  </div>
                  <span className="ft13">CHARITY</span>
                </Col>
                <Col className="text-right" span={12} style={colStyle}>
                  <div>
                    <span className="ft13">15.00</span>
                    <br />
                  </div>
                  <span className="ft13">10.00</span>
                </Col>
                <Col
                  className="text-right border-dark"
                  offset={18}
                  span={6}
                  style={{
                    borderStyle: "dotted none none none",
                    marginTop: -15,
                  }}
                >
                  <span className="ft13">25.00</span>
                </Col>
              </Col>
            </Col>
            <Col span={8} style={colStyle}>
              <Col offset={1} span={23} style={colStyle}>
                <p className="ft11" style={{ marginBottom: 10 }}>
                  Please check whether all entries in this
                  Pre-Registration/Assessment Form are accurate and correc.
                </p>
                <p className="ft11" style={{ marginBottom: 10 }}>
                  Checked By:
                </p>
                <p className="ft11">
                  Kindly sign below to attest the correctness of all entries.
                </p>
              </Col>
              <Row style={rowStyle} justify="start">
                {/* <Col className="bottom-align-text" span={14} style={colStyle}>
=======
                <Col offset={0} span={24} style={colStyle}>
                    <Box>
                        <span className="ft12">{auth.school.name}</span><br />
                        <span className="ft13">{auth.school.address}</span>
                        <Row style={rowStyle} justify="start" >
                            <Col span={12} style={colStyle}>
                                <Row style={rowStyle} justify="start">
                                    <span className="ft12">PRE-REGISTRATION/ASSESSMENT FORM</span>
                                </Row>
                                <span className="ft11">Registration No.: </span><span className="ft11">{model.id}</span>
                            </Col>
                            <Col span={12} style={colStyle}>
                                <Col span={6}>
                                    <span className="ft11">School Year: </span><br />
                                    <span className="ft11">Reg. Date: </span>
                                </Col>
                                <Col span={18}>
                                    {/*  2018-2019, 1st Semester */}
                                    <span className="ft11">S.Y.: {auth.school.batch_sy}</span><br />
                                    {/* 17-Aug-2018 9:08 am */}
                                    <span className="ft11">{model.created_at}</span>
                                </Col>
                            </Col>
                        </Row>
                        <Row className="border border-dark" style={rowStyle} justify="start">
                            <Col offset={1} span={13} style={{ height: 50 }}>
                                <Col span={5}>
                                    <span className="ft11">Student :</span><br />
                                    <span className="ft11">Track|Strand :</span>
                                </Col>
                                <Col span={19}>
                                    <span className="ft11">{auth.fullname}</span><br />
                                    <span className="ft11">{auth.strand}</span>
                                </Col>
                            </Col>
                            <Col span={6} style={{ height: 50 }}>
                                <Col style={colStyle} span={12}>
                                    <span className="ft11">Grade Level :</span><br />
                                    <span className="ft11">Scholarship :</span>
                                </Col>
                                <Col style={colStyle} span={12}>
                                    <span className="ft11">{model.level.fullname}</span><br />
                                    <span className="ft11"></span>
                                </Col>
                            </Col>
                        </Row>
                        <Col style={{ height: 5 }}></Col>
                        <Row className="border border-dark" style={rowStyle} justify="start">
                            <Col className="text-center border-dark" span={24} style={{ borderStyle: 'none none dotted' }}>
                                <span className="ft11">REGISTERED SUBJECT</span>
                            </Col>
                            <Col className="text-center d-flex align-items-center border-dark" span={24} style={{ borderStyle: 'none none dotted' }}>
                                <Col span={3}>
                                    <span className="ft11">CODE</span>
                                </Col>
                                <Col span={5}>
                                    <span className="ft11">SUBJECT TITLE</span>
                                </Col>
                                <Col span={4}>
                                    <Col span={8}>
                                        <span className="ft11">LEC unit</span>
                                    </Col>
                                    <Col span={8}>
                                        <span className="ft11">LEC <br /> Hr</span>
                                    </Col>
                                    <Col span={8}>
                                        <span className="ft11">LAB Unit</span>
                                    </Col>
                                </Col>
                                <Col span={4}>
                                    <span className="ft11">Section</span>
                                </Col>
                                <Col span={5}>
                                    <span className="ft11">Schedule</span>
                                </Col>
                                <Col span={3}>
                                    <span className="ft11">Room</span>
                                </Col>
                            </Col>
                            {writer}
                            <Col span={24} style={{ marginTop: -30, height: 30 }}>
                                <Col offset={7} span={1}>
                                    <b><span className="ft11">Total:</span></b>
                                </Col>
                                <Col className="text-center border-top border-dark" span={4}>
                                    <Col span={8} style={colStyle}>
                                        <b><span className="ft11">{tlab}</span></b>
                                    </Col>
                                    <Col span={8} style={colStyle}>
                                        <b><span className="ft11">{tlec}</span></b>
                                    </Col>
                                    <Col span={8} style={colStyle}>
                                        <b><span className="ft11">{tUnit}</span></b>
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
                                <Col className="text-right border-dark" offset={18} span={6} style={{ borderStyle: 'dotted none none none', marginTop: -15 }}>
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
                                <Col className="text-right border-dark" offset={18} span={6} style={{ borderStyle: 'dotted none none none', marginTop: -15 }}>
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
                                {/* <Col className="bottom-align-text" span={14} style={colStyle}>
>>>>>>> 07877747153a3bae950ac948aae459da36f9e8b2
                                    <span style={{ position: 'absolute', bottom: 15 }} className="ft11">Serial : <span className="ft11">2020575-HWOK983</span></span>
                                </Col> */}
                <Col span={10} style={colStyle}>
                  <div
                    className="border border-dark"
                    style={{ height: 100, width: 100 }}
                  >
                    <img
                      id="qrcode"
                      src=""
                      alt=""
                      style={{ height: 95, width: 98 }}
                    />
                  </div>
                </Col>
<<<<<<< HEAD
              </Row>
            </Col>
            <Col offset={8} span={16} style={colStyle}>
              <Col span={12} style={colStyle}>
                <Col span={12}>
                  <span className="ft11">1st Payment</span>
                  <br />
                  <span className="ft11">2nd Payment</span>
                  <br />
                  <span className="ft11">3rd Payment</span>
                </Col>
                <Col className="text-right" span={12}>
                  <span className="ft13">2.500.00</span>
                  <br />
                  <span className="ft13">1,500.00</span>
                  <br />
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
                  <span
                    className="border-bottom border-dark"
                    style={{ position: "absolute", bottom: -50 }}
                  >
                    Student: AGUILAR, Rey John Pasig
                  </span>
                </Col>
              </Col>
            </Col>
            <div className="text-right" id="divprint">
              <button
                onClick={() => {
                  window.print();
                }}
                className="btn btn-primary"
                id="btnprint"
              >
                Print
              </button>
            </div>
          </Box>
        </Col>
      </Row>
      {generateCode(model._id)}
    </LayoutContentWrapper>
  );
=======
            </Row>
            {generateCode(model.id)}
        </LayoutContentWrapper>
    );
>>>>>>> 07877747153a3bae950ac948aae459da36f9e8b2
}
