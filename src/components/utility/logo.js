import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config.js';
import Technowiz from '../../image/technowiz.png';

export default function ({ collapsed, platform, link }) {
  return (
    <div
      className="isoLogoWrapper">
      {collapsed
        ? <div>
          <h3>
            <Link to={"/jms/" + link}>
              <img alt="Technowiz" src={Technowiz} width="70%" />
            </Link>
          </h3>
        </div>
        : <h3>
          <Link to={"/jms/" + link}>{platform || siteConfig.siteName}</Link>
        </h3>}
    </div>
  );
}
