import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { MDBCol, MDBRow } from 'mdbreact';

export default ({ config, changePlatform, grantedPlatforms, url }) => {
  const { options } = config;
  const writer = options.map(option => {
    const { name, code, icon, dafaultUrl } = option;
    if (grantedPlatforms.includes(code)) {
      const onClick = () => changePlatform(code);
      return (
        <MDBCol key={name} className="text-center">
          <Link to={`${url}${dafaultUrl}`} onClick={onClick} key={code} className="text-dark">
            <FontAwesomeIcon icon={icon} size="5x" /><br />
            {name}
          </Link>
        </MDBCol>
      );
    }
    return '';
  })
  return (
    <div className="themeSwitchBlock">
      <div className="themeSwitchBtnWrapper">
        <MDBRow>
          {writer}
        </MDBRow>
      </div>
    </div >
  );
};
