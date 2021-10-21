import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../image/rob.png';
import FourZeroFourStyleWrapper from './404.style';

class FourZeroFour extends React.Component {
  render() {
    return (
      <FourZeroFourStyleWrapper className="iso404Page">
        <div className="iso404Content">
          <h1>
            Error 404
          </h1>
          <h3>
            Looks like you got lost
          </h3>
          <p>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <button type="button">
            <Link to="/jms/newsfeed">
              BACK HOME
            </Link>
          </button>
        </div>

        <div className="iso404Artwork">
          <img alt="#" src={Image} />
        </div>
      </FourZeroFourStyleWrapper>
    );
  }
}

export default FourZeroFour;
