import {
  faBookReader, faCalculator, faCalendarAlt, faClipboard, faClipboardCheck, faClipboardList, faClock, faDatabase, faDollyFlatbed, faPlusSquare, faPoll, faUserLock, faWalking
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout } from 'antd';
import clone from 'clone';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Modal
import Modals from '../../components/modal';
import { ModalContent } from '../../components/modal/modal.style';
import Menu from '../../components/uielements/menu';
import Logo from '../../components/utility/logo';
import { rtl } from '../../config/withDirection';
import appActions from '../../redux/app/actions';
import SidebarWrapper from './sidebar.style';




const SubMenu = Menu.SubMenu;
const platform = 'SMS'
// const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed
} = appActions;
const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};

function info() {
  Modals.info({
    title: <h3>Screen has been locked.</h3>,
    content: (
      <ModalContent>
        <p>
          This is just to prevent random taps on screen.
        </p>
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
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
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
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  };

  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: rtl === 'rtl' ? '0' : '9px',
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0'
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

              <SubMenu key="enrollment"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faClipboard} /></i>
                    <span className="nav-text">Enrollment</span>
                  </span>
                }
              >
                {/* Planning */}
                <Menu.Item style={submenuStyle} key="batches">
                  <Link style={submenuColor} to={`${url}/batches`}>Academic Year</Link>
                  {/* Academic Year: 2019-2020 */}
                  {/* Academic term: 1st Sem, 2nd Sem */}
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="designations">
                  <Link style={submenuColor} to={`${url}/enrollment/designations`}>Designation</Link> {/* Secretary of department */}
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="loads">
                  {/* Not Available Prof (TBA: To be announce) */}
                  <Link style={submenuColor} to={`${url}/enrollment/loads`}>Teaching Load</Link> {/* Secretary of department */}
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="schedulers">
                  <Link style={submenuColor} to={`${url}/enrollment/schedulers`}>Scheduler</Link> {/* Secretary of department */}
                </Menu.Item>
                {/* Implementation */}
                <Menu.Item style={submenuStyle} key="applications">
                  <Link style={submenuColor} to={`${url}/enrollment/applications`}>Applicant's</Link>
                  {/* 
                  * Campus/Course
                  * ***freshmen 
                  * GM
                  * img (within the last 3 months)
                  * Card(sf9|138, sf10|137)
                  * birt cert
                  * 
                  * ***Trasferees
                  * Letter
                  * TOR
                  * 
                  * ***Cross Enroll
                  * img
                  * Letter
                  * 
                  * */}
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="admissions">
                  <Link style={submenuColor} to={`${url}/enrollment/admissions`}>Admission</Link>
                  {/* 
                  * OAR(office of Admission and Registration)
                  * 
                  */}

                </Menu.Item>
                <Menu.Item style={submenuStyle} key="registrations">
                  <Link style={submenuColor} to={`${url}/enrollment/registrations`}>Registrants</Link>{/**Old, Returning, Shifters */}
                  {/* 
                  * Open Regular Sections
                  * ***Old , new
                  *  Regular->Section->Enrolling Teacher->approved
                  *  Irregular->Enrolling Teacher(Tag Subject)->Sections->approved
                  *      **Crossenroll by subject**->letter->Enrolling Teacher A-> Enrolling Teacher B-> approved
                  * 
                  * ***Returning|Shifters|transferee
                  *   Registrat->Regular|Irregular
                  * 
                  */}

                  {
                    /**
                     * img
                     * card|137|138
                     * 
                     */
                  }
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="assessments">
                  <Link style={submenuColor} to={`${url}/enrollment/assessments`}>Assessment</Link>
                </Menu.Item>
                {/* 
                  * a. Accounting
                  * 
                  *   Trust Fund (miscellaneous)
                  *   ***Registration fee(one time only)
                  * 
                  *   General Fund
                  *     a. Lab
                  *     b. Tuition
                  *     c. Registration
                  * 
                  * Table of fees 
                  *   a. 
                  *   b.
                  *   c. 
                  * 
                  * 
                  * **ISP(Individual Student Program)
                  * 
                  * b. Registrar->COR
                  */}

                {/* Application */}
                <Menu.Item style={submenuStyle} key="advisories">
                  <Link style={submenuColor} to={`${url}/enrollment/advisories`}>Advisory</Link>
                  {/* 
                  * Authomatic picking of sections
                  * higher Yr
                  */}
                  {/* 
                  * End of school yr
                  * Adviser
                  * list of acceptance of records
                  * Submit the permanent record of student(sf10)
                  * 
                  * school hym
                  * about school
                  * announcement
                  * freedom wall(on/off)
                  */}
                  {/* 
                  * School Express Assistance
                  * 
                  */}
                </Menu.Item>
              </SubMenu>
              <SubMenu key="admission"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faClipboardCheck} /></i>
                    <span className="nav-text">Admissions</span>
                  </span>
                }
              >
                {/* planning */}
                <Menu.Item style={submenuStyle} key="banks">
                  <Link style={submenuColor} to={`${url}/admission/banks`}>Question Banks</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="examinations">
                  {/* List of exams */}
                  <Link style={submenuColor} to={`${url}/admission/examinations`}>Questionaire</Link>
                </Menu.Item>
                {/* implementation */}
                <Menu.Item style={submenuStyle} key="a-schedule">
                  <Link style={submenuColor} to={`${url}/admission/schedule`}>Schedule</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="examinations">
                  <Link style={submenuColor} to={`${url}/admission/examinations`}>Examinees</Link>
                </Menu.Item>
                {/* Results */}
                <Menu.Item style={submenuStyle} key="examinations">
                  <Link style={submenuColor} to={`${url}/admission/examinations`}>Results</Link>
                </Menu.Item>
              </SubMenu>
              {/* Callendar */}
              <Menu.Item key="school-calendar">
                <Link to={`${url}/calendar`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faCalendarAlt} /></i>
                    <span className="nav-text">Calendar</span>
                  </span>
                </Link>
              </Menu.Item>
              <SubMenu key="library"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faBookReader} /></i>
                    <span className="nav-text">Library</span>
                  </span>
                }
              >
                {/* Planning */}
                <Menu.Item style={submenuStyle} key="books">
                  <Link style={submenuColor} to={`${url}/library/books`}>Books</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="registry">
                  <Link style={submenuColor} to={`${url}/library/registry`}>Registry</Link>
                </Menu.Item>
                {/* Implementation */}
                <Menu.Item style={submenuStyle} key="reservations">
                  <Link style={submenuColor} to={`${url}/library/reservations`}>Catalogue</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="reservations">
                  <Link style={submenuColor} to={`${url}/library/faculty/reservations`}>Reservations</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="reservations">
                  <Link style={submenuColor} to={`${url}/library/borrowed`}>Borrowed</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="stocks">
                  <Link style={submenuColor} to={`${url}/library/books/stocks`}>Available</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sf"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faClipboardList} /></i>
                    <span className="nav-text">School Forms</span>
                  </span>
                }
              >
                <Menu.Item style={submenuStyle} key="transactions">
                  <Link style={submenuColor} to={`${url}/cashier/transactions`}>1. Registration</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="sales">
                  <Link style={submenuColor} to={`${url}/cashier/sales`}>2. Daily Attendances</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="books">
                  <Link style={submenuColor} to={`${url}/book/issued`}>3. Book Issued and Returened</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="salesHistory">
                  <Link style={submenuColor} to={`${url}/cashier/salesHistories`}>4. Monthly Learner Movement and Attendance</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="salesHistory">
                  <Link style={submenuColor} to={`${url}/cashier/salesHistories`}>5. Report on Promotion and Level of Proficiency</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="salesHistory">
                  <Link style={submenuColor} to={`${url}/cashier/salesHistories`}>6. Summarized Report on Promotion and Learning Progress Achievement</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="salesHistory">
                  <Link style={submenuColor} to={`${url}/jms/staffs`}>7. School Personnel Assignment List and Basic Profile</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="salesHistory">
                  <Link style={submenuColor} to={`${url}/cashier/salesHistories`}>8. Learner Basic Health and Nutrition Report</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="salesHistory">
                  <Link style={submenuColor} to={`${url}/cashier/salesHistories`}>9. Learner's Progress Report Card B</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="salesHistory">
                  <Link style={submenuColor} to={`${url}/cashier/salesHistories`}>10. Student Permanent Record</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="tabulations"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faWalking} /></i>
                    <span className="nav-text">Tabulations</span>
                  </span>
                }
              >
                {/* Planning */}
                <Menu.Item style={submenuStyle} key="activities">
                  <Link style={submenuColor} to={`${url}/tabulations/activities`}>Activities</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="judge">
                  <Link style={submenuColor} to={`${url}/tabulations/judge`}>Judge/referre</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="participants">
                  <Link style={submenuColor} to={`${url}/tabulations/participants`}>Participants</Link>
                </Menu.Item>
                {/* Implementation */}
                <Menu.Item style={submenuStyle} key="dashboard">
                  <Link style={submenuColor} to={`${url}/tabulations/dashboard`}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="scores">
                  <Link style={submenuColor} to={`${url}/tabulations/scores`}>Score</Link>
                </Menu.Item>
                {/* Applications */}
                <Menu.Item style={submenuStyle} key="winners">
                  <Link style={submenuColor} to={`${url}/tabulations/winners`}>Winners</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="inventory"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faDollyFlatbed} /></i>
                    <span className="nav-text"><Logo collapsed={collapsed} platform={platform} link="newsfeed" /></span>
                  </span>
                }
              >
                {/* planning */}
                <Menu.Item style={submenuStyle} key="books">
                  <Link style={submenuColor} to={`${url}/inventory/products`}>Products</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="equipments">
                  <Link style={submenuColor} to={`${url}/inventory/equipments`}>Equipments</Link>
                </Menu.Item>
                {/* implementation */}
                <Menu.Item style={submenuStyle} key="lends">
                  <Link style={submenuColor} to={`${url}/inventory/lends`}>Equipments Lend</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="maintenaces">
                  <Link style={submenuColor} to={`${url}/inventory/maintenaces`}>Preventive Maintenance</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="stocks">
                  <Link style={submenuColor} to={`${url}/inventory/stocks`}>Stocks</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="accounting"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faCalculator} /></i>
                    <span className="nav-text">Accounting</span>
                  </span>
                }
              >
                {/* planning */}
                <Menu.Item style={submenuStyle} key="checks">
                  <Link style={submenuColor} to={`${url}/accounting/checks`}>Checks</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="liabilities">
                  <Link style={submenuColor} to={`${url}/accounting/liabilities`}>Liabilities</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="soa">
                  <Link style={submenuColor} to={`${url}/accounting/soa`}>Statement of Account</Link>
                </Menu.Item>
                {/* implementation */}
                <Menu.Item style={submenuStyle} key="wages">
                  <Link style={submenuColor} to={`${url}/accounting/wages`}>Wages</Link>
                </Menu.Item>
                {/* Applications */}
                <Menu.Item style={submenuStyle} key="payrolls">
                  <Link style={submenuColor} to={`${url}/accounting/payrolls`}>Payrolls</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="payments">
                  <Link style={submenuColor} to={`${url}/accounting/payments`}>Payments</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="receivables">
                  <Link style={submenuColor} to={`${url}/accounting/receivables`}>Receivables</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="poll"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faPoll} /></i>
                    <span className="nav-text">Pole</span>
                  </span>
                }
              >
                {/* Planning */}
                <Menu.Item style={submenuStyle} key="schedules">
                  <Link style={submenuColor} to={`${url}/voting/schedules`}>Schedule</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="parties">
                  <Link style={submenuColor} to={`${url}/voting/parties`}>Parties</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="candidates">
                  <Link style={submenuColor} to={`${url}/voting/candidates`}>Candidates</Link>
                </Menu.Item>
                {/* Implementation */}
                <Menu.Item style={submenuStyle} key="plantilias">
                  <Link style={submenuColor} to={`${url}/voting/plantilias`}>Plantilias</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="v-dashboard">
                  <Link style={submenuColor} to={`${url}/voting/dashboard`}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="countings">
                  <Link style={submenuColor} to={`${url}/voting/countings`}>Counting</Link>
                </Menu.Item>
                {/* Application */}
                <Menu.Item style={submenuStyle} key="officers">
                  <Link style={submenuColor} to={`${url}/voting/officers`}>Officers</Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="dtr"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faClock} /></i>
                    <span className="nav-text">Daily Time Records</span>
                  </span>
                }
              >
                {/* Planning */}
                <Menu.Item style={submenuStyle} key="articles">
                  <Link style={submenuColor} to={`${url}/dtr/articles`}>Articles</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="settings">
                  <Link style={submenuColor} to={`${url}/dtr/settings`}>Telecom Settings</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="guardians">
                  <Link style={submenuColor} to={`${url}/dtr/guardians`}>Guardians</Link>
                </Menu.Item>
                {/* Implementating */}
                <Menu.Item style={submenuStyle} key="info">
                  <Link style={submenuColor} to={`${url}/dtr/info`}>Student info</Link>
                </Menu.Item>
                {/* Applications */}
                <Menu.Item style={submenuStyle} key="attendance">
                  <Link style={submenuColor} to={`${url}/dtr/attendance`}>Attendance</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="logs">
                  <Link style={submenuColor} to={`${url}/dtr/logs`}>Message logs</Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="data-tracking"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faDatabase} /></i>
                    <span className="nav-text">Data Tracking</span>
                  </span>
                }
              >
                {/* planning */}
                <Menu.Item style={submenuStyle} key="plans">
                  <Link style={submenuColor} to={`${url}/library/plans`}>Lesson Plan</Link>
                </Menu.Item>
                {/* implementations */}

              </SubMenu>
              <SubMenu key="gaa"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i><FontAwesomeIcon icon={faPlusSquare} /></i>
                    <span className="nav-text">General Appropriation Act</span>
                  </span>
                }
              >
                {/* planning */}
                <Menu.Item style={submenuStyle} key="goals">
                  <Link style={submenuColor} to={`${url}/gaa/goals`}>Goals</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="organizers">
                  <Link style={submenuColor} to={`${url}/gaa/organizers`}>Organizers</Link>
                </Menu.Item>
                {/* implementations */}
                <Menu.Item style={submenuStyle} key="performances">
                  <Link style={submenuColor} to={`${url}/gaa/performances`}>Performances</Link>
                </Menu.Item>
                {/* Application */}
                <Menu.Item style={submenuStyle} key="activities">
                  <Link style={submenuColor} to={`${url}/gaa/activities`}>Activities</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="research">
                  <Link style={submenuColor} to={`${url}/gaa/research`}>Research</Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="ipcr">
                  <Link style={submenuColor} to={`${url}/gaa/ipcr`}>IPCR</Link>
                </Menu.Item>
              </SubMenu>

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

