import React from 'react';
import { Col } from 'antd';
import Box from '../../../../components/utility/box';
import './../style.css';

export default function () {
    return (
        <Col offset={2} span={20}>
            <Box>
                <Col className="text-center" span={24} style={{ marginBottom: 30 }}>
                    <b className="display-2 platform-title">Classroom System</b>
                </Col>
                <Col span={24} style={{ marginBottom: 20 }}>
                    <span className="platform-body" style={{ marginLeft: 50 }}>
                        Track your student in real time to ensure they are staying on track.
                        Collaborative tools to broadcast messages to students and support learning..

                        Provide a module, and assignment.
                    </span>
                </Col>
            </Box>
        </Col>
    );
}
