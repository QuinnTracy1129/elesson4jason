import React, { Component } from "react";
import { connect } from "react-redux";
import clone from "clone";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import Menu from "../../../components/uielements/menu";
import SidebarWrapper from "../sidebar.style";

// Modal
import Modals from "../../../components/modal";
import { ModalContent } from "../../../components/modal/modal.style";

import appActions from "../../../redux/app/actions";
import Logo from "../../../components/utility/logo";
import { rtl } from "../../../config/withDirection";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faGlobeEurope,
  faUserLock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { tanong } from "../../../talaan";

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
const platform = "Classroom";
const { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed } =
  appActions;
const stripTrailingSlash = (str) => {
  if (str.substr(-1) === "/") {
    return str.substr(0, str.length - 1);
  }
  return str;
};

function info() {
  Modals.info({
    title: <h3>Screen has been locked.</h3>,
    content: (
      <ModalContent>
        <p>This is just to prevent random taps on screen.</p>
      </ModalContent>
    ),
    onOk() {},
    okText: "Unlock",
    cancelText: "Cancel",
  });
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.state = {
      entity: "classrooms/advisory",
      models: [],
      model: "",
      has_class: false,
      optionSections: undefined,
    };
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  componentDidMount() {
    let params = { faculty: this.auth.id };
    tanong("classroom/advisories/active", params).then((data) => {
      if (Object.entries(data).length !== 0) {
        localStorage.setItem("classroom", JSON.stringify(data));
        let subjects = [];
        if (data.schedule_info && data.schedule_info.length !== 0) {
          subjects = data.schedule_info.map((schedule) => {
            return {
              id: schedule.subject_id,
              title: schedule.subject,
              prof_id: schedule.faculty_id,
              room: schedule.room_id,
            };
          });
        }

        localStorage.setItem("subjects", JSON.stringify(subjects));
        this.setState({ models: [...data], has_class: true });
      } else {
        this.setState({ has_class: false });
      }
    });
    tanong("loads/active", params).then((data) => {
      if (Object.entries(data).length !== 0) {
        const { customizedTheme } = this.props;
        const url = stripTrailingSlash(this.props.url);
        const submenuStyle = {
          backgroundColor: "rgba(0,0,0,0.3)",
          color: customizedTheme.textColor,
        };
        const submenuColor = { color: customizedTheme.textColor };
        let optionSections = data.schedules.map((schedule, index) => {
          return (
            <Menu.Item style={submenuStyle} key={`subjects-${index}`}>
              <Link
                style={submenuColor}
                to={`${url}/cr/${schedule.classroom_id}/sections/${schedule.subject_id}/subject`}
              >
                {schedule.name} ({schedule.code})
              </Link>
            </Menu.Item>
          );
        });
        this.setState({ optionSections });
      } else {
      }
    });
  }
  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === "MobileView") {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      (key) => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      (key) => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = (key) => {
    const map = { sub3: ["sub2"] };
    return map[key] || [];
  };

  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === "rtl" ? "0" : "-17px",
      paddingRight: rtl === "rtl" ? "0" : "9px",
      marginLeft: rtl === "rtl" ? "-17px" : "0",
      paddingLeft: rtl === "rtl" ? "9px" : "0",
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  }

  render() {
    // const { url, app, toggleOpenDrawer, bgcolor } = this.props;
    const { app, toggleOpenDrawer, customizedTheme } = this.props;
    const url = stripTrailingSlash(this.props.url);
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? "vertical" : "inline";
    const onMouseEnter = (event) => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const scrollheight = app.height;
    // const submenuStyle = { backgroundColor: 'rgba(0,0,0,0.3)', color: customizedTheme.textColor };
    const submenuColor = { color: customizedTheme.textColor };
    let sidebar_background;
    switch (this.auth.rolename) {
      case "faculty":
        sidebar_background = "#33b5e5";
        break;

      case "master":
        sidebar_background = "#00C851";
        break;

      case "head":
        sidebar_background = "#2BBBAD";
        break;

      case "principal":
        sidebar_background = "#ff4444";
        break;

      default:
        sidebar_background = customizedTheme.backgroundColor;
        break;
    }
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="260"
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ backgroundColor: sidebar_background }}
        >
          <Logo collapsed={collapsed} platform={platform} link="cr/banner" />
          <Scrollbars
            renderView={this.renderView}
            style={{ height: scrollheight - 70 }}
          >
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={this.onOpenChange}
              className="isoDashboardMenu"
            >
              {/* <Menu.Item key="schedules">
                <Link to={`${url}/classroom/scheduler`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faSchool} /></i>
                    <span className="nav-text">Schedules</span>
                  </span>
                </Link>
              </Menu.Item> */}
              {/* Student only */}
              {/* <Menu.Item key="officers">
                <span className="isoMenuHolder" style={submenuColor}>
                  <i><FontAwesomeIcon icon={faUsers} /></i>
                  <span className="nav-text">Officers</span>
                </span>
              </Menu.Item> */}
              {this.state.has_class && (
                <Menu.Item key="request">
                  <Link to={`${url}/classroom/request`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i>
                        <FontAwesomeIcon icon={faUsers} />
                      </i>
                      <span className="nav-text">Request</span>
                    </span>
                  </Link>
                </Menu.Item>
              )}
              {this.state.has_class && (
                <Menu.Item key="subjects">
                  <Link to={`${url}/cr/subjects`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i>
                        <FontAwesomeIcon icon={faBookOpen} />
                      </i>
                      <span className="nav-text">Subjects</span>
                    </span>
                  </Link>
                </Menu.Item>
              )}
              <SubMenu
                key="sections"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i>
                      <FontAwesomeIcon icon={faGlobeEurope} />
                    </i>
                    <span className="nav-text">Sections</span>
                  </span>
                }
              >
                {this.state.optionSections}
              </SubMenu>
              <Menu.Item key="lockscreen">
                <span
                  onClick={info}
                  className="isoMenuHolder"
                  style={submenuColor}
                >
                  <i>
                    <FontAwesomeIcon icon={faUserLock} />
                  </i>
                  <span className="nav-text">Lockscreen</span>
                </span>
              </Menu.Item>
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

export default connect(
  (state) => ({
    app: state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme,
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);
