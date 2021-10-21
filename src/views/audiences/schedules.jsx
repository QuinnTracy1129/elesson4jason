import React, { Component } from "react";

import LayoutContentWrapper from "./../../components/utility/layoutWrapper";
import { Row, Col } from "antd";
import basicStyle from "./../../config/basicStyle";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Box from "./../../components/utility/box";
// import Card from './../../enrollment/planning/schedulers/card';
import { tignan } from "./../../talaan";
import "./schedules.css";

const timeArray = [
  7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 1, 1.5, 2, 2.5, 3, 3.5, 4,
  4.5, 5, 5.5, 6, 6.5,
];
const { colStyle } = basicStyle;

export default class extends Component {
  constructor() {
    super();
    this.advisory = JSON.parse(localStorage.getItem("advisory"));
    this.state = {
      batch: this.advisory.batch_id,
      level: this.advisory.level_id,
      section: this.advisory.section_id,
      events: [],
      visible: false,
      writer: undefined,
    };
  }

  componentDidMount() {
    const { level, batch, section } = this.state;
    let params = { batch: batch, level: level, section: section };
    tignan("classrooms", params).then((data) => {
      const events = data.schedules ? data.schedules : [];
      const writer = this.tableWriter(events);
      this.setState({ events, writer });
    });
  }
  tableWriter = (events) => {
    let Reserve = [null, [], [], [], [], []];
    return timeArray.map((time) => {
      const str = time % 1 !== 0 ? `${parseInt(time, 10)}:30` : `${time}:00`;
      const sched = events.filter((event) => event.start === time);
      let td = [];
      for (let index = 1; index < 6; index++) {
        const element = sched.find((event) => event.week.includes(index));
        if (element) {
          let colspan = 1;
          const iStart = timeArray.findIndex(
            (event) => event === element.start
          );
          const iEnd = timeArray.findIndex((event) => event === element.end);

          const rowSpan = iEnd - iStart;
          if (rowSpan > 1) {
            for (let i = iStart; i < iEnd; i++) {
              Reserve[index].push(timeArray[i]);
            }
          }
          while (element.week.includes(index + 1)) {
            colspan++;
            index++;
            if (rowSpan > 1) {
              for (let i = iStart; i < iEnd; i++) {
                Reserve[index].push(timeArray[i]);
              }
            }
          }
          let bgColor = `${element.background}-color text-center text-uppercase font-weight-bold`;
          td.push(
            <td
              id={`${index}-${time}`}
              colSpan={colspan}
              rowSpan={rowSpan}
              className={bgColor}
            >
              {/* <Card
                                background={element.background}
                                title={element.room_id}
                                faculty={element.faculty_id} /> */}
            </td>
          );
        } else {
          if (!Reserve[index].includes(time)) {
            td.push(<td id={`${index}-${time}`}></td>);
          }
        }
      }
      return (
        <tr key={`table-${time}`}>
          <td className="text-center">
            <Row className="table-zero row-style">
              <Col
                span={24}
                style={{ position: "absolute", bottom: 5, right: 12.5 }}
              >
                <span className="h6">{str}</span>
              </Col>
              {time === 6.5 && (
                <Col
                  span={24}
                  style={{ position: "absolute", top: 8, right: 12.5 }}
                >
                  <span className="h6">7:00</span>
                </Col>
              )}
            </Row>
          </td>
          {td}
        </tr>
      );
    });
  };
  render() {
    return (
      <LayoutContentWrapper>
        <Row className="row-style" justify="start">
          <Col span={24} style={colStyle}>
            <Box>
              <MDBTable hover responsive bordered striped>
                <MDBTableHead>
                  <tr className="text-center">
                    <th>#</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>{this.state.writer}</MDBTableBody>
              </MDBTable>
            </Box>
          </Col>
        </Row>
      </LayoutContentWrapper>
    );
  }
}
