import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import ContentHolder from '../../../components/utility/contentHolder';
import { Row, Col } from 'antd';
import basicStyle from '../../../config/basicStyle';

import QRCode from 'qrcode'; //npm i qrcode
const rowStyle = { width: '100%', display: 'flex', flexFlow: 'row wrap' }

// const generateCode = (code) => {
//     QRCode.toDataURL(code)
//         .then(url => { document.getElementById('qrcode').src = url; })
// }
// const getCurrentDate = () => {
//     let newDate = new Date()
//     let date = newDate.getDate();
//     let month = newDate.getMonth() + 1;
//     let year = newDate.getFullYear();
//     return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`;
// }

export default ({ title, code }) => {
    const { colStyle, rowStyle } = basicStyle;
    // const qr_string = `${code}:${getCurrentDate()}:${title}`
    return (
        <LayoutContentWrapper>
            <LayoutContent>
                <ContentHolder style={{ marginTop: '2%' }}>
                    <center>
                        {/* ID of Library Card */}
                        <h1>{title}</h1>
                        <small>Personnal QR</small>
                        <Row style={rowStyle} justify="start">
                            <Col span={24} style={colStyle}>
                                <div className="border border-dark" style={{ height: 300, width: 300 }}>
                                    <img id="qrcode" src="" alt="QR" style={{ height: 295, width: 298 }} />
                                    {/* {generateCode(qr_string)} */}
                                    {code}
                                </div>
                            </Col>
                        </Row>
                        <small><b>SCAN ME</b></small>
                    </center>
                </ContentHolder>
            </LayoutContent>
        </LayoutContentWrapper>
    );
};