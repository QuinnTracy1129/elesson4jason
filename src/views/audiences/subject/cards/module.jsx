import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import View from "./module/view";
import Download from "./module/download";

export default ({ modules }) => {
  const writer = modules.map((module, index) => {
    const {
      id,
      title,
      departmentname,
      email,
      interactiveWord,
      submitted_at,
      created_at,
      filetype,
      url,
      downloads,
    } = module;
    return (
      <tr key={`m-${id}`}>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{submitted_at}</td>
        <td>
          <View
            created_at={created_at}
            departmentname={departmentname}
            title={title}
            email={email}
            url={url}
            filetype={filetype}
            interactiveWord={interactiveWord}
          />
          {filetype === "pdf" && (
            <Download
              document_id={id}
              downloads={downloads}
              departmentname={departmentname}
              email={email}
              created_at={created_at}
              url={url}
            />
          )}
        </td>
      </tr>
    );
  });
  return (
    <MDBTable striped hover responsive>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date Posted</th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>{writer}</MDBTableBody>
    </MDBTable>
  );
};
