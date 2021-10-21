import React, { Component } from 'react'
import { Row, Col } from 'antd';
import basicStyle from '../../config/basicStyle';
import QRCode from 'qrcode'; //npm i qrcode

const generateCode = (code) => {
    QRCode.toDataURL(code)
        .then(url => { document.getElementById('qrcode').src = url; })
}

const getCurrentDate = () => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`;
}

export default class QrCode extends Component {
    render() {
        const { colStyle, rowStyle } = basicStyle;
        const qrCode = `${this.props.qrCode}:${getCurrentDate()}:qr code`
        return (
            < Row style={rowStyle} justify="start" >
                <Col span={24} className="text-center" style={colStyle}>
                    <h1>{this.props.title}</h1>
                    <h6>{this.props.subtitle}</h6>
                    <Col style={{ maxHeight: 300, maxWidth: 300 }} className="mx-auto text-center">
                        <img className="border border-dark" id="qrcode" alt="qrcode" style={{ height: 300, width: 300 }} />
                    </Col>
                    {generateCode(qrCode)}
                    <h4 className="">{this.props.footer}</h4>
                </Col>
            </Row >
        )
    }
}