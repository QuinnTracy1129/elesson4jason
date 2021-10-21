import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Col } from 'antd';

export default ({ grades }) => {
    const writer = grades.map((subjects) => {
        const { title, log } = subjects;
        const name = [];
        const scores = [];
        let grade = undefined;
        if (log.final) {
            for (const [key, value] of Object.entries(log.final)) {
                if (key === 'grades') {
                    grade = value;
                } else {
                    name.push(<h5>{key}</h5>)
                    scores.push(<h5>{value}</h5>)
                }
            }

            // Attendance
            return (
                <div className="card">
                    <div className="card-header">
                        <h3> {title}</h3>
                    </div>
                    <div className="card-body">
                        <Col span={12}>{name}</Col>
                        <Col span={12}>{scores} </Col>
                    </div>
                    <div className="card-footer">
                        <Col span={12}>
                            <h5>Grade</h5>
                        </Col>
                        <Col span={12}>
                            <h5><b>{grade}</b></h5>
                        </Col>
                    </div>
                </div>
            )
        }
        return '';
    })
    return (
        <Col offset={4} span={16} style={{ marginBottom: 15 }}>
            {writer}
        </Col>
    );
};