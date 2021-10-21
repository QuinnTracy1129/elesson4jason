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
import { faUserLock, faClipboard } from "@fortawesome/free-solid-svg-icons";

const platform = "Elesson";
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

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
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
    const submenuColor = { color: customizedTheme.textColor };
    let auth = JSON.parse(localStorage.getItem("auth"));
    let sidebar_background;
    switch (auth.rolename) {
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
          <Logo
            collapsed={collapsed}
            platform={platform}
            link="tracking/newsfeed"
          />
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
              <Menu.Item key="doc">
                <Link
                  className="isoMenuHolder"
                  style={submenuColor}
                  to={`${url}/tracking/doc`}
                >
                  <i>
                    <FontAwesomeIcon icon={faClipboard} />
                  </i>
                  <span className="nav-text">Documents</span>
                </Link>
              </Menu.Item>
              {/**
               *  Outing
               *  Daily Lesson Log | weekly home learning plan
               *  Seminar | Travel and Authority
               *  Memo
               *
               *  ***Request
               *  Leave
               *  Repair and maintenance
               *  Purchase Request
               *
               */}
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
