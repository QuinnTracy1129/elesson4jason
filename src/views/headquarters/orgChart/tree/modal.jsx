import React, { Component } from 'react';
import ModalStyle from '../../../../containers/Feedback/Modal/modal.style';
import WithDirection from '../../../../config/withDirection';
import Modals from '../../../../components/feedback/modal';
import { MDBCol, MDBIcon, MDBRow } from 'mdbreact';
import {
    sortableContainer,
    sortableElement,
    sortableHandle
} from "react-sortable-hoc";
import arrayMove from './arrayMove';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

//Drag handler
const DragHandle = sortableHandle(() => (
    <span>
        <MDBIcon icon='edit' />
    </span>
));

//Draggable elements
const SortableItem = sortableElement(({ value }) => (
    <div className="alert alert-primary" role="alert">
        <MDBRow>
            <MDBCol>
                <strong>{value}</strong>
            </MDBCol>
            <MDBCol className="text-right">
                <DragHandle />
            </MDBCol>
        </MDBRow>
    </div>
));

const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
});

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            positions: []
        };
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ positions }) => ({
            positions: arrayMove(positions, oldIndex, newIndex)
        }));
    };

    showModal = (type, value) => {
        if (type === 'arrange') {
            this.setState({ positions: value })
        }
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.positions)
    }

    render() {
        const { positions } = this.state;
        let writer;

        switch (this.props.function) {
            case 'arrange':
                const arrange = (
                    <span>
                        <button className="btn btn-outline-info" onClick={() => this.showModal('arrange', this.props.positions)}>
                            <MDBIcon icon="edit" />
                        </button>
                        <Modal
                            visible={this.state.visible}
                            title='Edit position arrangement'
                            onCancel={this.handleCancel}
                            footer={
                                <button className="btn btn-success" onClick={this.handleSubmit}>
                                    Submit
                                </button>
                            }
                        >
                            <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                                {positions.map((value, index) => (
                                    <SortableItem key={`item-${index}`} index={index} value={value} />
                                ))}
                            </SortableContainer>
                        </Modal>
                    </span>
                )

                writer = arrange;
                break;

            default:
                const add = (
                    <span>
                        <button className="btn btn-outline-primary" onClick={this.showModal}>
                            <MDBIcon icon="plus" />
                        </button>
                        <Modal
                            visible={this.state.visible}
                            title='Add an employee'
                            onCancel={this.handleCancel}
                            footer={null}
                        >
                            haha
                        </Modal>
                    </span>
                )

                writer = add;
                break;
        }

        return writer;
    }
}
