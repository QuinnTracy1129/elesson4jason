// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "antd";
import React from "react";
import basicStyle from "../../config/basicStyle";
import Button, { ButtonGroup } from "../uielements/button";
import Popover from "../uielements/popover";

const Index = ({ title, dummy, option1, default1, option2, default2 }) => {
  const { rowStyle } = basicStyle;
  console.log("option1 ", option1);

  return (
    <Row style={rowStyle} justify="start">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-11">
            <ul className="list-group list-group-horizontal">
              <li>
                <h1>{title}</h1>
              </li>
              <li className="ml-1 d-flex align-self-center">
                {option1 && (
                  <select className="mx-auto browser-default custom-select">
                    <option>Choose your option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                )}
              </li>
              <li className="ml-1 d-flex align-self-center">
                {option2 && (
                  <select className="mx-auto browser-default custom-select">
                    <option>Choose your option</option>
                    <option value="1" selected>
                      Option 1
                    </option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                )}
              </li>
            </ul>
          </div>
          {dummy && (
            <div className="d-flex align-self-center col-md-1 text-right">
              <ButtonGroup className="mx-auto">
                <Popover content={`Add ${title}`}>
                  <Button className="btn btn-outline-primary" onClick={dummy}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </Popover>
              </ButtonGroup>
            </div>
          )}
        </div>
      </div>
    </Row>
  );
};

export default Index;
