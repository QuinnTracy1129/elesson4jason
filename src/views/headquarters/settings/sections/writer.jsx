import '@fortawesome/fontawesome-free/css/all.min.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React from 'react';
import Button, { ButtonGroup } from '../../../../components/uielements/button';
import Popover from '../../../../components/uielements/popover';

const Writer = ({ models, exhibit, destroy }) => {
    let logs = 'No data found...'
    if (models) {
        logs = models.map((model, index) => {
            const { id, fullname, status, trackStrand, adviser, accumulate } = model;
            return (
                <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{fullname}</td>
                    <td>{trackStrand}</td>
                    <td>{accumulate}</td>
                    <td>{status}</td>
                    <td>{adviser}</td>
                    <td>
                        <ButtonGroup>
                            <Popover content="Edit" >
                                <Button className="btn btn-outline-info" onClick={exhibit.bind(this, index)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </Popover>
                            <Popover content="Delete" placement="right" >
                                <Button className="btn btn-outline-danger" onClick={destroy.bind(this, id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Popover>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
    }
    return (
        <MDBTable striped hover responsive>
            <MDBTableHead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Track strand</th>
                    <th>Capacity</th>
                    <th>Status</th>
                    <th>Adviser</th>
                    <th>Action</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>{logs}</MDBTableBody>
        </MDBTable>
    )
}

export default Writer