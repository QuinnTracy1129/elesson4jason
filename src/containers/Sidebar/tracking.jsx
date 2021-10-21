import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Menu from '../../components/uielements/menu';
import SidebarWrapper from './sidebar.style';

// Modal
import Modals from '../../components/modal';
import { ModalContent } from '../../components/modal/modal.style';

import appActions from '../../redux/app/actions';
import Logo from '../../components/utility/logo';
import { rtl } from '../../config/withDirection';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLock, faQrcode, faFileAlt, faFileSignature } from '@fortawesome/free-solid-svg-icons'

const SubMenu = Menu.SubMenu;
const platform = 'Data Tracking'
// const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed
} = appActions;
const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') { return str.substr(0, str.length - 1); }
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
    onOk() { },
    okText: 'Unlock',
    cancelText: 'Cancel',
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
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(key => !(app.openKeys.indexOf(key) > -1));
    const latestCloseKey = app.openKeys.find(key => !(newOpenKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) { nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey); }
    if (latestCloseKey) { nextOpenKeys = this.getAncestorKeys(latestCloseKey); }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = { sub3: ['sub2'] };
    return map[key] || [];
  };

  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: rtl === 'rtl' ? '0' : '9px',
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0'
    };
    return (<div className="box" style={{ ...style, ...viewStyle }} {...props} />);
  }

  render() {
    // const { url, app, toggleOpenDrawer, bgcolor } = this.props;
    const { app, toggleOpenDrawer, customizedTheme } = this.props;
    const url = stripTrailingSlash(this.props.url);
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) { toggleOpenDrawer(); }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) { toggleOpenDrawer(); }
      return;
    };
    const scrollheight = app.height;
    const styling = { backgroundColor: customizedTheme.backgroundColor };
    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: customizedTheme.textColor
    };
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
          style={styling}
        >
          <Logo collapsed={collapsed} platform={platform} link="newsfeed" />
          <Scrollbars renderView={this.renderView} style={{ height: scrollheight - 70 }}          >
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={this.onOpenChange}
              className="isoDashboardMenu"
            >
              <Menu.Item key="Signing">
                <Link className="isoMenuHolder" style={submenuColor} to={`${url}/admin/tracking/signing`}>
                  <i><FontAwesomeIcon icon={faFileSignature} /></i>
                  <span className="nav-text">For Signatory</span>
                </Link>
              </Menu.Item>
              <SubMenu key="data-tracking"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faFileAlt} /></i>
                    <span className="nav-text">Files</span>
                  </span>
                }
              >
                {/* planning */}
                <Menu.Item style={submenuStyle} key="memo">
                  <Link style={submenuColor} to={`${url}/admin/tracking/memo`}>memo</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="whlp">
                  <Link style={submenuColor} to={`${url}/tracking/whlp`}>Lesson Plan</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="Seminar">
                  <Link style={submenuColor} to={`${url}/data`}>Seminar|Travel and Authority</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="Leave">
                  <Link style={submenuColor} to={`${url}/data`}>Leave</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="Viewer">
                  <Link style={submenuColor} to={`${url}/data/tracking/viewer`}>Viewer</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="drive">
                  <Link style={submenuColor} to={`${url}/data/tracking/drive`}>Google drive</Link>
                </Menu.Item>
                {/* implementations */}

              </SubMenu>
              <Menu.Item key="scanme">
                <Link className="isoMenuHolder" style={submenuColor} to={`${url}/tracking/scanme`}>
                  <i><FontAwesomeIcon icon={faQrcode} /></i>
                  <span className="nav-text">Scan Me</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="lockscreen">
                <span onClick={info} className="isoMenuHolder" style={submenuColor}>
                  <i><FontAwesomeIcon icon={faUserLock} /></i>
                  <span className="nav-text">
                    Lockscreen
                    </span>
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
  state => ({
    app: state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);

