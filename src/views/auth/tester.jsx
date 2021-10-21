import React from "react";
import axios from "axios";
import Modals from "../../components/feedback/modal";
import WithDirection from "../../config/withDirection";
import ModalStyle from "../../containers/Feedback/Modal/modal.style";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class Tester extends React.Component {
  state = {
    visible: false,
    roles: [],
  };
  toggle = () => {
    axios.get("api/forbidden/attached/authority/roles").then((res) => {
      this.setState({
        visible: !this.state.visible,
        roles: res.data,
      });
    });
  };

  render() {
    return (
      <div>
        <strong className="align-middle" onClick={this.toggle}>
          eLesson
        </strong>
        <Modal
          visible={this.state.visible}
          title="TESTER"
          onCancel={this.toggle}
          footer={null}
        >
          <MDBTable striped hover responsive>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Display name</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.state.roles.map((role, index) => {
                const { name, display_name } = role;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{display_name}</td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </Modal>
      </div>
    );
  }
}
