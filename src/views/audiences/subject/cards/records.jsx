import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Col } from 'antd';

export default ({ records }) => {
    const add = (a, b) => a + b
    const writer = records.map((subjects) => {
        const { title, log } = subjects;
        const name = [];
        const scores = [];
        const total = [];

        for (const [key, value] of Object.entries(log.raw)) {
            name.push(<h5>{key}</h5>)
            scores.push(<h5>{value[1].join('; ')}</h5>)
            const avg = key === 'attn' ? value[1].length : value[1].reduce(add);
            total.push(<h5>{avg}/<small>{value[0]}</small></h5>)
        }

        return (
            <div className="card">
                <div className="card-header">
                    <h3>{title}</h3>
                </div>
                <div className="card-body">
                    <Col span={8}><h4><u>Title</u></h4>{name}</Col>
                    <Col span={8}><h4><u>Score</u></h4>{scores}</Col>
                    <Col span={8}><h4><u>Total</u></h4>{total}</Col>
                </div>
            </div>
        )
    })
    return (
        <Col offset={4} span={16} style={{ marginBottom: 15 }}>
            {writer}
        </Col>
    );
};