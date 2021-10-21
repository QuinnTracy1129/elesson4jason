import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { tanong } from '../../../../talaan';

import View from '../view'
import { ButtonGroup } from '../../../../components/uielements/button';

export default class extends Component {
    constructor() {
        super()
        this.auth = JSON.parse(localStorage.getItem('auth'));
        this.key = document.getElementById('InputTopbarSearch').style = "display:none";
        this.state = {
            models: []
        }
    }
    componentDidMount() {
        tanong('tracking/documents/checked', { department: this.auth.department_id })
            .then(data => {
                this.setState({ models: data })
            })
    }
    render() {
        const writer = this.state.models.map((model, index) => {
            console.log(model);
            const { id, title, category, code, fullname, url } = model;
            return (
                <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{title}</td>
                    <td className="text-uppercase">{category}</td>
                    <td>{code}</td>
                    <td>{fullname}</td>
                    <td>
                        <ButtonGroup>
                            <View title={title} email={this.auth.email} url={url} />
                        </ButtonGroup>
                    </td>
                </tr>
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
                        <th>Submitted by</th>
                        <th>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {writer}
                </MDBTableBody>
            </MDBTable>
        );
    }
}
