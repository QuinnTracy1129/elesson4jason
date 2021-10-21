import React, { Component } from "react";
import Adviser from "./adviser/index";
import Master from "./master/index";
import Head from "./head/index";
import { tignan } from "../../../talaan";

export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.key = document.getElementById("InputTopbarSearch").style =
      "display:none";
    this.state = {
      show_index: undefined,
    };
  }
  componentDidMount() {
    tignan("departments", {
      user: this.auth.id,
      department: this.auth.department_id,
    }).then((data) => {
      this.setState({ show_index: data });
    });
  }
  render() {
    return <Adviser />;
    // let show_index;
    // switch (this.state.show_index) {
    //     case 'head':
    //         show_index = <Head />
    //         break;

    //     case 'master':
    //         show_index = <Master />
    //         break;

    //     case 'adviser':
    //         break;

    //     default:
    //         show_index = 'LOADING'
    //         break;
    // }
    // return show_index;
  }
}
