import { Layout, LocaleProvider } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import { ThemeProvider } from 'styled-components';
import { siteConfig } from '../../config.js';
import themes from '../../config/themes';
import ThemeSwitcher from '../../containers/ThemeSwitcher';
import appActions from '../../redux/app/actions';
import authAction from '../../redux/auth/actions';
import {
  Adviser, aTracking, Forbidden, fTracking,
  Headquarter, Student
} from '../Sidebar';
import Topbar from '../Topbar/Topbar';
import AppRouter from './AppRouter';
import AppHolder from './commonStyle';
import "./global.css";
import "./scss/style.scss";




const { Content, Footer } = Layout;
const { logout } = authAction;
const { toggleAll } = appActions;
const getSidebar = (sp) => {
  switch (sp) {
    // Faculty
    case 'Adviser': return Adviser
    case 'fTracking': return fTracking
    // Admin
    case 'Headquarter': return Headquarter
    case 'aTracking': return aTracking
    case 'Forbidden': return Forbidden
    default:
      // Student
      return Student
  }
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.auth = JSON.parse(localStorage.getItem('auth'));
    this.advisory = JSON.parse(localStorage.getItem('advisory'));
    this.newbies = this.auth.role_id === "60764981ea6c0000fa00595b" || this.auth.role_id === "6028f7713e320000f40026c2" ? this.advisory ? true : false : true;
    this.state = { platform: this.auth.currentApp }
    // this.newbies = this.advisory ? true : this.auth.role_id ? true : false; // ?
  }

  render() {
    const { url } = this.props.match;
    const { selectedTheme, selectedPlatform } = this.props;
    const Sidebar = getSidebar(selectedPlatform || this.state.platform);

    return (
      <LocaleProvider>
        <ThemeProvider theme={themes[selectedTheme]}>
          <AppHolder>
            <Layout style={{ height: '100vh' }}>
              <Debounce time="1000" handler="onResize">
                <WindowResizeListener
                  onResize={windowSize =>
                    this.props.toggleAll(
                      windowSize.windowWidth,
                      windowSize.windowHeight
                    )}
                />
              </Debounce>
              <Topbar url={url} />
              <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
                {this.newbies && <Sidebar url={url} />}
                <Layout
                  className="isoContentMainLayout"
                  style={{ height: '100vh' }}>
                  <Content
                    className="isomorphicContent"
                    style={{
                      padding: '70px 0 0',
                      flexShrink: '0',
                      background: '#f1f3f6',
                    }}>
                    <AppRouter url={url} />
                  </Content>
                  <Footer
                    style={{
                      background: '#ffffff',
                      textAlign: 'center',
                      borderTop: '1px solid #ededed',
                    }}>
                    {siteConfig.footerText}
                  </Footer>
                </Layout>
              </Layout>
              {this.newbies && <ThemeSwitcher />}
            </Layout>
          </AppHolder>
        </ThemeProvider>
      </LocaleProvider >
    );
  }
}

export default connect(
  state => ({
    selectedTheme: state.ThemeSwitcher.toJS().changeThemes.themeName,
    selectedPlatform: state.PlatformSwitcher.toJS().selectedPlatform.code,
  }),
  { logout, toggleAll }
)(App);
