import React, { Component } from "react";
import Adviser from "./adviser_new/index";
import Master from "./master/index";
import Head from "./head/index";
import Principal from "./principal/index";
// import { tignan } from "../../../talaan";

const getViewer = (sp) => {
  switch (sp) {
    case "faculty":
      return Adviser;
    case "master":
      return Master;
    case "head":
      return Head;
    default:
      return Principal;
    // return Student
  }
};

export default class extends Component {
  render() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const Viewer = getViewer(auth.rolename);
    return <Viewer />;
  }
}
