import React, { Component } from 'react';
import { connect } from 'react-redux';
import Switcher from '../../components/platformSwitcher/platformSwitcher';
import Actions from '../../redux/platformSwitcher/actions.js';
import Platforms from './config';

const { changePlatform } = Actions;
const getGrantedPlatforms = (defaultsPlatform, grantedPlatforms) => {
  /**
   * Pending::::
   *  check if available on admin, it must be removed in faculty
   */


  grantedPlatforms.forEach(platform => {
    defaultsPlatform.push(platform)
  });
  return defaultsPlatform;
}

const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') { return str.substr(0, str.length - 1); }
  return str;
};
class PlatformSwitcher extends Component {
  constructor(props) {
    super(props);
    let auth = JSON.parse(localStorage.getItem('auth'));
    this.state = {
      rolename: auth.rolename,
      myPlatforms: auth.platforms
    }
  }
  render() {
    const { rolename, myPlatforms } = this.state;

    const { changePlatform, url } = this.props;
    const myUrl = stripTrailingSlash(url);
    const portal = rolename ? (rolename === 'principal' ? 'superadminPortal' : `${rolename}Portal`) : 'studentPortal';

    const grantedPlatforms = myPlatforms ? getGrantedPlatforms(Platforms[portal], myPlatforms) : Platforms[portal];
    const writer = grantedPlatforms.length > 0 ?
      <Switcher
        config={Platforms['portalList']}
        grantedPlatforms={grantedPlatforms}
        changePlatform={changePlatform}
        url={myUrl}
      />
      : <div style={{ position: 'relative' }}>Please Contact your Administrator to Grant you a access..</div>;

    return (
      <div className="themeSwitchBlock">
        <div className="themeSwitchBtnWrapper">
          {writer}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) { return { ...state.PlatformSwitcher.toJS() }; }
export default connect(mapStateToProps, { changePlatform })(PlatformSwitcher);