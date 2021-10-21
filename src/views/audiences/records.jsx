import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

export default ({ records }) => {

    const writer = records.map((records, index) => {
        const { id, title, text, posted_at, submit_at } = records;
        return (
            <tr key={id}>
                <td>{index + 1}</td>
                <td>{title}</td>
                <td>{text}</td>
                <td>{posted_at}</td>
                <td>{submit_at}</td>
            </tr>
        )
    })
    return (

        <MDBTable striped hover responsive>
            <MDBTableHead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Date Posted</th>
                    <th>Submission date</th>
                    <th>Submitted</th>
                    <th>Verified</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>{writer}</MDBTableBody>
        </MDBTable>
    );
};