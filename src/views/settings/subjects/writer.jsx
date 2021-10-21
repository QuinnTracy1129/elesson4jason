import '@fortawesome/fontawesome-free/css/all.min.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React from 'react';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import Popover from '../../../components/uielements/popover';

const Writer = ({ models, exhibit, destroy, level }) => {
    if (models) {
        let writer = models
            .filter(model => model.level === level)
            .map((model, index) => {
                return (
                    <tr key={model.id}>
                        <td>{index + 1}</td>
                        <td>{model.code}</td>
                        <td>{model.name}</td>
                        <td>{model.description}</td>
                        <td>{model.yr_lvl}</td>
                        <td>{model.lab}</td>
                        <td>{model.lec}</td>
                        <td>{model.units}</td>
                        <td>
                            <ButtonGroup>
                                <Popover content="Edit" >
                                    <Button className="btn btn-outline-info">
                                        <FontAwesomeIcon icon={faEdit} onClick={exhibit.bind(this, index, model.id)} />
                                    </Button>
                                </Popover>
                                <Popover
                                    content="Delete"
                                    placement="right"
                                >
                                    <Button className="btn btn-outline-danger" onClick={destroy.bind(this, index, model.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </Popover>
                            </ButtonGroup>
                        </td>
                    </tr>
                )
            })

        return < MDBTable striped hover responsive >
            <MDBTableHead>
                <tr>
                    <th rowSpan="2">#</th>
                    <th rowSpan="2">Code</th>
                    <th rowSpan="2">Name</th>
                    <th rowSpan="2">Description</th>
                    <th colSpan="2" className="text-center">Units</th>
                    <th rowSpan="2">Tot Units</th>
                    <th rowSpan="2">Action </th>
                </tr>
                <tr>
                    <th>Lecture</th>
                    <th>Laboratory</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {writer}
            </MDBTableBody>
        </MDBTable >
    } else {
        return 'No data found...'
    }
}

export default Writer