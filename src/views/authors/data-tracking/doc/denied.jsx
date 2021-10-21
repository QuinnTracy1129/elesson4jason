import React, { Component } from "react";
import ModalStyle from "../../../../containers/Feedback/Modal/modal.style";
import Modals from "../../../../components/feedback/modal";
import WithDirection from "../../../../config/withDirection";
import { MDBBadge, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Fullname from "./fullname";
const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class extends Component {
  state = { visible: false };

  toggle = () => this.setState({ visible: !this.state.visible });

  render() {
    return (
      <MDBBadge
        color="danger"
        className="text-uppercase"
        style={{ cursor: "pointer" }}
        onClick={this.toggle}
      >
        Denied&nbsp;
        <span className="badge badge-light rounded-circle">
          {this.props.models.length}
        </span>
        <Modal
          width="50%"
          visible={this.state.visible}
          title="Denied information"
          onCancel={this.toggle}
          footer={null}
        >
          <MDBTable>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>#</th>
                <th>By</th>
                <th>Reason</th>
                <th>At</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.props.models.map((model, index) => {
                return (
                  <tr key={`denied_info-${index}`}>
                    <td>{++index}</td>
                    <td>
                      <Fullname id={model.by} />
                    </td>
                    <td>{model.reason}</td>
                    <td>{model.at}</td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </Modal>
      </MDBBadge>
    );
  }
}
