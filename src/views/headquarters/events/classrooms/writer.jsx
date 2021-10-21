import '@fortawesome/fontawesome-free/css/all.min.css';
import { faTimes, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React from 'react';
import Button, { ButtonGroup } from '../../../../components/uielements/button';
import Popover from '../../../../components/uielements/popover';

const Writer = ({ models, exhibit, destroy }) => {
    if (models) {
        console.log(models);
        const writer = models.map((model, index) => {
            const { id, appointed, SY, semester } = model;
            return (
                <tr key={model.id}>
                    <td>{index + 1}</td>
                    <td>
                        {/* <img
                            width="50"
                            height="auto"
                            alt={model.fullname}
                            src={`${model.profile}`}
                            onError={
                                (e) => {
                                    e.target.onerror = null;
                                    e.target.src = Default
                                }}
                        /> */}
                    </td>
                    <td>{model.fullname}</td>
                    <td>{model.is_male ? 'Male' : 'Female'}</td>
                    <td>{model.ern}</td>
                    <td className="text-capitalize">{model.appointed && model.appointed.position}</td>
                    <td className="text-capitalize">{model.appointed && model.appointed.levelname}</td>
                    <td className="text-capitalize">{model.appointed && model.appointed.sectionname}</td>
                    <td className="text-capitalize">{model.appointed && model.appointed.room}</td>
                    <td>
                        <ButtonGroup>
                            {
                                model.appointed ?
                                    <Popover content="Untag" >
                                        <Button className="btn btn-outline-danger" onClick={this.handlesUntag.bind(this, index)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                    </Popover>
                                    :
                                    <Popover content="Tag" >
                                        <Button className="btn btn-outline-info" onClick={this.onExhibit.bind(this, index)}>
                                            <FontAwesomeIcon icon={faUserTag} />
                                        </Button>
                                    </Popover>
                            }
                        </ButtonGroup>
                    </td>
                </tr>
            )
        });
        return <MDBTable striped hover responsive>
            <MDBTableHead>
                <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>Adviser</th>
                    <th>Gender</th>
                    <th>Employee Registered Number</th>
                    <th>Position</th>
                    <th>Level</th>
                    <th>Section</th>
                    <th>Room</th>
                    <th>Action</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>{writer}</MDBTableBody>
        </MDBTable>
    } else {
        return 'No data found...'
    }
}

export default Writer