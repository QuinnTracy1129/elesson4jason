import React, { Component } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtlas,
  faChartLine,
  faClipboardList,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import Tabs, { TabPane } from "../../../components/uielements/tabs";
import { Grade, Record, Module } from "./cards";
import { hanapin, tanong } from "../../../talaan";

function callback(key) {}

export default class extends Component {
  constructor(props) {
    super(props);
    this.advisory = JSON.parse(localStorage.getItem("advisory"));
    this.subject = JSON.parse(localStorage.getItem("subject"));
    this.state = {
      url: "documents",
      classroom: this.advisory.classroom,
      models: [],
      modules: [],
      assignments: this.advisory.classroom.asgmt,
      subjects: this.subject,
      subject_id: this.subject.id,
      visible: false,
      writer: undefined,
      subject: { syllabus: undefined },
    };
  }
  componentDidMount() {
    tanong("tracking/documents/modules", {
      user: this.advisory.classroom.faculty_id,
      subject: this.subject_id,
    }).then((modules) => this.setState({ modules }));
    hanapin("subjects", this.subject.id).then((subject) =>
      this.setState({ subject })
    );

    console.log(this.subject);
  }

  render() {
    const { modules, subjects, subject_id } = this.state;
    console.log(subject_id);
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <label className="h1">{subjects.title}</label>
          <Tabs onChange={callback} type="card">
            <TabPane
              tab={
                <span>
                  <FontAwesomeIcon icon={faAtlas} /> Syllabus
                </span>
              }
              key="1"
            >
              <div>{subjects.syllabus || ""}</div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <FontAwesomeIcon icon={faStickyNote} /> Modules
                </span>
              }
              key="2"
            >
              <Module modules={modules} />
            </TabPane>
            {/* <TabPane
              tab={
                <span>
                  <FontAwesomeIcon icon={faCogs} /> Assignments
                </span>
              }
              key="3"
            >
              <Assignment assignments={assignments} />
            </TabPane> */}
            <TabPane
              tab={
                <span>
                  <FontAwesomeIcon icon={faClipboardList} /> Records
                </span>
              }
              key="4"
            >
              {subjects.records ? (
                <Record records={subjects.records} />
              ) : (
                "No Record list"
              )}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <FontAwesomeIcon icon={faChartLine} /> Grades
                </span>
              }
              key="5"
            >
              {subjects.grades ? (
                <Grade grades={subjects.grades} />
              ) : (
                "No Grade list"
              )}
            </TabPane>
          </Tabs>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
