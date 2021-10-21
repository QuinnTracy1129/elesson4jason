import React, { Component } from 'react';
import Button, { ButtonGroup } from '../../../../components/uielements/button';
import Popover from '../../../../components/uielements/popover';
import { faCheck, faEye, faInfo, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MDBBadge, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Attachment from './attachment';
const getBadge = status => {
    let color;
    switch (status) {
        case 'pending':
            color = "yellow accent-4"
            break;

        case 'submitted':
            color = "primary"
            break;

        case 'checked':
            color = "secondary"
            break;

        case 'reviewed':
            color = "success"
            break;

        default:
            color = "default"
            break;

    }
    let badge = (
        <MDBBadge pill color={color}>
            <strong className="h6" >{status}</strong>
        </MDBBadge>
    )
    return badge;
}

export default class extends Component {
    state = {
        filetype: undefined,
        issue: false,
        exhibitAttachment: false
    }
    getHeader(status) {
        let header;
        switch (status) {
            case 'submitted':
                header = <th>Submitted</th>
                break;

            default:
                header = null
                break;
        }
        return header;
    }
    getColumn(status, value) {
        let column;
        switch (status) {
            case 'submitted':
                column = <td>{value}</td>;
                break;

            default:
                column = null;
                break;
        }
        return column;
    }

    //attachment
    onAttchment = (attachment, email, filetype) => {
        this.setState({ filetype, email, file_name: attachment, exhibitAttachment: !this.state.exhibitAttachment })
    }

    onClose = () => {
        this.setState({ exhibitAttachment: !this.state.exhibitAttachment })
    }

    //issue
    render() {
        const writer = this.props.models.map((model, index) => {
            const { id, title, category, status, code, submitted_at, signatories, url, email, issues, filetype } = model;
            let val = undefined
            if (status === "checked") {
                val = signatories[0].checked_at
            } else if (status === "reviewed") {
                val = signatories[1].reviewed_at
            } else if (status === "noted") {
                val = signatories[2].noted_at
            } else if (status === "denied") {
                val = issues.issue_at
            }
            return (
                <tr key={id}>
                    <td>{index + 1}</td>
                    <td className="text-capitalize">{title}</td>
                    <td className="text-capitalize">{category}</td>
                    <td className="text-capitalize">{code}</td>
                    {this.props.hasPublish || <td className="text-capitalize" >{getBadge(status)}</td>}
                    <td className="text-capitalize">{submitted_at}</td>
                    <td className="text-capitalize">{val}</td>
                    {/* {this.getColumn(this.props.status, submitted_at)} */}
                    <td>
                        <ButtonGroup>
                            {!this.props.hasPublish ? this.props.rolename === 'faculty' ? status === 'pending' &&
                                <div>
                                    <Popover content="Submit" placement="left" >
                                        <Button className="btn btn-outline-primary" onClick={() => { this.props.onEdit(index) }}>
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </Button>
                                    </Popover>
                                    <Popover content="Submit" placement="left" >
                                        <Button className="btn btn-outline-success" onClick={() => { this.props.onCheck(index) }}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </Button>
                                    </Popover></div> :
                                <Popover content="Submit" placement="left" >
                                    <Button className="btn btn-outline-success" onClick={() => { this.props.onCheck(index) }}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </Button>
                                </Popover> : null
                            }
                            <Popover content="View" placement="top" >
                                <Button className="btn btn-outline-info" onClick={() => { this.onAttchment(url, email, filetype) }}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                            </Popover>
                            {this.props.hasPublish || status !== 'denied' || < Popover content="Delete" placement="right">
                                <Button className="btn btn-outline-danger" onClick={() => { this.props.onExhibit(index) }}  >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Popover>}
                        </ButtonGroup>
                    </td>
                </tr >
            )
        })
        return (
            <MDBTable striped hover responsive>
                <MDBTableHead color="indigo accent-4" textWhite>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Code</th>
                        {this.props.hasPublish || <th>Status</th>}
                        <th>Submitted</th>
                        {this.getHeader(this.props.status)}
                        {this.props.hasPublish ? <th>Published</th> : <th>Process</th>}
                        <th>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>{writer}</MDBTableBody>
                <Attachment
                    filetype={this.state.filetype}
                    email={this.state.email}
                    exhibit={this.state.exhibitAttachment}
                    file_name={this.state.file_name}
                    onClose={this.onClose}
                />
            </MDBTable >
        );
    }
}
