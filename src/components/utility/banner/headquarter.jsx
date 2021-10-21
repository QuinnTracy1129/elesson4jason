import React from "react";
import { Col } from "antd";
import Box from "../../../components/utility/box";
import "./style.css";

export default function () {
  return (
    <Col offset={2} span={20}>
      <Box>
        <Col className="text-center" span={24} style={{ marginBottom: 30 }}>
          <b className="display-2 platform-title">Headquarter Platform</b>
        </Col>
        <Col span={24} style={{ marginBottom: 20 }}>
          <span className="platform-body" style={{ marginLeft: 50 }}>
            Headquarter software is intended to organize a campus tasks,
            appointments, and goals in a visually simplistic way. it initialized
            all the activities before it begins and has the capability to
            monitor. before platform will close, it must be approved by the HQ.
          </span>
        </Col>
      </Box>
    </Col>
  );
}
