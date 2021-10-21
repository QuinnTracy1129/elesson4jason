import React, { Component } from 'react';
import Box from '../../../../components/utility/box';
import { MDBCol, MDBRow } from 'mdbreact';
import Modal from './modal';
import Card from './card';
import { tanong } from '../../../../talaan';

export default class extends Component {
    constructor() {
        super()
        this.url = localStorage.getItem('url');
        this.auth = JSON.parse(localStorage.getItem('auth'));
        this.state = {
            entity: 'users',
            models: [],
            positions: []
        };
        document.getElementById('InputTopbarSearch').style = "display:none";
    }

    componentDidMount() {
        tanong(this.state.entity).then(datas => {
            let { positions } = this.state;
            datas.map(data => {
                if (!positions.includes(data.position)) {
                    positions.push(data.position);
                }
                return "Mapped!";
            })
            this.setState({ models: [...datas] })
        })
    }

    handleSubmit = (value) => {
        this.setState({ positions: value })
    }

    render() {
        const writer = this.state.positions.map((position, index) => {
            return (
                <MDBRow key={`${position}-tree`} className={`${position}-tree mt-5 mb-5 text-center`}>
                    <MDBCol size="12" className="text-center mb-2">
                        <h2>{position}</h2>
                    </MDBCol>
                    {this.state.models.map(model => {
                        if (model.position === position) {
                            return (
                                <Card position={`${this.state.positions[index - 1]}-tree`} key={model.id} info={model} />
                            )
                        } else {
                            return null
                        }
                    })}
                </MDBRow>
            )
        })

        return (
            <MDBRow>
                <MDBCol size="12" className="mt-2">
                    <button onClick={() => console.log(this.state.models)}>Log Models</button>
                    <button onClick={() => console.log(this.state.positions)}>Log positions</button>
                    <Box>
                        <div className="text-right">
                            <Modal
                                onSubmit={this.handleSubmit}
                                positions={this.state.positions}
                                function="arrange"
                            />
                            <Modal />
                        </div>
                        {writer}
                    </Box>
                </MDBCol>
            </MDBRow>
        );
    }
}
