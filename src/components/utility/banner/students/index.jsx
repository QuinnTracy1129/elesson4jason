import { Col } from 'antd';
import React from 'react';
import Box from '../../box';
import '../style.css';

export default function () {
    return (
        <Col offset={2} span={20}>
            <Box>
                <Col className="text-center mb-3" span={24}>
                    <b className="display-2 platform-title">Classroom System</b>
                </Col>
                <Col span={24} className="text-center">
                    <span className="platform-body" style={{ marginLeft: 50 }}>
                        Check your activies to ensure that you are staying on right track. <br />
                        Collaborative tools to broadcast messages to students and support learning..
                    </span>
                </Col>
            </Box>
        </Col>
    );
}
