import {
  faCog,
  faDownload,
  faFileWord,
  faMapMarkerAlt,
  faSchool,
  faTree,
  faUserLock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "antd";
import clone from "clone";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// Modal
import Modals from "../../components/modal";
import { ModalContent } from "../../components/modal/modal.style";
import Menu from "../../components/uielements/menu";
import Logo from "../../components/utility/logo";
import { rtl } from "../../config/withDirection";
import appActions from "../../redux/app/actions";
import SidebarWrapper from "./sidebar.style";
import Swal from "sweetalert2";
// import axios from "axios";

const SubMenu = Menu.SubMenu;
const platform = "Headquarters";
// const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

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

function download() {
  Swal.fire({
    title: "Once we start this process, you have to wait until its done.",
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Yes, download it",
    denyButtonText: `Cancel`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      console.log("...");
    }
  });
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.platform = localStorage.getItem("platform");
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
    const map = {
      sub3: ["sub2"],
    };
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
    const submenuStyle = {
      backgroundColor: "rgba(0,0,0,0.3)",
      color: customizedTheme.textColor,
    };
    let auth = JSON.parse(localStorage.getItem("auth"));
    let sidebar_background;
    switch (auth.rolename) {
      case "principal":
        sidebar_background = "#ff4444";
        break;

      default:
        sidebar_background = customizedTheme.backgroundColor;
        break;
    }
    const submenuColor = { color: customizedTheme.textColor };
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
          <Logo collapsed={collapsed} platform={platform} link="hq/banner" />
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
              <Menu.Item key="request">
                <Link to={`${url}/classroom/faculty/request`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i>
                      <FontAwesomeIcon icon={faUsers} />
                    </i>
                    <span className="nav-text">Request</span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="school_info">
                <Link to={`${url}/hq/school/about`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i>
                      <FontAwesomeIcon icon={faSchool} />
                    </i>
                    <span className="nav-text">School Profile</span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="tree">
                <Link
                  className="isoMenuHolder"
                  style={submenuColor}
                  to={`${url}/hq/school/tree`}
                >
                  <i>
                    <FontAwesomeIcon icon={faTree} />
                  </i>
                  <span className="nav-text">Organizational Tree Chart</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="settings"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i>
                      <FontAwesomeIcon icon={faCog} />
                    </i>
                    <span className="nav-text">Settings</span>
                  </span>
                }
              >
                <Menu.Item style={submenuStyle} key="batch">
                  <Link style={submenuColor} to={`${url}/hq/school/batch`}>
                    Batch
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="classrooms">
                  <Link style={submenuColor} to={`${url}/hq/school/classrooms`}>
                    Classrooms
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="departments">
                  <Link
                    style={submenuColor}
                    to={`${url}/hq/school/departments`}
                  >
                    Department
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="levels">
                  <Link style={submenuColor} to={`${url}/hq/school/levels`}>
                    Levels
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="sections">
                  <Link style={submenuColor} to={`${url}/hq/school/sections`}>
                    Section
                  </Link>
                </Menu.Item>
                {/* <Menu.Item style={submenuStyle} key="rooms">
                  <Link style={submenuColor} to={`${url}/hq/school/rooms`}>Rooms</Link>
                </Menu.Item> */}
                <Menu.Item style={submenuStyle} key="subjects">
                  <Link style={submenuColor} to={`${url}/hq/school/subject`}>
                    Subjects
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="users">
                  <Link style={submenuColor} to={`${url}/hq/school/users`}>
                    Users
                  </Link>
                </Menu.Item>
              </SubMenu>
              {auth.rolename === "superadmin" && (
                <Menu.Item key="backup" onClick={download}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i>
                      <FontAwesomeIcon icon={faDownload} />
                    </i>
                    <span className="nav-text">Backup Files</span>
                  </span>
                </Menu.Item>
              )}
              {auth.rolename === "superadmin" && (
                <Menu.Item key="webTracking">
                  <Link to={`${url}/web/tracker`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                      </i>
                      <span className="nav-text">Web Tracker</span>
                    </span>
                  </Link>
                </Menu.Item>
              )}
              {auth.rolename === "superadmin" && (
                <Menu.Item key="documentTracking">
                  <Link to={`${url}/document/tracker`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i>
                        <FontAwesomeIcon icon={faFileWord} />
                      </i>
                      <span className="nav-text">Document Tracker</span>
                    </span>
                  </Link>
                </Menu.Item>
              )}
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
