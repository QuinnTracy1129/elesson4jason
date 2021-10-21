import React, { Component } from 'react';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import Box from '../../../components/utility/box';
import { Row, Col } from 'antd';
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';

const timeArray = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5];
const datas = [
    {
        level_id: 1,
        section_id: 1,
        background: 'danger',
        week: 'mon',
        start: 7,
        end: 8,
        subject_id: 'Math 7',
        faculty_id: 'Faculy 1',
        room_id: 'Room 200',
    },
    {
        level_id: 2,
        section_id: 2,
        background: 'success',
        week: 'mon',
        start: 8,
        end: 9,
        subject_id: 'Math 8',
        faculty_id: 'Faculy 2',
        room_id: 'Room 201',
    },
    {
        level_id: 3,
        section_id: 3,
        background: 'primary',
        week: 'tue',
        start: 10,
        end: 12,
        subject_id: 'Math 2',
        faculty_id: 'Faculy 3',
        room_id: 'Room 202',
    },
    {
        level_id: 4,
        section_id: 4,
        background: 'secondary',
        week: 'tue',
        start: 1,
        end: 2,
        subject_id: 'Math 8',
        faculty_id: 'Faculy 5',
        room_id: 'Room 205',
    }
]

export default class extends Component {
    componentDidMount() {
        this.displayEvents();
    }

    displayEvents() {
        datas.map(data => {
            let bgColor = `${data.background}-color text-center text-white text-uppercase font-weight-bold`;
            let count = data.start;

            for (let i = data.start; i < data.end; i++) {
                // console.log(`${data.week}-${count}`);
                document.getElementById(`${data.week}-${count}`).className = bgColor;
                i -= 0.5;
                count += 0.5;
            }

            if (data.end - data.start < 1) {
                document.getElementById(`${data.week}-${data.start}`).innerHTML = `${data.subject_id} - ${data.room_id}, ${data.faculty_id}`;
            } else {
                document.getElementById(`${data.week}-${data.start}`).innerHTML = `${data.subject_id} - ${data.room_id}`;
                document.getElementById(`${data.week}-${(data.start + 0.5)}`).innerHTML = `${data.faculty_id}`;
            }

            return console.log(data);
        });
    }

    render() {


        const tableTime = timeArray.map((time) => {
            let str = time % 1 !== 0 ? `${parseInt(time, 10)}:30` : `${time}:00`;
            return (
                <tr key={`table-${time}`} style={{ height: '3rem' }}>
                    <td style={{ width: '8rem' }} className="text-center">
                        <Row className="row-style table-zero">
                            <Col span={24} style={{ position: 'absolute', bottom: 4 }}>
                                <span className="h5">{str} {time >= 7 ? "AM" : "PM"}</span>
                            </Col>
                            {
                                time === 6.5 ?
                                    <Col span={24} style={{ position: 'absolute', top: 18.5 }}>
                                        <span className="h5">7:00 PM</span>
                                    </Col>
                                    :
                                    null
                            }
                        </Row>
                    </td>
                    <td id={`mon-${time}`}></td>
                    <td id={`tue-${time}`}></td>
                    <td id={`wed-${time}`}></td>
                    <td id={`thur-${time}`}></td>
                    <td id={`fri-${time}`}></td>
                    <td id={`sat-${time}`}></td>
                </tr>
            );
        })

        return (
            <LayoutContentWrapper>
                <Row className="row-style" justify="start">
                    <Col span={24}>
                        <Box>
                            <MDBTable borderless striped hover responsive>
                                <MDBTableHead>
                                    <tr className="text-center">
                                        <th>#</th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th>Saturday</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {tableTime}
                                </MDBTableBody>
                            </MDBTable>
                        </Box>
                    </Col>
                </Row>
            </LayoutContentWrapper >
        );
    }
}
