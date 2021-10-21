import React from 'react';
import "./style.css"
import QRCode from 'qrcode';

export default function ({code}) {

    QRCode.toDataURL(code)
    .then(url => {
        console.log(url)
        // qrimage = url;
    })
    .catch(err => {
        console.error(err)
    })
}