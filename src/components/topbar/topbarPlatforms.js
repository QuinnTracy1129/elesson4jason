import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlatformSwitcher from '../../containers/PlatformSwitcher';

import Popover from '../uielements/popover';
import TopbarDropdownWrapper from './topbarDropdown.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { MDBCol, MDBRow } from 'mdbreact';

class TopbarPlatforms extends Component {
  constructor() {
    super();
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = { visible: false, };
  }

  hide() { this.setState({ visible: false }); }
  handleVisibleChange() { this.setState({ visible: !this.state.visible }); }

  render() {
    const { customizedTheme, url } = this.props;

    const content = (
      <TopbarDropdownWrapper className="topbarPlatforms">
        <div className="isoDropdownHeader">
          <h3>Integrated Platforms</h3>
        </div>
        <div className="isoDropdownBody">
          <MDBRow>
            <MDBCol size='12'>
              <PlatformSwitcher url={url} />
            </MDBCol>
          </MDBRow>
        </div>
      </TopbarDropdownWrapper >
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottom"
      >
        <div className="isoIconWrapper">
          <i style={{ color: customizedTheme.textColor }}>
            <FontAwesomeIcon icon={faLayerGroup} />
          </i>
        </div>
      </Popover>
    );
  }
}

export default connect(state => ({
  ...state.App.toJS(),
  customizedTheme: state.ThemeSwitcher.toJS().topbarTheme
}))(TopbarPlatforms);