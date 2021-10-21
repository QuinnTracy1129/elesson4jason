import React, { Component } from "react";
import LayoutContentWrapper from "../../../../components/utility/layoutWrapper";
import LayoutContent from "../../../../components/utility/layoutContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Popover from "../../../../components/uielements/popover";
import Tabs, { TabPane } from "../../../../components/uielements/tabs";
import { tanong, itala, baguhin, itago } from "../../../../talaan";
import Card from "./card";
import axios from "axios";
import moment from "moment";
import { MDBCol, MDBRow } from "mdbreact";

//status
import Table from "./table";
export default class extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.classroom = JSON.parse(localStorage.getItem("classroom"));
    this.state = {
      entity: "tracking/documents",
      onProcess: [],
      published: [],
      exhibit: false,
      activeIndex: 0,
      form: {},
      file_name: undefined,
      editModel: false,
    };
    this.key = document.getElementById("InputTopbarSearch");
    this.key.style = "display:block";
  }
  componentDidMount() {
    let status;
    switch (this.auth.rolename) {
      case "master":
        status = ["submitted", "checked"];
        break;
      case "head":
        status = ["checked", "reviewed"];
        break;
      case "principal":
        status = ["reviewed", "noted"];
        break;
      default:
        status = ["reviewed", "noted"];
        break;
    }
    let param =
      this.auth.rolename === "faculty"
        ? {
            user: this.auth.id,
            batch: this.auth.batch_id,
            status: status,
          }
        : {
            rolename: this.auth.rolename,
            batch: this.auth.batch_id,
            status: status,
            department: this.auth.department_id,
          };
    tanong(this.state.entity, param).then((datas) => {
      // console.log(datas);
      let onProcess = datas.filter((data) =>
        this.auth.rolename === "faculty"
          ? data.status !== "noted"
          : data.status === status[0]
      );
      let published = datas.filter((data) =>
        this.auth.rolename === "faculty"
          ? data.status === "noted"
          : data.status === status[1]
      );
      // console.log('onProcess', published);
      this.setState({ onProcess, published });
    });
    this.key.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.onSearch();
        this.key.value = "";
      }
    });
  }
  componentWillUnmount() {
    this.key.removeEventListener("keyup", this.onSearch);
  }

  onExhibit = (i) => {
    let model = this.state.onProcess[i];
    this.setState({
      editModel: false,
      activeIndex: i,
      newModel: false,
      model: model,
      issue: {
        title: "",
        description: "",
      },
    });
    this.switchExhibitStatus();
  };
  onEdit = (i) => {
    let model = this.state.onProcess[i];
    this.setState({
      activeIndex: i,
      newModel: true,
      model: model,
    });
    this.switchExhibitStatus();
  };
  newExhibit = () => {
    this.setState({
      model: {
        department_id: this.auth.department_id,
        user_id: this.auth.id,
        batch_id: this.auth.batch_id,
        status: "pending",
        title: undefined,
        issue: {
          title: "",
        },
      },
      newModel: true,
    });
    this.switchExhibitStatus();
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, exhibit: false });
    }, 2000);
  };

  fileUploadHandler = async (file, name) => {
    const files = file;
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      let { form } = this.state;
      form.file_base64 = reader.result;
      form.name = `${name}.${file.name.split(".").pop()}`;
      form.url = `Users/${this.auth.email}/dll`;
      this.setState({ form });
      axios.post("api/auth/upload", this.state.form, {
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        },
      });
    };
  };

  onSave = () => {
    if (this.state.model.file) {
      this.fileUploadHandler(this.state.model.file, this.state.model.title);
    }
    itala(this.state.entity, this.state.model).then((data) => {
      let { onProcess } = this.state;
      onProcess.push(data);
      this.setState({ onProcess: onProcess });
    });
  };

  onUpdate = (model) => {
    baguhin(
      this.state.entity,
      model ? model.id : this.state.model.id,
      model || this.state.model
    ).then((data) => {
      let { onProcess, published } = this.state;
      if (this.auth.rolename === "principal") {
        onProcess.splice(this.state.activeIndex, 1);
        published.push(data);
        this.setState({ onProcess, published });
      } else {
        onProcess[this.state.activeIndex] = data;
        this.setState({ onProcess });
      }
    });
  };
  onDelete = async (i, pk) => {
    let has_removed = await itago(this.state.entity, pk);
    if (has_removed) {
      let models = this.state.models;
      models.splice(i, 1);
      this.setState({ models });
    }
  };
  switchExhibitStatus() {
    this.setState({ exhibit: !this.state.exhibit });
  }
  handleSearchReset(key) {
    this.onSearch(key);
  }

  // Callback function
  closeModal = () => {
    this.switchExhibitStatus();
  };
  handleSubmit = (model) => {
    this.setState({ model });
    this.state.newModel ? this.onSave() : this.onUpdate();
    this.switchExhibitStatus();
  };

  onSubmitted = (i) => {
    let status;
    let signature;
    let now = moment().format("MM/d/Y");
    switch (this.auth.rolename) {
      case "master":
        status = "checked";
        signature = { checked_by: this.auth.id, checked_at: now };
        break;

      case "head":
        status = "reviewed";
        signature = { reviewed_by: this.auth.id, reviewed_at: now };
        break;

      case "principal":
        status = "noted";
        signature = { noted_by: this.auth.id, noted_at: now };
        break;

      default:
        status = "submitted";
        break;
    }
    let onProcess = this.state.onProcess[i];
    onProcess.status = status;
    if (this.auth.rolename !== "faculty") {
      if (onProcess.signatories) {
        onProcess.signatories.push(signature);
      } else {
        onProcess.signatories = [signature];
      }
    } else {
      onProcess.submitted_at = moment().format("MM/d/Y");
    }
    console.log(onProcess);
    this.onUpdate(onProcess, i);
  };
  render() {
    let tab = () => {
      switch (this.auth.rolename) {
        case "faculty":
          return "Published";
        case "master":
          return "Checked";

        case "head":
          return "Reviewed";
        case "principal":
          return "Published";

        default:
          return ["Processing", "Publish"];
      }
    };
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <MDBRow>
            <MDBCol>
              <h1>Documents</h1>
            </MDBCol>
          </MDBRow>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Processing" key="1">
              {this.auth.rolename === "faculty" && (
                <div className="text-right">
                  <Popover content="Add a Lesson plan">
                    <button
                      className="btn btn-outline-primary rounded-pill btn-sm"
                      onClick={this.newExhibit}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </Popover>
                </div>
              )}
              <Table
                rolename={this.auth.rolename}
                onExhibit={this.onExhibit}
                onCheck={this.onSubmitted}
                onEdit={this.onEdit}
                hasPublish={false}
                models={this.state.onProcess}
              />
            </TabPane>
            <TabPane tab={tab()} key="2">
              <Table
                onCheck={this.onSubmitted}
                hasPublish={true}
                models={this.state.published}
              />
            </TabPane>
          </Tabs>
        </LayoutContent>
        <Card
          model={this.state.model}
          newModel={this.state.newModel}
          exhibit={this.state.exhibit}
          onClose={this.closeModal}
          onSubmit={this.handleSubmit}
        />
      </LayoutContentWrapper>
    );
  }
}
