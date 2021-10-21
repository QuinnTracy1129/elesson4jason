import '@fortawesome/fontawesome-free/css/all.min.css';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React from 'react';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import Popover from '../../../components/uielements/popover';

const Writer = ({ models, exhibit }) => {
    if (models) {
        const writer = models.map((model, index) => {
            return (
                <tr key={model.id}>
                    <td>{index + 1}</td>
                    <td>{model.fullname}</td>
                    <td className="text-capitalize">{model.position}</td>
                    <td>{model.gender}</td>
                    <td>{model.dob}</td>
                    <td>{model.pob}</td>
                    <td>
                        <ButtonGroup>
                            <Popover content="Demote" placement="left">
                                <Button className="btn btn-outline-danger">
                                    <FontAwesomeIcon icon={faUserTimes} onClick={exhibit.bind(this, index)} />
                                </Button>
                            </Popover>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
        return (
            <MDBTable striped hover responsive>
                <MDBTableHead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>POB</th>
                        <th>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>{writer}</MDBTableBody>
            </MDBTable>
        )
    } else {
        return 'No data found...'
    }
}

export default Writer