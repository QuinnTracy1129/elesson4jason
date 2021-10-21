import React from 'react';
import { Col } from 'antd';
import Box from '../../../../components/utility/box';
import './../style.css';

export default function () {
    return (
        <Col offset={2} span={20}>
            <Box>
                <Col className="text-center" span={24} style={{ marginBottom: 30 }}>
                    <b className="display-2 platform-title">Document Tracking System</b>
                </Col>
                <Col span={24} style={{ marginBottom: 20 }}>
                    <span className="platform-body" style={{ marginLeft: 50 }}>
                        A system used to receive, track, manage and store documents and reduce paper.
                        Most are capable of keeping a record of the various versions created and modified by different users (history tracking).
                        In the case of the management of digital documents such systems are based on computer programs.
                        The term has some overlap with the concepts of <b>content management systems</b>.
                        It is often viewed as a component of enterprise content management (ECM) systems and related to digital asset management, document imaging, workflow systems and records management systems.
                    </span>
                    <br />
                    <br />
                    <span className="platform-body" style={{ marginLeft: 50 }}>
                        A <b>document management system (DMS)</b>.
                        Simply stated, a document management system is an automated software solution  for organizing, securing, capturing, digitizing, tagging, approving, and completing tasks with your business files.
                        Although most <b>document management systems</b> store data in the cloud, a DMS is much more than just cloud storage.
                        Because advanced <b>document management systems</b>,  handle the large amounts of paper flowing into your campus for you, you can <i>spend time</i> on the work that you love.
                    </span>
                </Col>
            </Box>
        </Col>
    );
}
