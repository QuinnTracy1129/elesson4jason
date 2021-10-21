import '@fortawesome/fontawesome-free/css/all.min.css';
import { faCogs, faPaintRoller, faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { MDBContainer, MDBListGroup, MDBListGroupItem } from "mdbreact";
import 'mdbreact/dist/css/mdb.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Switcher from '../../components/themeSwitcher/themeSwitcher';
import Tabs, { TabPane } from '../../components/uielements/tabs';
import Actions from '../../redux/themeSwitcher/actions.js';
import Themes from './config';
import ThemeSwitcherStyle from './themeSwitcher.style';



const { switchActivation, changeTheme } = Actions;

function callback(key) { }

class ThemeSwitcher extends Component {
  render() {
    const {
      isActivated,
      topbarTheme,
      sidebarTheme,
      layoutTheme,
      switchActivation,
      changeTheme
    } = this.props;

    const styleButton = { background: sidebarTheme.buttonColor };

    return (
      <ThemeSwitcherStyle className={isActivated ? 'isoThemeSwitcher active' : 'isoThemeSwitcher'}      >
        <div className="componentTitleWrapper" style={styleButton}>
          <h3 className="componentTitle">Settings</h3>
        </div>

        <div className="SwitcherBlockWrapper">
          <Tabs onChange={callback} type="card">
            <TabPane
              tab={<span><FontAwesomeIcon icon={faPaintRoller} />Themes</span>} key="1">
              <Switcher
                changeTheme={changeTheme}
                config={Themes.sidebarTheme}
                selectedId={sidebarTheme.themeName}
              />

              <Switcher
                changeTheme={changeTheme}
                config={Themes.topbarTheme}
                selectedId={topbarTheme.themeName}
              />

              <Switcher
                changeTheme={changeTheme}
                config={Themes.layoutTheme}
                selectedId={layoutTheme.themeName}
              />
            </TabPane>
            <TabPane
              tab={<span><FontAwesomeIcon icon={faCogs} />Settings</span>} key="2">
              <MDBContainer>
                <MDBListGroup>
                  <Link to="/jms/schools">
                    <MDBListGroupItem>This School</MDBListGroupItem>
                  </Link>
                  <Link to="/jms/school/organizational/chart">
                    <MDBListGroupItem>Organizational Chart</MDBListGroupItem>
                  </Link>
                  <Link to="#">
                    <MDBListGroupItem>LEDGER'S</MDBListGroupItem>
                  </Link>
                  <Link to="/jms/applicants">
                    <MDBListGroupItem>Applicant's</MDBListGroupItem>
                  </Link>
                  <Link to="/jms/employees">
                    <MDBListGroupItem>Employees</MDBListGroupItem>
                  </Link>
                  <Link to="#">
                    <MDBListGroupItem>Access</MDBListGroupItem>
                  </Link>
                  <Link to="/jms/batches">
                    <MDBListGroupItem>Batches</MDBListGroupItem>
                  </Link>
                  <Link to="/jms/levels">
                    <MDBListGroupItem>Year Levels</MDBListGroupItem>
                  </Link>
                  <Link to="/jms/sections">
                    <MDBListGroupItem>Sections</MDBListGroupItem>
                  </Link>
                  <Link to="/jms/subjects">
                    <MDBListGroupItem>Subjects</MDBListGroupItem>
                  </Link>
                  <Link to="/jms/rooms">
                    <MDBListGroupItem>Rooms</MDBListGroupItem>
                  </Link>
                </MDBListGroup>
              </MDBContainer>
            </TabPane>

          </Tabs>
        </div>

        <button
          type="primary"
          className="switcherToggleBtn"
          style={styleButton}
          onClick={() => { switchActivation(); }}
        >
          <FontAwesomeIcon icon={faTools} size='2x' style={{ color: 'white' }} />
        </button>
      </ThemeSwitcherStyle >
    );
  }
}
function mapStateToProps(state) { return { ...state.ThemeSwitcher.toJS() }; }
export default connect(mapStateToProps, { switchActivation, changeTheme })(ThemeSwitcher);
