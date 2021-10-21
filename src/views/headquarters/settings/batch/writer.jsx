import '@fortawesome/fontawesome-free/css/all.min.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React from 'react';
import Button, { ButtonGroup } from '../../../../components/uielements/button';
import Popover from '../../../../components/uielements/popover';
const getBadge = status => {
    switch (status) {
        case 'done': return 'bg-danger text-white rounded'
        case 'pending': return 'bg-warning text-dark rounded'
        case 'ongoing': return 'bg-primary text-white rounded'
        default: return 'bg-light text-dark rounded'
    }
}
const getSem = sem => {
    switch (sem) {
        case '1st': return 'First Semister'
        case '2nd': return 'Second Semister'
        default: return 'Third Semister'
    }
}
const Writer = ({ models, exhibit, destroy }) => {
    if (models) {
        const writer = models.map((model, index) => {
            const { id, status, SY, semester } = model;
            return (
                <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{SY}</td>
                    <td>{getSem(semester)}</td>
                    <td style={{ textAlign: "center" }}><b className={getBadge(status)}>{status}</b></td>
                    <td>
                        <ButtonGroup>
                            <Popover content="Edit" >
                                <Button className="btn btn-outline-info" onClick={exhibit.bind(this, index)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </Popover>
                            <Popover
                                content="Delete"
                                placement="right"
                            >
                                <Button className="btn btn-outline-danger" onClick={destroy.bind(this, index, id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Popover>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        });
        return <MDBTable striped hover responsive>
            <MDBTableHead>
                <tr>
                    <th rowSpan="2">#</th>
                    <th rowSpan="2">Batch</th>
                    <th rowSpan="2">Semester</th>
                    <th rowSpan="2" style={{ textAlign: "center" }}>Status</th>
                    <th rowSpan="2">Action</th>
                </tr>
                <tr>
                </tr>
            </MDBTableHead>
            <MDBTableBody>{writer}</MDBTableBody>
        </MDBTable>
    } else {
        return 'No data found...'
    }
}

export default Writer