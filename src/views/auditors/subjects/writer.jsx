import "@fortawesome/fontawesome-free/css/all.min.css";
import { faTag, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React from "react";
import Button, { ButtonGroup } from "../../../components/uielements/button";
import Popover from "../../../components/uielements/popover";

const Writer = ({ models, onTag, destroy }) => {
  let logs = "No data found...";
  if (models) {
    logs = models.map((model, index) => {
      const { id, subjects, professor, code, faculty_id } = model;
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td>{code}</td>
          <td>{subjects}</td>
          <td>{professor}</td>
          <td>
            <ButtonGroup>
              {faculty_id ? (
                <Popover content="Untag">
                  <Button
                    className="btn btn-outline-danger"
                    onClick={destroy.bind(this, id)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </Popover>
              ) : (
                <Popover content="Tag" placement="right">
                  <Button
                    className="btn btn-outline-info"
                    onClick={onTag.bind(this, id)}
                  >
                    <FontAwesomeIcon icon={faTag} />
                  </Button>
                </Popover>
              )}
            </ButtonGroup>
          </td>
        </tr>
      );
    });
  }

  return (
    <MDBTable striped hover responsive>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Code</th>
          <th>Subject</th>
          <th>Teacher</th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>{logs}</MDBTableBody>
    </MDBTable>
  );
};

export default Writer;

// let writer = this.state.models.map((model, index) => {
//     let prof = this.state.schedule_info.find(sched => sched.code === model.code)
//     return (
//         <tr key={model.id}>
//             <td>{index + 1}</td>
//             <td>{model.name}</td>
//             <td>{model.code}</td>
//             <td>{prof && prof.professor}</td>
//             <td>
//
//             </td>
//         </tr>
//     )
// })
