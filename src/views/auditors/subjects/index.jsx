import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Title from "../../../components/header/index";
import LayoutContent from "../../../components/utility/layoutContent";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import { browse, destroy } from "../../../redux/BREAD/actions";
import { baguhin, baguhinOitala } from "../../../talaan";
import { tanong } from "./../../../talaan";
import { Dummy } from "./dummy";
import Writer from "./writer";

class Index extends Component {
  constructor() {
    super();
    this.classroom = JSON.parse(localStorage.getItem("classroom"));
    this.state = {
      url: "classrooms/schedules",
      entity: "classrooms",
      schedule_info: this.classroom.schedule_info,
      section: this.classroom.section_id,
      year_level: this.classroom.section.fullname,
      faculty: [],
    };
  }

  exhibit = (i) => {
    const model = this.props.models[i];
    this.setState({ model });
    this.toggle();
  };
  dummy = () => {
    this.setState({ model: Dummy });
    this.toggle();
  };
  componentDidMount() {
    this.onSearch();
    tanong("users/faculty").then((datas) => {
      datas.forEach((data) => {
        let { faculty } = this.state;
        faculty[`${data.id}.${data.appointed && data.appointed.id}`] =
          data.fullname;
        this.setState({ faculty });
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.searchKey !== this.props.searchKey) {
      this.onSearch(this.props.searchKey);
    }
  }
  onSearch = async (key) =>
    await this.props.browse(this.state.url, {
      key: key,
      classroom: this.classroom.id,
    });

  onTag = (i) => {
    Swal.fire({
      input: "select",
      text: "Select faculty",
      inputOptions: { faculty: this.state.faculty },
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            let val = value.split(".");
            let { models, batch_id } = this.state;
            models[i]["faculty_id"] = val[0];
            let params = { schedules: models };
            baguhin(this.state.entity, val[1], params).then((data) => {
              localStorage.setItem("classroom", JSON.stringify(data));
              let models = data.schedules;
              let schedule_info = data.schedule_info;
              this.setState({ models, schedule_info });
            });
            params = {
              classroom_id: val[1],
              faculty_id: val[0],
              subject_id: models[i].id,
              code: models[i].code,
              name: models[i].name,
              batch_id: batch_id,
            };
            baguhinOitala("loads", params).then((data) => console.log(data));
            resolve();
          } else {
            resolve("You need to select faculty)");
          }
        });
      },
    });
  };
  handlesDestroy = (pkey) => this.props.destroy(this.state.url, pkey);

  render() {
    let { year_level, section } = this.state;
    const { models } = this.props;
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <Title title={`${year_level} ${section}`} />
          <Writer
            models={models}
            onTag={this.onTag}
            destroy={this.handlesDestroy}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { models, key } = state.BREAD;
  return { models, searchKey: key };
}

export default connect(mapStateToProps, { browse, destroy })(Index);
